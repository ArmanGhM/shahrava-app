/**
 * SHAHRAVA — Image Placeholders & Progressive Loading
 *
 * Features:
 * - Instant SVG placeholders
 * - Markdown image URL normalization
 * - Progressive image loading
 * - Lazy loading with IntersectionObserver
 * - Maximum 4 simultaneous image requests
 * - Automatic fallback for broken images
 * - Safe URL validation
 * - Country flag URL generation
 */

const isBrowser = typeof document !== "undefined";

/* ─────────────────────────────────────────
   Utilities
───────────────────────────────────────── */

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (char) => {
    return {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    }[char];
  });
}

function hash(value) {
  let h = 2166136261;

  for (const char of String(value)) {
    h = Math.imul(h ^ char.codePointAt(0), 16777619) >>> 0;
  }

  return h;
}

function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;

    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Converts image URLs stored as Markdown into direct URLs.
 *
 * Supported:
 * https://example.com/image.jpg
 * [Image](https://example.com/image.jpg)
 * ![Image](https://example.com/image.jpg)
 * /images/example.jpg
 * ./images/example.jpg
 */
export function normalizeImageUrl(value) {
  if (typeof value !== "string") return "";

  let url = value.trim();

  if (!url || url === "undefined" || url === "null") {
    return "";
  }

  // Extract destination from Markdown links.
  const markdownMatch = url.match(/^!?\[[^\]]*\]\(([\s\S]*)\)$/);

  if (markdownMatch) {
    let destination = markdownMatch[1].trim();

    // Handle Markdown angle-bracket destinations.
    if (destination.startsWith("<")) {
      const closingIndex = destination.indexOf(">");

      if (closingIndex !== -1) {
        destination = destination.slice(1, closingIndex);
      }
    } else {
      // Remove an optional Markdown title.
      destination = destination.replace(/\s+["'][\s\S]*["']$/, "");
    }

    url = destination.trim();
  }

  // Remove surrounding quotes.
  url = url.replace(/^["']|["']$/g, "");

  // Restore Markdown-escaped characters.
  url = url.replace(/\\_/g, "_").replace(/\\\(/g, "(").replace(/\\\)/g, ")");

  if (!url) return "";

  // Reject unsafe protocols.
  if (/^[a-z][a-z\d+.-]*:/i.test(url)) {
    if (!/^https?:\/\//i.test(url)) {
      return "";
    }

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        return "";
      }

      return url;
    } catch {
      return "";
    }
  }

  // Support protocol-relative and relative URLs.
  if (url.startsWith("//")) return url;

  return url;
}

/* ─────────────────────────────────────────
   SVG Placeholder Generator
───────────────────────────────────────── */

function skyline(width, height, random, minHeight, maxHeight) {
  let x = -20;
  let output = "";

  while (x < width) {
    const buildingWidth = 34 + random() * 76;

    const buildingHeight =
      height * (minHeight + random() * (maxHeight - minHeight));

    output += `
      <rect
        x="${x | 0}"
        y="${(height - buildingHeight) | 0}"
        width="${buildingWidth | 0}"
        height="${(buildingHeight + 2) | 0}"
      />
    `;

    if (random() < 0.22) {
      output += `
        <rect
          x="${(x + buildingWidth / 2 - 2) | 0}"
          y="${(height - buildingHeight - 26 - random() * 40) | 0}"
          width="4"
          height="${(buildingHeight + 80) | 0}"
        />
      `;
    }

    x += buildingWidth + (random() < 0.3 ? 10 : 0);
  }

  return output;
}

const phCache = new Map();

export function createCityPlaceholder(
  label,
  primary = "#16C6B1",
  secondary = "#D6B66D",
  opts = {},
) {
  const W = opts.width || 1200;
  const H = opts.height || 800;

  const key = [label, primary, secondary, opts.accent, W, H].join("|");

  if (phCache.has(key)) {
    return phCache.get(key);
  }

  const p = escapeXml(primary);
  const s = escapeXml(secondary);
  const a = escapeXml(opts.accent || "#E07A5F");

  const random = mulberry32(hash(label || p + s));

  const text = String(label || "");

  const fontSize = Math.round(
    (Math.min(W, H) / 7) *
      Math.max(0.45, Math.min(1, 12 / Math.max(text.length, 1))),
  );

  const textY = Math.round(H * 0.44);

  const labelElement = text
    ? `
      <text
        x="50%"
        y="${textY}"
        font-family="Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif"
        font-size="${fontSize}"
        font-weight="800"
        fill="#fff"
        stroke="rgba(0,0,0,.4)"
        stroke-width="${Math.max(2, fontSize / 12)}"
        paint-order="stroke"
        stroke-linejoin="round"
        text-anchor="middle"
        dominant-baseline="middle"
      >${escapeXml(text)}</text>

      <rect
        x="${W / 2 - 36}"
        y="${textY + fontSize * 0.78}"
        width="72"
        height="4"
        rx="2"
        fill="#fff"
        fill-opacity=".75"
      />
    `
    : "";

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${W} ${H}"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${p}"/>
          <stop offset=".6" stop-color="${s}"/>
          <stop offset="1" stop-color="${a}"/>
        </linearGradient>

        <radialGradient id="b1">
          <stop offset="0" stop-color="#fff" stop-opacity=".38"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="b2">
          <stop offset="0" stop-color="${a}" stop-opacity=".6"/>
          <stop offset="1" stop-color="${a}" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".3" stop-color="#000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000" stop-opacity=".6"/>
        </linearGradient>

        <pattern
          id="t"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="#fff"
            stroke-opacity=".07"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#g)"/>

      <circle
        cx="${(W * (0.15 + random() * 0.3)) | 0}"
        cy="${(H * 0.2) | 0}"
        r="${(H * 0.7) | 0}"
        fill="url(#b1)"
      />

      <circle
        cx="${(W * (0.6 + random() * 0.3)) | 0}"
        cy="${(H * 0.75) | 0}"
        r="${(H * 0.8) | 0}"
        fill="url(#b2)"
      />

      <rect width="100%" height="100%" fill="url(#t)"/>

      <g fill="#050812" fill-opacity=".22">
        ${skyline(W, H, random, 0.16, 0.42)}
      </g>

      <rect width="100%" height="100%" fill="url(#d)"/>

      <g fill="#050812" fill-opacity=".5">
        ${skyline(W, H, random, 0.07, 0.26)}
      </g>

      ${labelElement}
    </svg>
  `;

  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  if (phCache.size > 150) {
    phCache.delete(phCache.keys().next().value);
  }

  phCache.set(key, uri);

  return uri;
}

/* ─────────────────────────────────────────
   Progressive Image Loader
───────────────────────────────────────── */

const MAX_PARALLEL = 4;

let running = 0;

const waiting = [];

/**
 * Runs image-loading jobs with a concurrency limit.
 */
function schedule(job) {
  return new Promise((resolve) => {
    waiting.push(() => {
      Promise.resolve()
        .then(job)
        .then(resolve, () => resolve(false))
        .finally(() => {
          running--;
          pump();
        });
    });

    pump();
  });
}

function pump() {
  while (running < MAX_PARALLEL && waiting.length > 0) {
    const task = waiting.shift();

    running++;

    task();
  }
}

/**
 * Checks whether an image URL actually loads.
 */
function probe(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const img = new Image();

    let timer = null;
    let finished = false;

    const finish = (success) => {
      if (finished) return;

      finished = true;

      clearTimeout(timer);

      img.onload = null;
      img.onerror = null;

      if (success && img.naturalWidth > 10 && img.naturalHeight > 10) {
        resolve(img);
      } else {
        img.src = "";
        resolve(null);
      }
    };

    img.referrerPolicy = "no-referrer";
    img.decoding = "async";

    img.onload = () => {
      finish(true);
    };

    img.onerror = () => {
      finish(false);
    };

    timer = setTimeout(() => {
      finish(false);
    }, timeoutMs);

    img.src = url;
  });
}

/**
 * Progressive image loading for an HTMLImageElement.
 *
 * The SVG placeholder is displayed immediately.
 * The real image replaces it after successful loading.
 */
export function progressiveLoadImage(imgEl, externalUrl, opts = {}) {
  if (!imgEl || !isBrowser) {
    return Promise.resolve(false);
  }

  // Invalidate previous loading attempts.
  const token = (imgEl.__imgTok = (imgEl.__imgTok || 0) + 1);

  const stale = () => imgEl.__imgTok !== token;

  const rawUrl = String(externalUrl ?? "").trim();

  const currentSrc = imgEl.getAttribute("src") || "";

  const placeholder = currentSrc.startsWith("data:image/svg+xml")
    ? currentSrc
    : createCityPlaceholder(imgEl.alt || "");

  // Show a placeholder immediately.
  if (!currentSrc.startsWith("data:")) {
    imgEl.src = placeholder;
  }

  // Empty URLs get a placeholder without sending a request.
  if (!rawUrl || rawUrl === "undefined" || rawUrl === "null") {
    imgEl.dataset.imgState = "placeholder";

    return Promise.resolve(false);
  }

  // Normalize Markdown URLs.
  const url = normalizeImageUrl(rawUrl);

  // Invalid URLs never reach the network.
  if (!url) {
    imgEl.dataset.imgState = "error";

    opts.onError?.(imgEl);

    return Promise.resolve(false);
  }

  imgEl.dataset.imgState = "loading";

  const job = async () => {
    const timeoutMs =
      Number.isFinite(opts.timeoutMs) && opts.timeoutMs > 0
        ? opts.timeoutMs
        : 8000;

    const loadedImage = await probe(url, timeoutMs);

    if (stale()) return false;

    // The remote image could not be loaded.
    if (!loadedImage) {
      imgEl.dataset.imgState = "error";

      opts.onError?.(imgEl);

      return false;
    }

    // Wait for image decoding if available.
    try {
      if (loadedImage.decode) {
        await loadedImage.decode();
      }
    } catch {
      // The image may still be usable.
    }

    if (stale()) return false;

    imgEl.referrerPolicy = "no-referrer";
    imgEl.decoding = "async";

    // Final image successfully loaded.
    imgEl.onload = () => {
      if (stale()) return;

      imgEl.onload = null;
      imgEl.onerror = null;

      imgEl.dataset.imgState = "loaded";

      // Optional entrance animation.
      const reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      )?.matches;

      if (typeof imgEl.animate === "function" && !reducedMotion) {
        imgEl.animate(
          [
            {
              opacity: 0.15,
              filter: "blur(6px)",
            },
            {
              opacity: 1,
              filter: "blur(0)",
            },
          ],
          {
            duration: 500,
            easing: "cubic-bezier(.16,1,.3,1)",
          },
        );
      }

      opts.onLoad?.(imgEl);
    };

    // If the final image request fails, restore the placeholder.
    imgEl.onerror = () => {
      if (stale()) return;

      imgEl.onload = null;
      imgEl.onerror = null;

      imgEl.src = placeholder;

      imgEl.dataset.imgState = "error";

      opts.onError?.(imgEl);
    };

    imgEl.src = url;

    return true;
  };

  return schedule(job);
}

/* ─────────────────────────────────────────
   Intersection Observer / Lazy Loading
───────────────────────────────────────── */

let io = null;

function getObserver() {
  if (io) return io;

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        io.unobserve(entry.target);

        progressiveLoadImage(entry.target, entry.target.dataset.externalSrc);
      });
    },
    {
      rootMargin: "500px 0px",
    },
  );

  return io;
}

/**
 * Finds images with data-external-src
 * and initializes progressive loading.
 */
export function setupProgressiveImages(root = isBrowser ? document : null) {
  if (!isBrowser || !root || !root.querySelectorAll) {
    return;
  }

  const images = [...root.querySelectorAll("img[data-external-src]")];

  // Include root itself if it is a matching image.
  if (root.matches && root.matches("img[data-external-src]")) {
    images.unshift(root);
  }

  images.forEach((img) => {
    const externalUrl = img.dataset.externalSrc ?? "";

    // Prevent repeated initialization.
    if (img.dataset.pd === externalUrl) {
      return;
    }

    img.dataset.pd = externalUrl;

    const currentSrc = img.getAttribute("src") || "";

    // Display placeholder immediately.
    if (!currentSrc.startsWith("data:")) {
      img.src = createCityPlaceholder(img.alt || "");
    }

    const normalizedUrl = normalizeImageUrl(externalUrl);

    // Empty or invalid URLs keep their placeholder.
    if (!normalizedUrl) {
      img.dataset.imgState = externalUrl.trim() ? "error" : "placeholder";

      return;
    }

    // Lazy loading when supported.
    if (typeof window.IntersectionObserver === "function") {
      getObserver().observe(img);
    } else {
      // Fallback for older browsers.
      progressiveLoadImage(img, externalUrl);
    }
  });
}

/* ─────────────────────────────────────────
   Global Image Fallback
───────────────────────────────────────── */

export function installImageFallback() {
  if (!isBrowser || installImageFallback.done) {
    return;
  }

  installImageFallback.done = true;

  document.addEventListener(
    "error",
    (event) => {
      const img = event.target;

      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      if (img.dataset.imgState || img.dataset.phFallback) {
        return;
      }

      // Do not replace Leaflet map images.
      if (
        img.matches(".leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow")
      ) {
        return;
      }

      const src = img.currentSrc || img.src;

      if (!src || src.startsWith("data:")) {
        return;
      }

      img.dataset.phFallback = "1";

      img.src = createCityPlaceholder(img.alt || "");
    },
    true,
  );
}

// Install global fallback once.
installImageFallback();

/* ─────────────────────────────────────────
   Country Flags
───────────────────────────────────────── */

export function countryFlagEmoji(code) {
  const countryCode = String(code || "").toUpperCase();

  if (!/^[A-Z]{2}$/.test(countryCode)) {
    return "🌍";
  }

  try {
    return String.fromCodePoint(
      ...countryCode.split("").map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
    );
  } catch {
    return "🌍";
  }
}

/**
 * Returns a direct FlagCDN image URL.
 */
export function countryFlagUrl(code, width = 80) {
  const countryCode = String(code || "")
    .trim()
    .toLowerCase();

  if (!/^[a-z]{2}$/.test(countryCode)) {
    return "";
  }

  const supportedWidths = [20, 40, 80, 160, 320];

  const safeWidth = supportedWidths.includes(Number(width))
    ? Number(width)
    : 80;

  return `https://flagcdn.com/w${safeWidth}/${countryCode}.png`;
}
