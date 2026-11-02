
const GEO_CACHE = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MIN_REQUEST_INTERVAL_MS = 1100; // Nominatim policy: max 1 req/sec

// ✅ Global rate-limit queue — ensures no two calls fire within 1.1s
let lastRequestTime = 0;
let throttleChain = Promise.resolve();

function throttleNominatim() {
  throttleChain = throttleChain.then(async () => {
    const now = Date.now();
    const wait = Math.max(0, MIN_REQUEST_INTERVAL_MS - (now - lastRequestTime));
    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
    lastRequestTime = Date.now();
  });
  return throttleChain;
}

/**
 * Searches cities globally using OpenStreetMap Nominatim.
 * @param {string} query Search string in Persian or English
 * @param {string} lang 'fa' | 'en'
 * @returns {Promise<Array>}
 */
export async function searchGlobalLocations(query, lang = "fa") {
  const q = String(query).trim();
  if (!q || q.length < 2) return [];

  // ✅ Cache hit — skip network entirely
  const cacheKey = `${q.toLowerCase()}_${lang}`;
  const cached = GEO_CACHE.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // ✅ Wait for rate-limit slot
  await throttleNominatim();

  const encodedQuery = encodeURIComponent(q);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1&limit=6&accept-language=${lang},en`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        // Do NOT set User-Agent (forbidden). Browser handles it + Referer.
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Nominatim] HTTP ${response.status} for "${q}"`);
      return [];
    }

    const items = await response.json();
    const results = items
      .filter((item) => item.lat && item.lon)
      .map((item) => {
        const addr = item.address || {};
        const cityName =
          addr.city ||
          addr.town ||
          addr.municipality ||
          addr.village ||
          addr.state ||
          item.name ||
          q;
        const countryName = addr.country || "";
        const countryCode = (addr.country_code || "").toUpperCase();

        return {
          id: `osm-${item.place_id}`,
          name: cityName,
          fullName: item.display_name,
          country: countryName,
          countryCode,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type: item.type || "city",
          importance: item.importance || 0.5,
        };
      });

    GEO_CACHE.set(cacheKey, { timestamp: Date.now(), data: results });
    return results;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      console.warn(`[Nominatim] Timeout (6.5s) for "${q}"`);
    } else {
      console.warn("[Nominatim] Request failed:", err);
    }
    return [];
  }
}

/** ✅ Manually clear the geocode cache (useful for tests). */
export function clearGeocodeCache() {
  GEO_CACHE.clear();
}
