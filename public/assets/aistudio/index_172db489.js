/**
 * SHAHRAVA — i18n Manager
 * Defaults to Persian (fa) with RTL.
 */
import { fa } from './fa.js';
import { en } from './en.js';

const STORAGE_KEY = 'shahrava_lang';
let currentLang = localStorage.getItem(STORAGE_KEY) || 'fa';

const dictionaries = { fa, en };
const listeners = new Set();

/**
 * Gets the current active language code ('fa' | 'en')
 */
export function getLang() {
  return currentLang;
}

/**
 * Sets the active language, updates document direction and lang attributes,
 * persists to localStorage, and notifies listeners.
 * @param {'fa'|'en'} lang 
 */
export function setLang(lang) {
  if (lang !== 'fa' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);

  // Update HTML tag attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

  // Toggle RTL class on body for Tailwind styling adjustments if needed
  if (lang === 'fa') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }

  // Notify registered callbacks
  listeners.forEach(fn => {
    try {
      fn(currentLang);
    } catch (e) {
      console.error('i18n listener error:', e);
    }
  });
}

/**
 * Toggles between Persian and English
 */
export function toggleLang() {
  setLang(currentLang === 'fa' ? 'en' : 'fa');
}

/**
 * Subscribes to language changes
 */
export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Retrieves a translated string by dot notation path (e.g. 'brand.name')
 * @param {string} keyPath 
 * @param {string} [fallback]
 * @returns {any}
 */
export function t(keyPath, fallback = '') {
  const dict = dictionaries[currentLang] || fa;
  const parts = keyPath.split('.');
  let val = dict;
  for (const part of parts) {
    if (val && typeof val === 'object' && part in val) {
      val = val[part];
    } else {
      // Fallback to Persian dictionary if missing in current
      let faVal = fa;
      for (const p of parts) {
        if (faVal && typeof faVal === 'object' && p in faVal) {
          faVal = faVal[p];
        } else {
          return fallback || keyPath;
        }
      }
      return faVal;
    }
  }
  return val;
}
