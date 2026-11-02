/**
 * SHAHRAVA — Localization & Formatting Utilities
 * Pure functions supporting Persian (fa) and English (en) formatting.
 */

// Persian digits conversion map
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts English digits in a string or number to Persian digits.
 * @param {string|number} input 
 * @returns {string}
 */
export function toPersianDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (char) => PERSIAN_DIGITS[parseInt(char, 10)]);
}

/**
 * Formats a number with standard thousand separators.
 * In Persian, uses Persian digits and Persian comma (٬).
 * @param {number} num 
 * @param {string} lang 'fa' | 'en'
 * @returns {string}
 */
export function formatNumber(num, lang = 'fa') {
  if (typeof num !== 'number' || isNaN(num)) return '—';
  
  if (lang === 'fa') {
    return new Intl.NumberFormat('fa-IR').format(num);
  }
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Formats a temperature in Celsius.
 * @param {number} celsius 
 * @param {string} lang 
 * @returns {string}
 */
export function formatTemperature(celsius, lang = 'fa') {
  if (typeof celsius !== 'number' || isNaN(celsius)) return '—';
  const rounded = Math.round(celsius);
  if (lang === 'fa') {
    return `${toPersianDigits(rounded)}°`;
  }
  return `${rounded}°C`;
}

/**
 * Formats coordinates into a readable DMS or decimal string.
 * @param {number} lat 
 * @param {number} lon 
 * @param {string} lang 
 * @returns {string}
 */
export function formatCoordinates(lat, lon, lang = 'fa') {
  if (typeof lat !== 'number' || typeof lon !== 'number') return '—';
  const latDir = lat >= 0 ? (lang === 'fa' ? 'شمالی' : 'N') : (lang === 'fa' ? 'جنوبی' : 'S');
  const lonDir = lon >= 0 ? (lang === 'fa' ? 'شرقی' : 'E') : (lang === 'fa' ? 'غربی' : 'W');
  const latAbs = Math.abs(lat).toFixed(4);
  const lonAbs = Math.abs(lon).toFixed(4);

  if (lang === 'fa') {
    return `${toPersianDigits(latAbs)}° ${latDir}، ${toPersianDigits(lonAbs)}° ${lonDir}`;
  }
  return `${latAbs}° ${latDir}, ${lonAbs}° ${lonDir}`;
}

/**
 * Formats local time for a given timezone identifier.
 * @param {string} timezone e.g. "Asia/Tehran"
 * @param {string} lang 'fa' | 'en'
 * @returns {string}
 */
export function formatLocalTime(timezone = 'UTC', lang = 'fa') {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return formatter.format(now);
  } catch {
    return '—';
  }
}

/**
 * Normalizes an array of values into a 0-100 score for D3 radar visualizations.
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function normalizeMetric(value, min, max) {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  if (max === min) return 50;
  const clamped = Math.max(min, Math.min(max, value));
  return Math.round(((clamped - min) / (max - min)) * 100);
}
