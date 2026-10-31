/**
 * SHAHRAVA — City Comparison Modal & Tool
 * Compare any 2 metropolises side-by-side with D3 radar visualization and spec table.
 */

import { CITIES, getCityById } from '../data/cities.js';
import { getCityTheme } from '../data/themes.js';
import { ComparisonRadar } from '../visualizations/comparison-radar.js';
import { formatNumber, formatTemperature } from '../utils/formatting.js';
import { getLang, t } from '../i18n/index.js';

export class CityComparisonModal {
  constructor() {
    this.modal = document.getElementById('comparison-modal');
    this.splitPreviewContainer = document.getElementById('comparison-split-preview');
    this.city1Select = document.getElementById('compare-city-1');
    this.city2Select = document.getElementById('compare-city-2');
    this.radarContainer = document.getElementById('comparison-radar-chart');
    this.tableContainer = document.getElementById('comparison-table-container');
    this.closeBtn = document.getElementById('close-comparison-modal');
    this.radar = null;

    this.city1Id = 'tehran';
    this.city2Id = 'tokyo';

    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });

    if (this.city1Select) {
      this.city1Select.addEventListener('change', (e) => {
        this.city1Id = e.target.value;
        this.updateComparison();
      });
    }

    if (this.city2Select) {
      this.city2Select.addEventListener('change', (e) => {
        this.city2Id = e.target.value;
        this.updateComparison();
      });
    }

    if (this.radarContainer) {
      this.radar = new ComparisonRadar(this.radarContainer);
    }

    this.populateDropdowns();
  }

  populateDropdowns() {
    const lang = getLang();
    const optionsHtml = CITIES.map(c => `
      <option value="${c.id}">${lang === 'fa' ? c.nameFa : c.nameEn} (${lang === 'fa' ? c.countryFa : c.countryEn})</option>
    `).join('');

    if (this.city1Select) this.city1Select.innerHTML = optionsHtml;
    if (this.city2Select) this.city2Select.innerHTML = optionsHtml;

    if (this.city1Select) this.city1Select.value = this.city1Id;
    if (this.city2Select) this.city2Select.value = this.city2Id;
  }

  show(initialCityId) {
    if (initialCityId) {
      this.city1Id = initialCityId;
      if (this.city1Select) this.city1Select.value = initialCityId;
    }
    this.populateDropdowns();
    this.modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    this.updateComparison();
  }

  hide() {
    this.modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  updateComparison() {
    const city1 = getCityById(this.city1Id);
    const city2 = getCityById(this.city2Id);
    const theme1 = getCityTheme(city1.themeId || city1.id);
    const theme2 = getCityTheme(city2.themeId || city2.id);
    const lang = getLang();
    const name1 = lang === 'fa' ? city1.nameFa : city1.nameEn;
    const name2 = lang === 'fa' ? city2.nameFa : city2.nameEn;

    // Render Cinematic Split-Screen Visual Comparison Cards
    if (this.splitPreviewContainer) {
      const country1 = lang === 'fa' ? city1.countryFa : city1.countryEn;
      const country2 = lang === 'fa' ? city2.countryFa : city2.countryEn;
      const fallbackImg = 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80';

      this.splitPreviewContainer.innerHTML = `
        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden border transition-all duration-300 group shadow-lg" style="border-color:${theme1.primary}55; box-shadow:0 0 25px -5px ${theme1.primary}33">
          <img src="${city1.heroImage}" alt="${name1}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}'" class="cinematic-img absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-105"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070C11] via-[#070C11]/50 to-transparent"></div>
          <div class="relative z-10 p-3.5 h-full flex flex-col justify-between">
            <span class="self-start px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11] shadow-md" style="background:${theme1.primary}">
              ${country1}
            </span>
            <div>
              <h4 class="font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-md">${name1}</h4>
              <p class="text-[11px] text-slate-300 line-clamp-1">${lang === 'fa' ? city1.taglineFa : city1.taglineEn}</p>
            </div>
          </div>
        </div>

        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden border transition-all duration-300 group shadow-lg" style="border-color:${theme2.primary}55; box-shadow:0 0 25px -5px ${theme2.primary}33">
          <img src="${city2.heroImage}" alt="${name2}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}'" class="cinematic-img absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-105"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070C11] via-[#070C11]/50 to-transparent"></div>
          <div class="relative z-10 p-3.5 h-full flex flex-col justify-between">
            <span class="self-start px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11] shadow-md" style="background:${theme2.primary}">
              ${country2}
            </span>
            <div>
              <h4 class="font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-md">${name2}</h4>
              <p class="text-[11px] text-slate-300 line-clamp-1">${lang === 'fa' ? city2.taglineFa : city2.taglineEn}</p>
            </div>
          </div>
        </div>
      `;
    }

    // Update D3 Radar
    if (this.radar) {
      this.radar.render(city1, city2, theme1, theme2);
    }

    const metrics = [
      {
        label: t('hero.population', 'جمعیت'),
        v1: formatNumber(city1.population, lang),
        v2: formatNumber(city2.population, lang),
        winner: city1.population > city2.population ? 1 : 2
      },
      {
        label: t('hero.density', 'تراکم جمعیت (نفر/کم²)'),
        v1: formatNumber(city1.density, lang),
        v2: formatNumber(city2.density, lang),
        winner: city1.density > city2.density ? 1 : 2
      },
      {
        label: t('hero.elevation', 'ارتفاع از دریا (متر)'),
        v1: formatNumber(city1.elevation, lang),
        v2: formatNumber(city2.elevation, lang),
        winner: city1.elevation > city2.elevation ? 1 : 2
      },
      {
        label: t('hero.area', 'مساحت شهری (کم²)'),
        v1: formatNumber(city1.area, lang),
        v2: formatNumber(city2.area, lang),
        winner: city1.area > city2.area ? 1 : 2
      },
      {
        label: t('attractions.title', 'جاذبه‌های شاخص'),
        v1: formatNumber(city1.attractions?.length || 4, lang),
        v2: formatNumber(city2.attractions?.length || 4, lang),
        winner: (city1.attractions?.length || 4) >= (city2.attractions?.length || 4) ? 1 : 2
      }
    ];

    const rowsHtml = metrics.map(m => `
      <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td class="py-3 px-4 font-semibold text-white/90 text-sm">${m.label}</td>
        <td class="py-3 px-4 text-center font-bold text-sm ${m.winner === 1 ? 'text-emerald-400' : 'text-slate-300'}">
          ${m.v1} ${m.winner === 1 ? '★' : ''}
        </td>
        <td class="py-3 px-4 text-center font-bold text-sm ${m.winner === 2 ? 'text-emerald-400' : 'text-slate-300'}">
          ${m.v2} ${m.winner === 2 ? '★' : ''}
        </td>
      </tr>
    `).join('');

    if (this.tableContainer) {
      this.tableContainer.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-right" dir="${lang === 'fa' ? 'rtl' : 'ltr'}">
            <thead>
              <tr class="border-b border-white/10 text-xs text-slate-400 uppercase tracking-wider">
                <th class="py-2.5 px-4 font-bold">شاخص مقایسه‌ای</th>
                <th class="py-2.5 px-4 text-center font-bold" style="color:${theme1.primary}">${name1}</th>
                <th class="py-2.5 px-4 text-center font-bold" style="color:${theme2.primary}">${name2}</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }
  }
}
