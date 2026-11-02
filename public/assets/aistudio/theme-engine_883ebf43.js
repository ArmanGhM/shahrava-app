/**
 * SHAHRAVA — Dynamic City Identity Engine
 * Obsidian Luxury Architecture with multi-layer surface depth.
 */

import { getCityTheme } from "../data/themes.js";
import { citySoundEngine } from "../utils/helpers.js";

let currentTheme = null;
let isDarkMode = true;

/**
 * Generates an ultra-refined SVG decorative pattern based on city pattern type
 */
function getPatternSvg(patternType, primaryColor, secondaryColor) {
  const p = encodeURIComponent(primaryColor);
  const s = encodeURIComponent(secondaryColor);

  const patterns = {
    "persian-girih": `<svg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.75' stroke-opacity='0.10'><path d='M40 0 L80 40 L40 80 L0 40 Z'/><path d='M20 20 L60 20 L60 60 L20 60 Z'/><circle cx='40' cy='40' r='14'/><circle cx='40' cy='40' r='6' stroke='${s}' stroke-opacity='0.18'/><path d='M0 0 L80 80 M80 0 L0 80' stroke-dasharray='2,4'/></g></svg>`,
    "tokyo-cyber-grid": `<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.6' stroke-opacity='0.10'><path d='M0 30 H60 M30 0 V60'/><circle cx='30' cy='30' r='1.5' fill='${s}' fill-opacity='0.25'/><path d='M10 10 L20 10 L20 20'/><path d='M50 50 L40 50 L40 40'/></g></svg>`,
    "paris-haussmann": `<svg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M35 10 C 20 10, 10 25, 10 45 L 60 45 C 60 25, 50 10, 35 10 Z'/><path d='M35 15 L35 45'/><circle cx='35' cy='10' r='3.5' stroke='${s}' stroke-opacity='0.18'/></g></svg>`,
    "dubai-mashrabiya": `<svg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><polygon points='32,4 60,32 32,60 4,32'/><polygon points='32,14 50,32 32,50 14,32' stroke='${s}' stroke-opacity='0.16'/><circle cx='32' cy='32' r='3'/></g></svg>`,
    "istanbul-iznik": `<svg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.12'><path d='M36 6 Q 56 36 36 66 Q 16 36 36 6 Z'/><circle cx='36' cy='36' r='8' stroke='${s}' stroke-opacity='0.18'/></g></svg>`,
    "newyork-artdeco": `<svg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M0 56 L0 20 L14 6 L28 20 L28 56'/><path d='M28 56 L28 20 L42 6 L56 20 L56 56' stroke='${s}' stroke-opacity='0.15'/></g></svg>`,
    "rome-colosseum-arch": `<svg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M10 65 L10 30 Q 10 10 30 10 Q 50 10 50 30 L50 65'/><path d='M22 65 L22 35 Q 22 22 30 22 Q 38 22 38 35 L38 65' stroke='${s}' stroke-opacity='0.18'/></g></svg>`,
    "barcelona-trencadis": `<svg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.8' stroke-opacity='0.10'><path d='M10 10 Q 30 0 54 10 Q 64 30 54 54 Q 30 64 10 54 Q 0 30 10 10 Z'/><circle cx='32' cy='32' r='10' stroke='${s}' stroke-opacity='0.20'/><circle cx='32' cy='32' r='4'/></g></svg>`,
    "london-crown-grid": `<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.6' stroke-opacity='0.10'><circle cx='30' cy='30' r='22'/><circle cx='30' cy='30' r='14' stroke='${s}' stroke-opacity='0.15'/><path d='M30 4 V30 L30 56 M4 30 H30 H56'/></g></svg>`,
    "isfahan-arabesque": `<svg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.12'><path d='M40 5 Q 60 20 55 40 Q 60 60 40 75 Q 20 60 25 40 Q 20 20 40 5 Z'/><path d='M40 20 Q 50 30 48 40 Q 50 50 40 60 Q 30 50 32 40 Q 30 30 40 20 Z' stroke='${s}' stroke-opacity='0.20'/></g></svg>`,
    "kyoto-zen-bamboo": `<svg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M15 10 Q 25 35 15 60'/><path d='M35 10 Q 45 35 35 60'/><path d='M55 10 Q 65 35 55 60' stroke='${s}' stroke-opacity='0.15'/></g></svg>`,
    "cairo-pyramid-lotus": `<svg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M36 8 L64 60 L8 60 Z'/><path d='M22 60 L36 36 L50 60' stroke='${s}' stroke-opacity='0.18'/><circle cx='36' cy='20' r='4'/></g></svg>`,
    "sydney-opera-shells": `<svg width='68' height='68' viewBox='0 0 68 68' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.7' stroke-opacity='0.10'><path d='M8 60 Q 20 20 34 60'/><path d='M18 60 Q 34 10 50 60'/><path d='M34 60 Q 48 20 60 60' stroke='${s}' stroke-opacity='0.15'/></g></svg>`,
    "geometric-stellar": `<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='${p}' stroke-width='0.5' stroke-opacity='0.08'><circle cx='30' cy='30' r='18'/><path d='M30 0 V60 M0 30 H60'/><polygon points='30,12 42,22 48,36 38,48 22,48 12,36 18,22' stroke='${s}' stroke-opacity='0.15'/></g></svg>`,
  };

  const svg = patterns[patternType] || patterns["geometric-stellar"];
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Applies a city theme to the document `:root`
 * @param {string|object} themeInput
 * @param {boolean} [darkMode=true]
 */
export function applyCityTheme(themeInput, darkMode = true) {
  const theme =
    typeof themeInput === "string" ? getCityTheme(themeInput) : themeInput;
  if (!theme) return;

  currentTheme = theme;
  isDarkMode = darkMode;

  const root = document.documentElement;

  // Active theme values
  const primary = theme.primary;
  const primaryHover = theme.primaryHover || primary;
  const secondary = theme.secondary;
  const accent = theme.accent;

  const bg = darkMode ? theme.background : theme.light.background;
  const bgSecondary = darkMode
    ? theme.backgroundSecondary || "#0D131A"
    : theme.light.backgroundSecondary;
  const surface = darkMode ? theme.surface : theme.light.surface;
  const surfaceElevated = darkMode
    ? theme.surfaceElevated || "#1B2530"
    : theme.light.surfaceElevated;
  const surfaceHover = darkMode
    ? theme.surfaceHover || "#222E39"
    : theme.light.surfaceHover;
  const surfaceOverlay = darkMode
    ? theme.surfaceOverlay
    : "rgba(255, 255, 255, 0.92)";

  const border = darkMode ? theme.border : theme.light.border;
  const borderActive = darkMode
    ? theme.borderActive || "rgba(255, 255, 255, 0.18)"
    : theme.light.borderActive;

  const text = darkMode ? theme.text : theme.light.text;
  const textSecondary = darkMode
    ? theme.textSecondary || "#A8B3BF"
    : theme.light.textSecondary;
  const muted = darkMode ? theme.muted : theme.light.muted;

  const glow = theme.glow;
  const glowAmbient = theme.glowAmbient || "rgba(255, 255, 255, 0.05)";
  const heroGradient = darkMode
    ? theme.heroGradient
    : "linear-gradient(180deg, rgba(248, 250, 252, 0.4) 0%, #F8FAFC 100%)";

  // Set CSS variables
  root.style.setProperty("--city-primary", primary);
  root.style.setProperty("--city-primary-hover", primaryHover);
  root.style.setProperty("--city-secondary", secondary);
  root.style.setProperty("--city-accent", accent);

  root.style.setProperty("--city-bg", bg);
  root.style.setProperty("--city-bg-secondary", bgSecondary);
  root.style.setProperty("--city-surface", surface);
  root.style.setProperty("--city-surface-elevated", surfaceElevated);
  root.style.setProperty("--city-surface-hover", surfaceHover);
  root.style.setProperty("--city-surface-overlay", surfaceOverlay);

  root.style.setProperty("--city-border", border);
  root.style.setProperty("--city-border-active", borderActive);

  root.style.setProperty("--city-glow", glow);
  root.style.setProperty("--city-glow-ambient", glowAmbient);

  root.style.setProperty("--city-text", text);
  root.style.setProperty("--city-text-secondary", textSecondary);
  root.style.setProperty("--city-muted", muted);
  root.style.setProperty("--city-hero-gradient", heroGradient);

  // Set background pattern
  const patternSvg = getPatternSvg(theme.patternType, primary, secondary);
  root.style.setProperty("--city-pattern", `url("${patternSvg}")`);

  // Update body class for mode
  if (darkMode) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  // Update meta theme-color for mobile address bar
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", bg);
  }

  // Set active theme sound in ambient sound engine
  citySoundEngine.setThemeSound(theme.id);

  // Dispatch custom event for D3 charts, Leaflet map, etc.
  window.dispatchEvent(
    new CustomEvent("citythemechange", {
      detail: { theme, darkMode },
    }),
  );

  // Store in localStorage
  localStorage.setItem("shahrava_active_theme", theme.id);
  localStorage.setItem("shahrava_dark_mode", darkMode ? "true" : "false");
}

/**
 * Returns current active city theme
 */
export function getCurrentTheme() {
  return currentTheme || getCityTheme("tehran");
}

/**
 * Toggles dark/light mode for the current city theme
 */
export function toggleThemeMode() {
  isDarkMode = !isDarkMode;
  if (currentTheme) {
    applyCityTheme(currentTheme, isDarkMode);
  }
  return isDarkMode;
}
