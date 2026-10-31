/**
 * SHAHRAVA — Wikimedia & Wikipedia Encyclopedic Integration
 * Fetches authentic city overviews, thumbnail photography, and historical extracts.
 */

const WIKI_CACHE = new Map();

/**
 * Fetches encyclopedic summary from Wikipedia REST API
 * @param {string} title City or landmark name
 * @param {string} lang 'fa' | 'en'
 * @returns {Promise<object|null>}
 */
export async function fetchWikiSummary(title, lang = 'fa') {
  if (!title) return null;
  const key = `${title.toLowerCase()}_${lang}`;
  if (WIKI_CACHE.has(key)) return WIKI_CACHE.get(key);

  const endpoint = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      // If fa failed, try en fallback
      if (lang === 'fa') {
        return fetchWikiSummary(title, 'en');
      }
      return null;
    }

    const json = await res.json();
    const data = {
      title: json.title,
      description: json.description || '',
      extract: json.extract || '',
      thumbnail: json.thumbnail ? json.thumbnail.source : (json.originalimage ? json.originalimage.source : null),
      pageUrl: json.content_urls ? (json.content_urls.desktop ? json.content_urls.desktop.page : null) : null
    };

    WIKI_CACHE.set(key, data);
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Wikipedia REST summary fetch failed:', err);
    return null;
  }
}
