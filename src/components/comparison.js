/**
 * SHAHRAVA — City Comparison Modal
 * ✅ Accessible + SVG placeholder + progressive loading with proxy
 */

import { CITIES, resolveCitySafe } from "../data/cities.js";
import { getCityTheme } from "../data/themes.js";
import { ComparisonRadar } from "../visualizations/comparison-radar.js";
import { formatNumber } from "../utils/formatting.js";
import { getLang, t } from "../i18n/index.js";
import {
  createCityPlaceholder,
  progressiveLoadImage,
} from "../utils/placeholders.js";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export class CityComparisonModal {
  constructor() {
    this.modal = document.getElementById("comparison-modal");
    this.splitPreviewContainer = document.getElementById(
      "comparison-split-preview",
    );
    this.city1Select = document.getElementById("compare-city-1");
    this.city2Select = document.getElementById("compare-city-2");
    this.radarContainer = document.getElementById("comparison-radar-chart");
    this.tableContainer = document.getElementById("comparison-table-container");
    this.closeBtn = document.getElementById("close-comparison-modal");
    this.radar = null;

    this.city1Id = "tehran";
    this.city2Id = "tokyo";

    this._previouslyFocused = null;
    this._tabHandler = null;

    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.hide());
    }

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.hide();
    });

    if (this.city1Select) {
      this.city1Select.addEventListener("change", (e) => {
        this.city1Id = e.target.value;
        this.updateComparison();
      });
    }

    if (this.city2Select) {
      this.city2Select.addEventListener("change", (e) => {
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
    const allOptions = [...CITIES];

    [this.city1Id, this.city2Id].forEach((id) => {
      if (id && !allOptions.some((c) => c.id === id)) {
        const osmCity = resolveCitySafe(id);
        if (osmCity && osmCity.id) {
          allOptions.push(osmCity);
        }
      }
    });

    const optionsHtml = allOptions
      .map(
        (c) =>
          `<option value="${c.id}">${lang === "fa" ? c.nameFa : c.nameEn} (${lang === "fa" ? c.countryFa : c.countryEn})</option>`,
      )
      .join("");

    if (this.city1Select) this.city1Select.innerHTML = optionsHtml;
    if (this.city2Select) this.city2Select.innerHTML = optionsHtml;

    if (this.city1Select) this.city1Select.value = this.city1Id;
    if (this.city2Select) this.city2Select.value = this.city2Id;
  }

  show(initialCityId) {
    if (initialCityId) this.city1Id = initialCityId;
    this.populateDropdowns();

    if (this.modal) {
      this.modal.classList.remove("hidden");
      this.modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("overflow-hidden");

      this._previouslyFocused = document.activeElement;
      this._trapFocus();
      setTimeout(() => this.city1Select?.focus(), 60);
    }

    this.updateComparison();
  }

  hide() {
    if (this.modal) {
      this.modal.classList.add("hidden");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("overflow-hidden");

      if (this._previouslyFocused && this._previouslyFocused.focus) {
        this._previouslyFocused.focus();
      }
      this._previouslyFocused = null;

      if (this._tabHandler) {
        this.modal.removeEventListener("keydown", this._tabHandler);
        this._tabHandler = null;
      }
    }
  }

  _trapFocus() {
    if (!this.modal) return;
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const focusable = this.modal.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    if (this._tabHandler) {
      this.modal.removeEventListener("keydown", this._tabHandler);
    }
    this._tabHandler = handleTab;
    this.modal.addEventListener("keydown", handleTab);
  }

  updateComparison() {
    const city1 = resolveCitySafe(this.city1Id);
    const city2 = resolveCitySafe(this.city2Id);
    const theme1 = getCityTheme(city1.themeId || city1.id);
    const theme2 = getCityTheme(city2.themeId || city2.id);
    const lang = getLang();
    const name1 = lang === "fa" ? city1.nameFa : city1.nameEn;
    const name2 = lang === "fa" ? city2.nameFa : city2.nameEn;

    if (this.splitPreviewContainer) {
      const country1 = lang === "fa" ? city1.countryFa : city1.countryEn;
      const country2 = lang === "fa" ? city2.countryFa : city2.countryEn;

      // ✅ SVG placeholder به عنوان src اولیه
      const placeholder1 = createCityPlaceholder(
        name1,
        theme1.primary,
        theme1.secondary,
        { width: 800, height: 400 },
      );
      const placeholder2 = createCityPlaceholder(
        name2,
        theme2.primary,
        theme2.secondary,
        { width: 800, height: 400 },
      );

      this.splitPreviewContainer.innerHTML = `
        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden border transition-all duration-300 group shadow-lg" style="border-color:${theme1.primary}55; box-shadow:0 0 25px -5px ${theme1.primary}33">
          <img id="compare-img-1" src="${placeholder1}" alt="${name1}" class="cinematic-img absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-105"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070C11] via-[#070C11]/50 to-transparent"></div>
          <div class="relative z-10 p-3.5 h-full flex flex-col justify-between">
            <span class="self-start px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11] shadow-md" style="background:${theme1.primary}">${country1}</span>
            <div>
              <h4 class="font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-md">${name1}</h4>
              <p class="text-[11px] text-slate-300 line-clamp-1">${lang === "fa" ? city1.taglineFa : city1.taglineEn}</p>
            </div>
          </div>
        </div>

        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden border transition-all duration-300 group shadow-lg" style="border-color:${theme2.primary}55; box-shadow:0 0 25px -5px ${theme2.primary}33">
          <img id="compare-img-2" src="${placeholder2}" alt="${name2}" class="cinematic-img absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-105"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#070C11] via-[#070C11]/50 to-transparent"></div>
          <div class="relative z-10 p-3.5 h-full flex flex-col justify-between">
            <span class="self-start px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11] shadow-md" style="background:${theme2.primary}">${country2}</span>
            <div>
              <h4 class="font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-md">${name2}</h4>
              <p class="text-[11px] text-slate-300 line-clamp-1">${lang === "fa" ? city2.taglineFa : city2.taglineEn}</p>
            </div>
          </div>
        </div>
      `;

      // ✅ بارگذاری با پروکسی از طریق progressiveLoadImage
      const img1 = document.getElementById("compare-img-1");
      const img2 = document.getElementById("compare-img-2");
      if (img1 && city1.heroImage) progressiveLoadImage(img1, city1.heroImage);
      if (img2 && city2.heroImage) progressiveLoadImage(img2, city2.heroImage);
    }

    if (this.radar) {
      this.radar.render(city1, city2, theme1, theme2);
    }

    const metrics = [
      {
        label: t("hero.population", "جمعیت"),
        v1: formatNumber(city1.population, lang),
        v2: formatNumber(city2.population, lang),
        winner:
          city1.population > city2.population
            ? 1
            : city1.population < city2.population
              ? 2
              : 0,
      },
      {
        label: t("hero.density", "تراکم جمعیت (نفر/کم²)"),
        v1: formatNumber(city1.density, lang),
        v2: formatNumber(city2.density, lang),
        winner:
          city1.density > city2.density
            ? 1
            : city1.density < city2.density
              ? 2
              : 0,
      },
      {
        label: t("hero.elevation", "ارتفاع از دریا (متر)"),
        v1: formatNumber(city1.elevation, lang),
        v2: formatNumber(city2.elevation, lang),
        winner:
          city1.elevation > city2.elevation
            ? 1
            : city1.elevation < city2.elevation
              ? 2
              : 0,
      },
      {
        label: t("hero.area", "مساحت شهری (کم²)"),
        v1: formatNumber(city1.area, lang),
        v2: formatNumber(city2.area, lang),
        winner: city1.area > city2.area ? 1 : city1.area < city2.area ? 2 : 0,
      },
      {
        label: t("attractions.title", "جاذبه‌های شاخص"),
        v1: formatNumber(city1.attractions?.length || 0, lang),
        v2: formatNumber(city2.attractions?.length || 0, lang),
        winner:
          (city1.attractions?.length || 0) > (city2.attractions?.length || 0)
            ? 1
            : (city1.attractions?.length || 0) <
                (city2.attractions?.length || 0)
              ? 2
              : 0,
      },
    ];

    const rowsHtml = metrics
      .map(
        (m) => `
      <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td class="py-3 px-4 font-semibold text-white/90 text-sm">${m.label}</td>
        <td class="py-3 px-4 text-center font-bold text-sm ${m.winner === 1 ? "text-emerald-400" : "text-slate-300"}">
          ${m.v1} ${m.winner === 1 ? "★" : ""}
        </td>
        <td class="py-3 px-4 text-center font-bold text-sm ${m.winner === 2 ? "text-emerald-400" : "text-slate-300"}">
          ${m.v2} ${m.winner === 2 ? "★" : ""}
        </td>
      </tr>
    `,
      )
      .join("");

    if (this.tableContainer) {
      const metricColHeader = lang === "fa" ? "شاخص مقایسه‌ای" : "Metric";
      this.tableContainer.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-right" dir="${lang === "fa" ? "rtl" : "ltr"}">
            <thead>
              <tr class="border-b border-white/10 text-xs text-slate-400 uppercase tracking-wider">
                <th class="py-2.5 px-4 font-bold">${metricColHeader}</th>
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
