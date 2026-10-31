/**
 * SHAHRAVA — Nominatim / OpenStreetMap Geocoding API Client
 * Search global cities and locations with multi-language support (fa, en).
 */

const GEO_CACHE = new Map();

/**
 * Searches cities globally using OpenStreetMap Nominatim
 * @param {string} query Search string in Persian or English
 * @param {string} lang 'fa' | 'en'
 * @returns {Promise<Array>}
 */
export async function searchGlobalLocations(query, lang = 'fa') {
  const q = String(query).trim();
  if (!q || q.length < 2) return [];

  const cacheKey = `${q.toLowerCase()}_${lang}`;
  if (GEO_CACHE.has(cacheKey)) {
    return GEO_CACHE.get(cacheKey);
  }

  const encodedQuery = encodeURIComponent(q);
  // Featuretype=city or settlement preferred
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1&limit=6&accept-language=${lang},en`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const items = await response.json();
    const results = items
      .filter(item => item.lat && item.lon)
      .map(item => {
        const addr = item.address || {};
        const cityName = addr.city || addr.town || addr.municipality || addr.state || item.name || q;
        const countryName = addr.country || '';
        const countryCode = (addr.country_code || '').toUpperCase();

        return {
          id: `osm-${item.place_id}`,
          name: cityName,
          fullName: item.display_name,
          country: countryName,
          countryCode: countryCode,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type: item.type || 'city',
          importance: item.importance || 0.5
        };
      });

    GEO_CACHE.set(cacheKey, results);
    return results;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Nominatim geocode query error:', err);
    return [];
  }
}
