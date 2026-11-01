/**
 * SHAHRAVA — Image placeholders & progressive loading (v2)
 *
 * 1. A designed SVG placeholder shows instantly (data URI, no network).
 * 2. The real image loads in the background: visible-first, max 6 at a time,
 *    12s timeout per try, 1 retry, optional fallback URLs ("url1|url2").
 * 3. On success it fades in; on failure the placeholder simply stays.
 * Same exports as before + countryFlagUrl / installImageFallback.
 */

const isBrowser = typeof document !== "undefined";

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

/* ───────────── Placeholder ───────────── */

function hash(s) {
  let h = 2166136261;
  for (const ch of String(s))
    h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return h;
}
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function skyline(w, h, rnd, minH, maxH) {
  let x = -20,
    out = "";
  while (x < w) {
    const bw = 34 + rnd() * 76,
      bh = h * (minH + rnd() * (maxH - minH));
    out += `<rect x="${x | 0}" y="${(h - bh) | 0}" width="${bw | 0}" height="${(bh + 2) | 0}"/>`;
    if (rnd() < 0.22)
      out += `<rect x="${(x + bw / 2 - 2) | 0}" y="${(h - bh - 26 - rnd() * 40) | 0}" width="4" height="${(bh + 80) | 0}"/>`;
    x += bw + (rnd() < 0.3 ? 10 : 0);
  }
  return out;
}

const phCache = new Map();

/** Designed gradient placeholder: city colors, skyline silhouette and readable label. */
export function createCityPlaceholder(
  label,
  primary = "#16C6B1",
  secondary = "#D6B66D",
  opts = {},
) {
  const W = opts.width || 1200,
    H = opts.height || 800;
  const key = [label, primary, secondary, opts.accent, W, H].join("|");
  if (phCache.has(key)) return phCache.get(key);

  const p = escapeXml(primary),
    s = escapeXml(secondary),
    a = escapeXml(opts.accent || "#E07A5F");
  const rnd = mulberry32(hash(label || p + s));
  const text = String(label || "");
  const fs = Math.round(
    (Math.min(W, H) / 7) *
      Math.max(0.45, Math.min(1, 12 / Math.max(text.length, 1))),
  );
  const ty = Math.round(H * 0.44);

  const label$ = text
    ? `<text x="50%" y="${ty}" font-family="Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif" font-size="${fs}" font-weight="800" fill="#fff" stroke="rgba(0,0,0,.4)" stroke-width="${Math.max(2, fs / 12)}" paint-order="stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="middle">${escapeXml(text)}</text><rect x="${W / 2 - 36}" y="${ty + fs * 0.78}" width="72" height="4" rx="2" fill="#fff" fill-opacity=".75"/>`
    : "";

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p}"/><stop offset=".6" stop-color="${s}"/><stop offset="1" stop-color="${a}"/></linearGradient>` +
    `<radialGradient id="b1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="b2"><stop offset="0" stop-color="${a}" stop-opacity=".6"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient>` +
    `<pattern id="t" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".07"/></pattern>` +
    `</defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/>` +
    `<circle cx="${(W * (0.15 + rnd() * 0.3)) | 0}" cy="${(H * 0.2) | 0}" r="${(H * 0.7) | 0}" fill="url(#b1)"/>` +
    `<circle cx="${(W * (0.6 + rnd() * 0.3)) | 0}" cy="${(H * 0.75) | 0}" r="${(H * 0.8) | 0}" fill="url(#b2)"/>` +
    `<rect width="100%" height="100%" fill="url(#t)"/>` +
    `<g fill="#050812" fill-opacity=".22">${skyline(W, H, rnd, 0.16, 0.42)}</g>` +
    `<rect width="100%" height="100%" fill="url(#d)"/>` +
    `<g fill="#050812" fill-opacity=".5">${skyline(W, H, rnd, 0.07, 0.26)}</g>` +
    label$ +
    `</svg>`;

  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  if (phCache.size > 150) phCache.delete(phCache.keys().next().value);
  phCache.set(key, uri);
  return uri;
}

/* ───────────── Loader ───────────── */

const MAX_PARALLEL = 6;
let running = 0;
const waiting = [];
const placeholders = new WeakMap();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function schedule(job, front) {
  front ? waiting.unshift(job) : waiting.push(job);
  pump();
}
function pump() {
  while (running < MAX_PARALLEL && waiting.length) {
    running++;
    waiting
      .shift()()
      .finally(() => {
        running--;
        pump();
      });
  }
}

/** Resolves //cdn urls, upgrades http→https, rejects junk. */
function normalizeUrl(u) {
  if (!u || typeof u !== "string") return null;
  u = u.trim();
  if (!u || u === "undefined" || u === "null") return null;
  try {
    const url = new URL(u, location.href);
    if (!/^https?:$/.test(url.protocol)) return null;
    if (
      url.protocol === "http:" &&
      location.protocol === "https:" &&
      url.hostname !== "localhost"
    )
      url.protocol = "https:";
    return url.href;
  } catch {
    return null;
  }
}

function probe(url, timeout) {
  return new Promise((resolve) => {
    const img = new Image();
    let t;
    const end = (ok) => {
      clearTimeout(t);
      img.onload = img.onerror = null;
      if (!ok) img.src = "";
      resolve(ok ? img : null);
    };
    img.referrerPolicy = "no-referrer"; // avoids hotlink/referrer blocks
    img.decoding = "async";
    img.onload = () => end(true);
    img.onerror = () => end(false);
    t = setTimeout(() => end(false), timeout);
    img.src = url;
  });
}

/**
 * Upgrade <img> from placeholder to the real image.
 * externalUrl: "url" | "url1|url2" | [urls]. Returns Promise<boolean>.
 * opts: { timeout=12000, retries=1, priority=false, onLoad, onError }
 */
export function progressiveLoadImage(imgEl, externalUrl, opts = {}) {
  if (!imgEl || !isBrowser) return Promise.resolve(false);
  const urls = (
    Array.isArray(externalUrl)
      ? externalUrl
      : String(externalUrl || "").split("|")
  )
    .map(normalizeUrl)
    .filter(Boolean);
  if (!urls.length) return Promise.resolve(false);

  const cur = imgEl.getAttribute("src") || "";
  if (cur.startsWith("data:")) placeholders.set(imgEl, cur);
  const ph = placeholders.get(imgEl) || createCityPlaceholder(imgEl.alt || "");
  if (!cur) imgEl.src = ph;

  const tok = (imgEl.__imgTok = (imgEl.__imgTok || 0) + 1);
  const stale = () => imgEl.__imgTok !== tok; // a newer request replaced this one
  const retries = opts.retries ?? 1;
  imgEl.dataset.imgState = "loading";

  const job = async () => {
    for (const url of urls) {
      for (let n = 0; n <= retries; n++) {
        if (stale()) return false;
        const loaded = await probe(url, opts.timeout || 12000);
        if (stale()) return false;
        if (loaded) {
          try {
            if (loaded.decode) await loaded.decode();
          } catch {}
          if (stale()) return false;
          imgEl.referrerPolicy = "no-referrer";
          imgEl.onerror = () => {
            imgEl.onerror = null;
            imgEl.src = ph;
            imgEl.dataset.imgState = "error";
          };
          imgEl.src = url;
          imgEl.dataset.imgState = "loaded";
          if (
            imgEl.animate &&
            !matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            imgEl.animate(
              [{ opacity: 0.15, filter: "blur(8px) saturate(1.3)" }],
              {
                duration: 550,
                easing: "cubic-bezier(.16,1,.3,1)",
              },
            );
          opts.onLoad && opts.onLoad(imgEl);
          return true;
        }
        if (n < retries) await wait(700 * (n + 1));
      }
    }
    if (!stale()) {
      imgEl.dataset.imgState = "error"; // placeholder stays visible
      opts.onError && opts.onError(imgEl);
    }
    return false;
  };

  return new Promise((res) => schedule(() => job().then(res), !!opts.priority));
}

let io;
function getObserver() {
  return (io ||= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        progressiveLoadImage(e.target, e.target.dataset.externalSrc);
      }),
    { rootMargin: "600px 0px" },
  ));
}

/** Scans for img[data-external-src] and loads them as they approach the viewport. */
export function setupProgressiveImages(root = document) {
  if (!root || !root.querySelectorAll) return;
  const imgs = [...root.querySelectorAll("img[data-external-src]")];
  if (root.matches && root.matches("img[data-external-src]")) imgs.push(root);
  imgs.forEach((img) => {
    const ext = img.dataset.externalSrc;
    if (!ext || ext === "undefined" || ext === "null") return;
    if (img.dataset.pd === ext) return; // same URL already handled; a new URL re-runs
    img.dataset.pd = ext;
    if (!img.getAttribute("src"))
      img.src = createCityPlaceholder(img.alt || "");
    "IntersectionObserver" in window
      ? getObserver().observe(img)
      : progressiveLoadImage(img, ext);
  });
}

/** Safety net: any other <img> that fails gets a placeholder instead of a broken icon. */
export function installImageFallback() {
  if (!isBrowser || installImageFallback.done) return;
  installImageFallback.done = true;
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.imgState || img.dataset.phFallback) return;
      if (
        img.matches(".leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow")
      )
        return;
      const src = img.currentSrc || img.src;
      if (!src || src.startsWith("data:")) return;
      img.dataset.phFallback = "1";
      img.src = createCityPlaceholder(img.alt || "");
    },
    true,
  );
}
installImageFallback();

/* ───────────── Flags ───────────── */

/** ISO alpha-2 → flag emoji (Windows shows letters instead; see countryFlagUrl). */
export function countryFlagEmoji(code) {
  const c = String(code || "").toUpperCase();
  if (c.length !== 2) return "🌍";
  try {
    return String.fromCodePoint(
      ...c.split("").map((ch) => 0x1f1e6 + (ch.charCodeAt(0) - 65)),
    );
  } catch {
    return "🌍";
  }
}

/** Flag image URL (works on Windows too). Widths: 20, 40, 80, 160, 320. */
export function countryFlagUrl(code, width = 80) {
  const c = String(code || "").toLowerCase();
  return /^[a-z]{2}$/.test(c) ? `https://flagcdn.com/w${width}/${c}.png` : "";
}
