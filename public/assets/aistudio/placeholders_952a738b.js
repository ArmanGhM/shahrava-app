/**
 * SHAHRAVA — Dynamic SVG Image Placeholders
 * Network-independent gradient placeholders matching each city's theme.
 */

function escapeXml(s) {
  return String(s).replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
}

export function createCityPlaceholder(
  label,
  primary = "#16C6B1",
  secondary = "#D6B66D",
  opts = {},
) {
  const width = opts.width || 1200;
  const height = opts.height || 800;
  const fontSize = Math.round(Math.min(width, height) / 9);
  const textEl = label
    ? `<text x="50%" y="50%" font-family="Segoe UI, Sora, sans-serif" font-size="${fontSize}" font-weight="900" fill="rgba(255,255,255,0.92)" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}"/>
        <stop offset="55%" stop-color="${secondary}"/>
        <stop offset="100%" stop-color="${primary}"/>
      </linearGradient>
      <radialGradient id="v" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.20)"/>
        <stop offset="60%" stop-color="rgba(0,0,0,0.05)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
      </radialGradient>
      <pattern id="p" width="70" height="70" patternUnits="userSpaceOnUse">
        <path d="M0 0 L70 70 M70 0 L0 70" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#p)"/>
    <rect width="100%" height="100%" fill="url(#v)"/>
    ${textEl}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function progressiveLoadImage(imgEl, externalUrl, opts = {}) {
  if (!imgEl || !externalUrl || !externalUrl.startsWith("http")) return;
  const timeout = opts.timeout || 4500;
  let cancelled = false;
  const probe = new Image();
  const timer = setTimeout(() => {
    cancelled = true;
    probe.src = "";
  }, timeout);
  probe.onload = () => {
    if (cancelled) return;
    clearTimeout(timer);
    imgEl.src = externalUrl;
  };
  probe.onerror = () => clearTimeout(timer);
  probe.src = externalUrl;
}

export function setupProgressiveImages(root = document) {
  root.querySelectorAll("img[data-external-src]").forEach((img) => {
    if (img.dataset.progressiveDone) return;
    img.dataset.progressiveDone = "1";
    progressiveLoadImage(img, img.dataset.externalSrc);
  });
}

export function countryFlagEmoji(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  if (code.length !== 2) return "🌍";
  try {
    const REGIONAL_A = 0x1f1e6;
    const ASCII_A = 65;
    return String.fromCodePoint(
      ...code.split("").map((c) => REGIONAL_A + (c.charCodeAt(0) - ASCII_A)),
    );
  } catch {
    return "🌍";
  }
}
