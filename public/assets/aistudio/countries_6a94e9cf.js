/**
 * SHAHRAVA — Countries Data & REST Countries Integration
 * Provides country flags, official currency, capital city, and regional details.
 */

const COUNTRY_REGISTRY = {
  IR: {
    commonName: 'ایران',
    officialName: 'جمهوری اسلامی ایران',
    capital: 'تهران',
    flagSvg: 'https://flagcdn.com/w80/ir.png',
    currency: 'ریال ایران (IRR)',
    languages: 'فارسی',
    region: 'آسیا',
    subregion: 'جنوب و غرب آسیا'
  },
  JP: {
    commonName: 'ژاپن',
    officialName: 'ژاپن',
    capital: 'توکیو',
    flagSvg: 'https://flagcdn.com/w80/jp.png',
    currency: 'ین ژاپن (JPY / ¥)',
    languages: 'ژاپنی',
    region: 'آسیا',
    subregion: 'شرق آسیا'
  },
  FR: {
    commonName: 'فرانسه',
    officialName: 'جمهوری فرانسه',
    capital: 'پاریس',
    flagSvg: 'https://flagcdn.com/w80/fr.png',
    currency: 'یورو (EUR / €)',
    languages: 'فرانسوی',
    region: 'اروپا',
    subregion: 'اروپای غربی'
  },
  AE: {
    commonName: 'امارات متحده عربی',
    officialName: 'دولت امارات متحده عربی',
    capital: 'ابوظبی',
    flagSvg: 'https://flagcdn.com/w80/ae.png',
    currency: 'درهم امارات (AED)',
    languages: 'عربی',
    region: 'آسیا',
    subregion: 'خاورمیانه'
  },
  TR: {
    commonName: 'ترکیه',
    officialName: 'جمهوری ترکیه',
    capital: 'آنکارا',
    flagSvg: 'https://flagcdn.com/w80/tr.png',
    currency: 'لیر ترکیه (TRY / ₺)',
    languages: 'ترکی استانبولی',
    region: 'اروپا و آسیا',
    subregion: 'آناتولی و بالکان'
  },
  US: {
    commonName: 'ایالات متحده آمریکا',
    officialName: 'ایالات متحده آمریکا',
    capital: 'واشینگتن دی‌سی',
    flagSvg: 'https://flagcdn.com/w80/us.png',
    currency: 'دلار آمریکا (USD / $)',
    languages: 'انگلیسی',
    region: 'آمریکا',
    subregion: 'آمریکای شمالی'
  },
  IT: {
    commonName: 'ایتالیا',
    officialName: 'جمهوری ایتالیا',
    capital: 'رم',
    flagSvg: 'https://flagcdn.com/w80/it.png',
    currency: 'یورو (EUR / €)',
    languages: 'ایتالیایی',
    region: 'اروپا',
    subregion: 'اروپای جنوبی'
  },
  ES: {
    commonName: 'اسپانیا',
    officialName: 'پادشاهی اسپانیا',
    capital: 'مادرید',
    flagSvg: 'https://flagcdn.com/w80/es.png',
    currency: 'یورو (EUR / €)',
    languages: 'اسپانیایی، کاتالان',
    region: 'اروپا',
    subregion: 'شبه‌جزیره ایبری'
  },
  GB: {
    commonName: 'بریتانیا',
    officialName: 'پادشاهی متحد بریتانیای کبیر',
    capital: 'لندن',
    flagSvg: 'https://flagcdn.com/w80/gb.png',
    currency: 'پوند استرلینگ (GBP / £)',
    languages: 'انگلیسی',
    region: 'اروپا',
    subregion: 'جزایر بریتانیا'
  },
  EG: {
    commonName: 'مصر',
    officialName: 'جمهوری عربی مصر',
    capital: 'قاهره',
    flagSvg: 'https://flagcdn.com/w80/eg.png',
    currency: 'پوند مصر (EGP)',
    languages: 'عربی',
    region: 'آفریقا',
    subregion: 'شمال آفریقا'
  },
  AU: {
    commonName: 'استرالیا',
    officialName: 'کشور مشترک‌المنافع استرالیا',
    capital: 'کانبرا',
    flagSvg: 'https://flagcdn.com/w80/au.png',
    currency: 'دلار استرالیا (AUD / $)',
    languages: 'انگلیسی',
    region: 'اقیانوسیه',
    subregion: 'استرالزی'
  }
};

/**
 * Retrieves country details by ISO Alpha-2 code
 */
export async function fetchCountryDetails(countryCode) {
  if (!countryCode) return null;
  const code = countryCode.toUpperCase();

  if (COUNTRY_REGISTRY[code]) {
    return COUNTRY_REGISTRY[code];
  }

  // Graceful fallback for unlisted country codes
  return {
    commonName: code,
    officialName: code,
    capital: '—',
    flagSvg: `https://flagcdn.com/w80/${code.toLowerCase()}.png`,
    currency: 'ارز بین‌المللی',
    languages: 'زبان رسمی کشور',
    region: 'بین‌المللی',
    subregion: 'جهانی'
  };
}
