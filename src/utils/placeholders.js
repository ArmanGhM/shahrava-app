/**
 * SHAHRAVA (شهرآوا) — Network-Independent Visual Placeholders & Image Loader
 * Guarantees zero broken images on restricted / offline networks.
 */

/**
 * Escapes characters for safe inclusion inside SVG strings.
 * @param {string} str
 * @returns {string}
 */
function escapeXml(str) {
  return String(str || '').replace(
    /[<>&"']/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      }[c])
  );
}

/**
 * Creates an inline SVG data URI with a 3-stop theme gradient, subtle pattern,
 * radial vignette, and an optional bold centered label.
 *
 * @param {string} label City or attraction title
 * @param {string} [primary='#16C6B1'] Primary city theme color
 * @param {string} [secondary='#D6B66D'] Secondary city theme color
 * @param {object} [opts={}]
 * @param {number} [opts.width=1200]
 * @param {number} [opts.height=800]
 * @returns {string} data:image/svg+xml;charset=utf-8,...
 */
export function createCityPlaceholder(
  label = '',
  primary = '#16C6B1',
  secondary = '#D6B66D',
  opts = {}
) {
  const width = opts.width || 1200;
  const height = opts.height || 800;
  const fontSize = Math.max(18, Math.round(Math.min(width, height) / 9.5));
  const safeLabel = escapeXml(label);

  const textElement = safeLabel
    ? `<text x="50%" y="50%" font-family="Vazirmatn, Sora, 'Segoe UI', system-ui, sans-serif" font-size="${fontSize}" font-weight="900" fill="rgba(255,255,255,0.92)" text-anchor="middle" dominant-baseline="middle" letter-spacing="1">${safeLabel}</text>`
    : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}"/>
        <stop offset="52%" stop-color="${secondary}"/>
        <stop offset="100%" stop-color="${primary}"/>
      </linearGradient>
      <radialGradient id="v" cx="50%" cy="40%" r="75%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.22)"/>
        <stop offset="60%" stop-color="rgba(0,0,0,0.08)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.62)"/>
      </radialGradient>
      <pattern id="diag" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M0 0 L60 60 M60 0 L0 60" stroke="rgba(255,255,255,0.07)" stroke-width="1.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#diag)"/>
    <rect width="100%" height="100%" fill="url(#v)"/>
    ${textElement}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Attempts to progressively upgrade an <img> element to a network photo with a strict timeout.
 * If the probe fails, times out, or the network is blocked, the placeholder remains untouched.
 *
 * @param {HTMLImageElement} imgEl
 * @param {string} externalUrl
 * @param {object} [opts={}]
 * @param {number} [opts.timeout=4500]
 */
export function progressiveLoadImage(imgEl, externalUrl, opts = {}) {
  if (!imgEl || !externalUrl || typeof externalUrl !== 'string' || !externalUrl.startsWith('http')) {
    return;
  }

  const timeout = opts.timeout || 4500;
  let settled = false;
  const probe = new Image();

  const timer = setTimeout(() => {
    if (!settled) {
      settled = true;
      probe.src = '';
    }
  }, timeout);

  probe.onload = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    imgEl.src = externalUrl;
  };

  probe.onerror = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    // Silent failure: preserve the instant SVG placeholder without throwing UI errors
  };

  probe.src = externalUrl;
}

/**
 * Scans root element for <img data-external-src="..."> and sets up progressive upgrading.
 *
 * @param {HTMLElement|Document} [rootEl=document]
 */
export function setupProgressiveImages(rootEl = document) {
  if (!rootEl || !rootEl.querySelectorAll) return;
  const images = rootEl.querySelectorAll('img[data-external-src]');
  images.forEach((img) => {
    if (img.dataset.progressiveLoaded === 'true') return;
    const url = img.getAttribute('data-external-src');
    if (url && url.trim().length > 0) {
      img.dataset.progressiveLoaded = 'true';
      progressiveLoadImage(img, url.trim(), { timeout: 4500 });
    }
  });
}

/**
 * Converts a 2-letter ISO country code (e.g. "IR", "JP") to a Unicode emoji flag.
 * Completely eliminates any external network calls to flag CDNs.
 *
 * @param {string} countryCode
 * @returns {string} Flag emoji (e.g. 🇮🇷) or globe symbol 🌍
 */
export function countryFlagEmoji(countryCode) {
  const code = String(countryCode || '').trim().toUpperCase();
  if (code.length !== 2) return '🌍';
  try {
    const REGIONAL_INDICATOR_OFFSET = 0x1f1e6;
    const ASCII_A = 65;
    const firstChar = code.charCodeAt(0) - ASCII_A;
    const secondChar = code.charCodeAt(1) - ASCII_A;
    if (firstChar >= 0 && firstChar <= 25 && secondChar >= 0 && secondChar <= 25) {
      return String.fromCodePoint(
        REGIONAL_INDICATOR_OFFSET + firstChar,
        REGIONAL_INDICATOR_OFFSET + secondChar
      );
    }
    return '🌍';
  } catch {
    return '🌍';
  }
}
