/**
 * SHAHRAVA — Global City Exploration Platform
 * Main Frontend Application Orchestrator
 */

import { CITIES, getCityById } from "./data/cities.js";
import { getCityTheme } from "./data/themes.js";
import { applyCityTheme, toggleThemeMode } from "./services/theme-engine.js";
import { storage } from "./services/storage.js";
import { getLang, toggleLang, onLangChange, t } from "./i18n/index.js";
import { fetchLiveWeather, getWeatherCondition } from "./api/weather.js";
import { fetchWikiSummary } from "./api/wiki.js";
import { fetchCountryDetails } from "./api/countries.js";
import {
  toPersianDigits,
  formatNumber,
  formatTemperature,
  formatCoordinates,
  formatLocalTime,
} from "./utils/formatting.js";
import { citySoundEngine, $, $$ } from "./utils/helpers.js";
import {
  createCityPlaceholder,
  progressiveLoadImage,
  setupProgressiveImages,
  countryFlagEmoji,
} from "./utils/placeholders.js";

import { ClimateChart } from "./visualizations/climate-chart.js";
import { PopulationChart } from "./visualizations/population-chart.js";
import { GlobeVisualizer } from "./visualizations/globe-viz.js";
import { CityMap } from "./components/map.js";
import { CitySearch } from "./components/search.js";
import { CityComparisonModal } from "./components/comparison.js";
import { FavoritesDrawer } from "./components/favorites.js";

const WEATHER_PHOTOS = {
  rain: createCityPlaceholder("", "#1e3a5f", "#2d4a6b", {
    width: 1200,
    height: 600,
  }),
  snow: createCityPlaceholder("", "#3a4a5f", "#6a7a8f", {
    width: 1200,
    height: 600,
  }),
  thunder: createCityPlaceholder("", "#2a2a3a", "#4a4a5a", {
    width: 1200,
    height: 600,
  }),
  fog: createCityPlaceholder("", "#4a4a4a", "#6a6a6a", {
    width: 1200,
    height: 600,
  }),
  cloudy: createCityPlaceholder("", "#3a3a4a", "#5a5a6a", {
    width: 1200,
    height: 600,
  }),
  clear: createCityPlaceholder("", "#4a5a7a", "#8aa0c0", {
    width: 1200,
    height: 600,
  }),
};

class ShahravaApp {
  constructor() {
    this.activeCity = getCityById("tehran");
    this.activeTheme = getCityTheme("tehran");
    this.isDarkMode = localStorage.getItem("shahrava_dark_mode") !== "false";

    this.liveWeather = null;
    this.wikiData = null;
    this.countryData = null;

    this.isLoadingWeather = false;
    this.isLoadingWiki = false;
    this.isLoadingCountry = false;

    this.loadToken = 0;
    this.timeInterval = null;

    this.climateChart = null;
    this.populationChart = null;
    this.globeViz = null;
    this.cityMap = null;
    this.citySearch = null;
    this.comparisonModal = null;
    this.favoritesDrawer = null;

    this.activeContinent = "all";
    this.activeAttractionCategory = "all";

    this._onHashChange = () => this.handleHashChange();
  }

  async start() {
    const initialLang = getLang();
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === "fa" ? "rtl" : "ltr";

    this.restoreCityFromHash();

    this.activeTheme = getCityTheme(
      this.activeCity.themeId || this.activeCity.id,
    );
    applyCityTheme(this.activeTheme, this.isDarkMode);
    this.updateThemeButtonVisual();

    this.initVisualizations();
    this.initInteractiveComponents();
    this.initEventListeners();

    await this.loadCityData(this.activeCity);

    this.renderFeaturedCities();

    onLangChange(() => this.handleLanguageChange());

    this.updateStaticTranslations();
  }

  restoreCityFromHash() {
    const hash = window.location.hash;
    if (!hash.startsWith("#city=")) return;

    const cityId = hash.replace("#city=", "").toLowerCase();

    const stored = sessionStorage.getItem(`shahrava_osm_${cityId}`);
    if (stored) {
      try {
        this.activeCity = JSON.parse(stored);
        return;
      } catch (err) {
        console.warn("Failed to restore OSM city:", err);
      }
    }

    this.activeCity = getCityById(cityId);
  }

  async handleHashChange() {
    const hash = window.location.hash;
    if (!hash.startsWith("#city=")) return;

    const cityId = hash.replace("#city=", "").toLowerCase();
    if (cityId === this.activeCity.id) return;

    const stored = sessionStorage.getItem(`shahrava_osm_${cityId}`);
    if (stored) {
      try {
        const osmCity = JSON.parse(stored);
        await this.applyCity(osmCity, false);
        return;
      } catch (err) {
        console.warn("Failed to restore OSM city on hashchange:", err);
      }
    }

    await this.switchCity(cityId, false);
  }

  initVisualizations() {
    const climateEl = $("#climate-chart-container");
    if (climateEl) this.climateChart = new ClimateChart(climateEl);

    const popEl = $("#population-chart-container");
    if (popEl) this.populationChart = new PopulationChart(popEl);

    const globeEl = $("#globe-viz-container");
    if (globeEl) this.globeViz = new GlobeVisualizer(globeEl);

    this.cityMap = new CityMap("interactive-city-map");
  }

  initInteractiveComponents() {
    const searchInput = $("#global-city-search-input");
    const searchResults = $("#search-results-dropdown");
    if (searchInput && searchResults) {
      this.citySearch = new CitySearch(
        searchInput,
        searchResults,
        (selected) => {
          if (selected.isCurated && selected.cityData) {
            this.switchCity(selected.cityData.id);
          } else if (selected.osmData) {
            this.loadDynamicOsmCity(selected);
          }
        },
      );
    }

    this.comparisonModal = new CityComparisonModal();

    const favDrawerEl = $("#favorites-drawer");
    if (favDrawerEl) {
      this.favoritesDrawer = new FavoritesDrawer(favDrawerEl, (cityId) => {
        this.switchCity(cityId);
      });
    }
  }

  initEventListeners() {
    window.addEventListener("hashchange", this._onHashChange);

    const langBtn = $("#lang-toggle-btn");
    if (langBtn) langBtn.addEventListener("click", () => toggleLang());

    const themeModeBtn = $("#theme-mode-btn");
    if (themeModeBtn) {
      themeModeBtn.addEventListener("click", () => {
        this.isDarkMode = toggleThemeMode();
        this.updateThemeButtonVisual();
      });
    }

    const soundBtn = $("#sound-toggle-btn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const isPlaying = citySoundEngine.toggle(this.activeTheme.id);
        const wave = $("#sound-wave-icon");
        const text = $("#sound-btn-text");
        if (isPlaying) {
          soundBtn.classList.add(
            "border-emerald-500",
            "text-emerald-400",
            "bg-emerald-500/10",
          );
          if (wave) wave.classList.add("animate-pulse");
          if (text)
            text.textContent = t("soundModal.activeThemeSound", "در حال پخش");
        } else {
          soundBtn.classList.remove(
            "border-emerald-500",
            "text-emerald-400",
            "bg-emerald-500/10",
          );
          if (wave) wave.classList.remove("animate-pulse");
          if (text) text.textContent = t("nav.sound", "اتمسفر صوتی");
        }
      });
    }

    const favBtn = $("#hero-favorite-btn");
    if (favBtn) {
      favBtn.addEventListener("click", () => {
        const isFav = storage.toggleFavorite(this.activeCity.id);
        this.updateFavoriteButtonVisual(isFav);
      });
    }

    const openFavsBtn = $("#open-favorites-drawer-btn");
    if (openFavsBtn) {
      openFavsBtn.addEventListener("click", () => this.favoritesDrawer?.show());
    }

    const openCompareNavBtn = $("#nav-compare-btn");
    if (openCompareNavBtn) {
      openCompareNavBtn.addEventListener("click", () =>
        this.comparisonModal?.show(this.activeCity.id),
      );
    }
    const heroCompareBtn = $("#hero-compare-btn");
    if (heroCompareBtn) {
      heroCompareBtn.addEventListener("click", () =>
        this.comparisonModal?.show(this.activeCity.id),
      );
    }

    const surpriseBtn = $("#surprise-me-btn");
    if (surpriseBtn) {
      surpriseBtn.addEventListener("click", () => {
        const others = CITIES.filter((c) => c.id !== this.activeCity.id);
        if (!others.length) return;
        const randomCity = others[Math.floor(Math.random() * others.length)];
        this.switchCity(randomCity.id);
      });
    }

    $$(".continent-filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".continent-filter-pill").forEach((b) =>
          b.classList.remove("active-filter"),
        );
        btn.classList.add("active-filter");
        this.activeContinent = btn.getAttribute("data-continent");
        this.renderFeaturedCities();
      });
    });

    $$(".attraction-category-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".attraction-category-pill").forEach((b) =>
          b.classList.remove("active-category-filter"),
        );
        btn.classList.add("active-category-filter");
        this.activeAttractionCategory = btn.getAttribute("data-category");
        this.renderAttractionsGrid();
        this.cityMap?.filterCategory(this.activeAttractionCategory);
      });
    });
  }

  async switchCity(cityId, updateHash = true) {
    const city = getCityById(cityId);
    if (!city) return;
    if (city.id === this.activeCity.id) return;
    await this.applyCity(city, updateHash);
  }

  async loadDynamicOsmCity(osmItem) {
    const [lat, lon] = osmItem.coordinates;
    const dynamicTheme = getCityTheme(osmItem.nameEn);
    const displayName = osmItem.nameEn || osmItem.nameFa || osmItem.id;

    const dynamicCity = {
      id: osmItem.id,
      nameFa: osmItem.nameFa,
      nameEn: osmItem.nameEn,
      countryFa: osmItem.countryFa,
      countryEn: osmItem.countryEn,
      countryCode: osmItem.osmData?.countryCode || "UN",
      continent: "global",
      taglineFa: `کلان‌شهر جهانی در مختصات جغرافیایی ${lat.toFixed(2)}°، ${lon.toFixed(2)}°`,
      taglineEn: `Global metropolitan center at coordinates ${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
      coordinates: [lat, lon],
      population: 1_500_000,
      area: 450,
      elevation: 50,
      density: 3300,
      timezone: "UTC",
      themeId: displayName,
      heroImage: createCityPlaceholder(
        displayName,
        dynamicTheme.primary,
        dynamicTheme.secondary,
        { width: 2400, height: 1400 },
      ),
      overviewFa: osmItem.osmData?.fullName || "",
      overviewEn: osmItem.osmData?.fullName || "",
      climate: {
        highs: [12, 14, 18, 22, 26, 30, 32, 31, 28, 22, 16, 12],
        lows: [4, 5, 8, 12, 16, 20, 22, 21, 18, 13, 8, 4],
        rainfall: [45, 40, 50, 42, 35, 25, 20, 22, 30, 45, 55, 60],
      },
      populationHistory: [
        { year: 1970, pop: 0.8 },
        { year: 1990, pop: 1.1 },
        { year: 2010, pop: 1.35 },
        { year: 2024, pop: 1.5 },
      ],
      attractions: [],
    };

    try {
      sessionStorage.setItem(
        `shahrava_osm_${dynamicCity.id}`,
        JSON.stringify(dynamicCity),
      );
    } catch (err) {
      console.warn("Could not persist OSM city:", err);
    }

    await this.applyCity(dynamicCity, true);
  }

  async applyCity(city, updateHash) {
    this.activeCity = city;
    this.activeTheme = getCityTheme(city.themeId || city.id);

    applyCityTheme(this.activeTheme, this.isDarkMode);

    this.resetAttractionFilter();

    if (updateHash) {
      window.location.hash = `#city=${city.id}`;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    await this.loadCityData(city);
    this.renderFeaturedCities();
  }

  resetAttractionFilter() {
    this.activeAttractionCategory = "all";
    $$(".attraction-category-pill").forEach((b) =>
      b.classList.remove("active-category-filter"),
    );
    const allBtn = $('.attraction-category-pill[data-category="all"]');
    if (allBtn) allBtn.classList.add("active-category-filter");
  }

  async loadCityData(city) {
    const token = ++this.loadToken;
    const [lat, lon] = city.coordinates;

    this.liveWeather = null;
    this.wikiData = null;
    this.countryData = null;
    this.isLoadingWeather = true;
    this.isLoadingWiki = true;
    this.isLoadingCountry = Boolean(city.countryCode);

    this.renderHeroSection();
    this.renderQuickStats();
    this.renderLiveWeatherBadge();
    this.renderWeatherSection();
    this.renderEncyclopedicOverview();
    this.renderCountryDetails();
    this.updateFavoriteButtonVisual(storage.isFavorite(city.id));

    if (this.climateChart)
      this.climateChart.render(city.climate, this.activeTheme);
    if (this.populationChart)
      this.populationChart.render(city.populationHistory, this.activeTheme);
    if (this.globeViz) this.globeViz.render(city.coordinates, this.activeTheme);
    if (this.cityMap) this.cityMap.setCity(city, this.activeTheme);

    this.renderAttractionsGrid();

    const [weather, wiki, country] = await Promise.all([
      fetchLiveWeather(lat, lon).catch((err) => {
        console.warn("[weather] fetch failed:", err);
        return null;
      }),
      fetchWikiSummary(
        getLang() === "fa" ? city.nameFa : city.nameEn,
        getLang(),
      ).catch((err) => {
        console.warn("[wiki] fetch failed:", err);
        return null;
      }),
      city.countryCode
        ? fetchCountryDetails(city.countryCode).catch((err) => {
            console.warn("[country] fetch failed:", err);
            return null;
          })
        : Promise.resolve(null),
    ]);

    if (token !== this.loadToken) return;

    this.liveWeather = weather;
    this.wikiData = wiki;
    this.countryData = country;
    this.isLoadingWeather = false;
    this.isLoadingWiki = false;
    this.isLoadingCountry = false;

    this.renderLiveWeatherBadge();
    this.renderWeatherSection();
    this.renderEncyclopedicOverview();
    this.renderCountryDetails();
  }

  renderHeroSection() {
    const lang = getLang();
    const city = this.activeCity;
    const name = lang === "fa" ? city.nameFa : city.nameEn;
    const country = lang === "fa" ? city.countryFa : city.countryEn;
    const tagline = lang === "fa" ? city.taglineFa : city.taglineEn;

    const heroTitle = $("#hero-city-title");
    const heroCountry = $("#hero-city-country");
    const heroTagline = $("#hero-city-tagline");
    const heroBgImg = $("#hero-backdrop-image");
    const motifDesc = $("#city-motif-description");

    if (heroTitle) heroTitle.textContent = name;
    if (heroCountry) heroCountry.textContent = country;
    if (heroTagline) heroTagline.textContent = tagline;

    if (heroBgImg) {
      const placeholder = createCityPlaceholder(
        name,
        this.activeTheme.primary,
        this.activeTheme.secondary,
        { width: 2400, height: 1400 },
      );
      heroBgImg.src = placeholder;
      heroBgImg.alt = `${name} — ${country}`;
      heroBgImg.classList.remove("loading-fade");
      heroBgImg.classList.add("loaded-fade");
      progressiveLoadImage(heroBgImg, city.heroImage);
    }

    if (motifDesc) {
      motifDesc.textContent =
        lang === "fa"
          ? this.activeTheme.motifDescriptionFa
          : this.activeTheme.motifDescriptionEn;
    }

    if (this.timeInterval) clearInterval(this.timeInterval);
    const timeEl = $("#hero-local-time-clock");
    const updateTime = () => {
      if (timeEl) timeEl.textContent = formatLocalTime(city.timezone, lang);
    };
    updateTime();
    this.timeInterval = setInterval(updateTime, 1000);
  }

  renderQuickStats() {
    const lang = getLang();
    const city = this.activeCity;

    const popEl = $("#stat-population-val");
    const elevEl = $("#stat-elevation-val");
    const areaEl = $("#stat-area-val");
    const densEl = $("#stat-density-val");
    const coordEl = $("#stat-coords-val");

    if (popEl) popEl.textContent = formatNumber(city.population, lang);
    if (elevEl)
      elevEl.textContent = `${formatNumber(city.elevation, lang)} ${t("hero.meters", "متر")}`;
    if (areaEl)
      areaEl.textContent = `${formatNumber(city.area, lang)} ${t("hero.sqKm", "کم²")}`;
    if (densEl)
      densEl.textContent = `${formatNumber(city.density, lang)} ${t("hero.personsPerSqKm", "نفر/کم²")}`;
    if (coordEl)
      coordEl.textContent = formatCoordinates(
        city.coordinates[0],
        city.coordinates[1],
        lang,
      );
  }

  renderLiveWeatherBadge() {
    const lang = getLang();
    const badgeTemp = $("#hero-weather-temp");
    const badgeDesc = $("#hero-weather-desc");

    if (!this.liveWeather) {
      const text = this.isLoadingWeather
        ? lang === "fa"
          ? "در حال اتصال..."
          : "Connecting..."
        : lang === "fa"
          ? "داده در دسترس نیست"
          : "No data";
      if (badgeTemp) badgeTemp.textContent = "—°";
      if (badgeDesc) badgeDesc.textContent = text;
      return;
    }

    const cond = getWeatherCondition(this.liveWeather.weatherCode, lang);
    if (badgeTemp)
      badgeTemp.textContent = formatTemperature(
        this.liveWeather.temperature,
        lang,
      );
    if (badgeDesc) badgeDesc.textContent = cond.description;
  }

  renderWeatherSection() {
    const lang = getLang();
    const w = this.liveWeather;

    const mainTemp = $("#weather-section-current-temp");
    const mainDesc = $("#weather-section-condition");
    const feelsLike = $("#weather-stat-feels-like");
    const humidity = $("#weather-stat-humidity");
    const wind = $("#weather-stat-wind");
    const uv = $("#weather-stat-uv");
    const hourlyContainer = $("#weather-hourly-strip");
    const dailyContainer = $("#weather-daily-forecast");
    const weatherBg = $("#weather-ambient-bg");

    if (!w) {
      const text = this.isLoadingWeather
        ? lang === "fa"
          ? "در حال دریافت..."
          : "Loading..."
        : lang === "fa"
          ? "داده در دسترس نیست"
          : "Data unavailable";
      if (mainTemp) mainTemp.textContent = "—°";
      if (mainDesc) mainDesc.textContent = text;
      if (feelsLike) feelsLike.textContent = "—°";
      if (humidity) humidity.textContent = "—";
      if (wind) wind.textContent = "—";
      if (uv) uv.textContent = "—";
      if (hourlyContainer) hourlyContainer.innerHTML = "";
      if (dailyContainer) dailyContainer.innerHTML = "";
      if (weatherBg) {
        weatherBg.src = WEATHER_PHOTOS.cloudy;
        weatherBg.alt = "";
      }
      return;
    }

    const cond = getWeatherCondition(w.weatherCode, lang);

    if (mainTemp) mainTemp.textContent = formatTemperature(w.temperature, lang);
    if (mainDesc) mainDesc.textContent = cond.description;
    if (feelsLike) feelsLike.textContent = formatTemperature(w.feelsLike, lang);
    if (humidity)
      humidity.textContent = `${lang === "fa" ? toPersianDigits(w.humidity) : w.humidity}٪`;
    if (wind)
      wind.textContent = `${lang === "fa" ? toPersianDigits(w.windSpeed) : w.windSpeed} ${t("weather.kmh", "کم/ساعت")}`;
    if (uv)
      uv.textContent = lang === "fa" ? toPersianDigits(w.uvIndex) : w.uvIndex;

    if (weatherBg) {
      const code = w.weatherCode;
      let photo = WEATHER_PHOTOS.clear;
      if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
        photo = WEATHER_PHOTOS.rain;
      else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
        photo = WEATHER_PHOTOS.snow;
      else if (code >= 95) photo = WEATHER_PHOTOS.thunder;
      else if (code === 45 || code === 48) photo = WEATHER_PHOTOS.fog;
      else if (code === 2 || code === 3) photo = WEATHER_PHOTOS.cloudy;
      weatherBg.src = photo;
      weatherBg.alt = cond.description;
    }

    if (hourlyContainer && Array.isArray(w.hourly)) {
      hourlyContainer.innerHTML = w.hourly
        .map((item) => {
          const itemCond = getWeatherCondition(item.code, lang);
          const timeLabel =
            lang === "fa" ? toPersianDigits(item.time) : item.time;
          return `
            <div class="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl bg-[var(--city-surface-elevated)] border border-[var(--city-border)] hover:border-[var(--city-primary)] hover:bg-[var(--city-surface-hover)] hover:shadow-[0_0_22px_-6px_var(--city-glow-strong)] transition-all duration-300 min-w-[80px] text-center cursor-default">
              <span class="text-[10px] text-[var(--city-muted)] font-mono tracking-tight">${timeLabel}</span>
              <div class="font-black text-base text-[var(--city-text)]">${formatTemperature(item.temp, lang)}</div>
              <span class="text-[9px] text-[var(--city-muted)] line-clamp-1 leading-tight">${itemCond.description}</span>
            </div>
          `;
        })
        .join("");
    }

    if (dailyContainer && Array.isArray(w.daily)) {
      dailyContainer.innerHTML = w.daily
        .map((day, idx) => {
          const dayCond = getWeatherCondition(day.code, lang);
          return `
            <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--city-surface-elevated)] border border-[var(--city-border)] hover:border-[var(--city-primary)] hover:bg-[var(--city-surface-hover)] transition-all duration-200">
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <span class="font-bold text-xs text-[var(--city-text)] min-w-[90px] shrink-0">${this.formatDayLabel(day.date, idx, lang)}</span>
                <span class="text-[11px] text-[var(--city-muted)] line-clamp-1">${dayCond.description}</span>
              </div>
              <div class="flex items-center gap-2 font-mono text-xs shrink-0">
                <span class="font-bold text-[var(--city-primary)]">${formatTemperature(day.maxTemp, lang)}</span>
                <span class="text-[var(--city-muted)] opacity-50">/</span>
                <span class="text-[var(--city-muted)]">${formatTemperature(day.minTemp, lang)}</span>
              </div>
            </div>
          `;
        })
        .join("");
    }
  }

  formatDayLabel(isoDate, idx, lang) {
    if (isoDate) {
      const dateObj = new Date(isoDate);
      if (!isNaN(dateObj.getTime())) {
        try {
          return dateObj.toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
        } catch {
          // ignore
        }
      }
    }
    return lang === "fa" ? `روز ${toPersianDigits(idx + 1)}` : `Day ${idx + 1}`;
  }

  renderEncyclopedicOverview() {
    const lang = getLang();
    const city = this.activeCity;
    const descEl = $("#city-encyclopedic-text");
    const wikiCredit = $("#wiki-attribution-link");

    let text = lang === "fa" ? city.overviewFa : city.overviewEn;
    if (this.wikiData?.extract) {
      text = this.wikiData.extract;
    } else if (this.isLoadingWiki && !text) {
      text =
        lang === "fa"
          ? "در حال بارگذاری چکیده دانشنامه‌ای..."
          : "Loading encyclopedic summary...";
    } else if (!text) {
      text =
        lang === "fa"
          ? "اطلاعات دانشنامه‌ای در دسترس نیست."
          : "No encyclopedic data available.";
    }

    if (descEl) descEl.textContent = text;

    if (wikiCredit) {
      if (this.wikiData?.pageUrl) {
        wikiCredit.href = this.wikiData.pageUrl;
        wikiCredit.classList.remove("hidden");
      } else {
        wikiCredit.classList.add("hidden");
        wikiCredit.removeAttribute("href");
      }
    }
  }

  renderCountryDetails() {
    const flagEl = $("#country-flag-icon");
    const capEl = $("#country-capital-val");
    const currEl = $("#country-currency-val");
    const regEl = $("#country-region-val");

    if (!this.countryData) {
      if (flagEl) {
        flagEl.classList.add("hidden");
        flagEl.textContent = "";
      }
      const empty = this.isLoadingCountry ? "..." : "—";
      if (capEl) capEl.textContent = empty;
      if (currEl) currEl.textContent = empty;
      if (regEl) regEl.textContent = empty;
      return;
    }

    const data = this.countryData;
    if (flagEl) {
      flagEl.textContent = countryFlagEmoji(this.activeCity.countryCode);
      flagEl.title = data.commonName || "";
      flagEl.classList.remove("hidden");
    }
    if (capEl) capEl.textContent = data.capital || "—";
    if (currEl) currEl.textContent = data.currency || "—";
    if (regEl) {
      regEl.textContent = data.region
        ? `${data.region}${data.subregion ? ` (${data.subregion})` : ""}`
        : "—";
    }
  }

  renderAttractionsGrid() {
    const container = $("#attractions-cards-grid");
    if (!container) return;

    const lang = getLang();
    const city = this.activeCity;
    const attractions = city.attractions || [];

    const filtered =
      this.activeAttractionCategory === "all"
        ? attractions
        : attractions.filter(
            (attr) => attr.category === this.activeAttractionCategory,
          );

    if (!filtered.length) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center">
          <div class="inline-flex flex-col items-center gap-3 text-[var(--city-muted)]">
            <svg class="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p class="text-xs">${t("attractions.noAttractionsFound", "جاذبه‌ای در این دسته‌بندی یافت نشد.")}</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered
      .map((attr) => {
        const name = lang === "fa" ? attr.nameFa : attr.nameEn;
        const desc = lang === "fa" ? attr.descFa : attr.descEn;
        const catLabel =
          lang === "fa"
            ? attr.categoryFa || "جاذبه"
            : attr.category || "Landmark";

        const placeholder = createCityPlaceholder(
          name,
          this.activeTheme.primary,
          this.activeTheme.secondary,
          { width: 800, height: 600 },
        );

        return `
          <article class="attraction-card obsidian-card group relative overflow-hidden rounded-3xl flex flex-col">
            <div class="relative h-52 overflow-hidden">
              <img src="${placeholder}" data-external-src="${attr.image}" alt="${name}" loading="lazy" decoding="async" class="cinematic-img w-full h-full object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[var(--city-surface)] via-[var(--city-surface)]/40 to-transparent pointer-events-none"></div>
              <span class="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-black shadow-xl backdrop-blur-md" style="background:${this.activeTheme.primary}; color:#070C11">
                ${catLabel}
              </span>
              ${attr.yearBuilt ? `<span class="absolute bottom-3 right-3.5 text-[10px] text-white/90 font-semibold bg-black/55 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">${attr.yearBuilt}</span>` : ""}
            </div>
            <div class="p-5 flex-1 flex flex-col">
              <h4 class="font-bold text-base text-[var(--city-text)] mb-2 group-hover:text-[var(--city-primary)] transition-colors duration-300">${name}</h4>
              <p class="text-xs text-[var(--city-text-secondary)] leading-relaxed line-clamp-3 flex-1">${desc}</p>
            </div>
            <div class="p-5 pt-0">
              <button data-attraction-id="${attr.id}" class="pin-on-map-btn w-full py-2.5 px-4 rounded-xl bg-[var(--city-surface-elevated)] hover:bg-[var(--city-primary)]/10 border border-[var(--city-border)] hover:border-[var(--city-primary)] text-xs text-[var(--city-text)] font-semibold flex items-center justify-center gap-2 transition-all duration-300">
                <svg class="w-3.5 h-3.5 text-[var(--city-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>${t("attractions.viewOnMap", "نمایش روی نقشه")}</span>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    setupProgressiveImages(container);

    container.querySelectorAll(".pin-on-map-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-attraction-id");
        const attr = attractions.find((a) => a.id === id);
        if (!attr || !this.cityMap) return;
        const mapEl = $("#map-section");
        if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => this.cityMap.panToAttraction(attr), 600);
      });
    });
  }

  renderFeaturedCities() {
    const container = $("#featured-cities-grid");
    if (!container) return;

    const lang = getLang();
    const filtered =
      this.activeContinent === "all"
        ? CITIES
        : CITIES.filter((c) => c.continent === this.activeContinent);

    container.innerHTML = filtered
      .map((city) => {
        const theme = getCityTheme(city.themeId || city.id);
        const name = lang === "fa" ? city.nameFa : city.nameEn;
        const country = lang === "fa" ? city.countryFa : city.countryEn;
        const tagline = lang === "fa" ? city.taglineFa : city.taglineEn;
        const isActive = city.id === this.activeCity.id;

        const placeholder = createCityPlaceholder(
          name,
          theme.primary,
          theme.secondary,
          { width: 600, height: 400 },
        );

        return `
          <article data-city-id="${city.id}" class="featured-city-card obsidian-card group relative cursor-pointer overflow-hidden rounded-3xl ${isActive ? "ring-2 ring-[var(--city-primary)] shadow-[0_0_44px_-8px_var(--city-glow-strong)]" : ""} flex flex-col justify-end p-6 min-h-[300px]">
            <img src="${placeholder}" data-external-src="${city.heroImage}" alt="${name}" loading="lazy" decoding="async" class="cinematic-img absolute inset-0 w-full h-full object-cover opacity-70"/>
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--city-bg)] via-[var(--city-bg)]/55 to-transparent pointer-events-none"></div>
            <div class="relative z-10 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full text-[10px] font-black shadow-lg backdrop-blur-md" style="background:${theme.primary}; color:#070C11">
                  ${country}
                </span>
                <span class="w-2.5 h-2.5 rounded-full border-2 border-white/70 shadow-[0_0_10px_var(--city-glow-strong)]" style="background:${theme.secondary}"></span>
              </div>
              <h3 class="font-black text-2xl text-[var(--city-text)] group-hover:text-[var(--city-primary)] transition-colors duration-300 tracking-tight drop-shadow-lg">${name}</h3>
              <p class="text-xs text-[var(--city-text-secondary)] line-clamp-1">${tagline}</p>
              <div class="flex items-center justify-between text-xs pt-2.5 border-t border-[var(--city-border)]">
                <span class="text-[var(--city-muted)]">${t("hero.population", "جمعیت")}: <strong class="text-[var(--city-text)]">${formatNumber(city.population, lang)}</strong></span>
                <span class="text-[var(--city-primary)] font-bold group-hover:-translate-x-1 transition-transform duration-300">←</span>
              </div>
            </div>
            ${isActive ? `<div class="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[var(--city-primary)] shadow-[0_0_12px_var(--city-primary)] animate-pulse"></div>` : ""}
          </article>
        `;
      })
      .join("");

    setupProgressiveImages(container);

    container.querySelectorAll(".featured-city-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-city-id");
        this.switchCity(id);
      });
    });
  }

  updateFavoriteButtonVisual(isFav) {
    const favBtn = $("#hero-favorite-btn");
    const favIcon = $("#hero-favorite-icon");
    const favText = $("#hero-favorite-text");
    if (!favBtn) return;

    if (isFav) {
      favBtn.classList.add(
        "bg-rose-500/20",
        "border-rose-500/50",
        "text-rose-400",
      );
      favBtn.classList.remove("bg-white/10", "border-white/20", "text-white");
      if (favIcon) favIcon.setAttribute("fill", "currentColor");
      if (favText)
        favText.textContent = t("hero.favoritedAction", "در علاقه‌مندی‌ها");
    } else {
      favBtn.classList.remove(
        "bg-rose-500/20",
        "border-rose-500/50",
        "text-rose-400",
      );
      favBtn.classList.add("bg-white/10", "border-white/20", "text-white");
      if (favIcon) favIcon.setAttribute("fill", "none");
      if (favText) favText.textContent = t("hero.favoriteAction", "نشان کردن");
    }
  }

  updateThemeButtonVisual() {
    const icon = $("#theme-mode-icon");
    if (!icon) return;

    icon.innerHTML = this.isDarkMode
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`;
  }

  handleLanguageChange() {
    this.updateStaticTranslations();
    this.renderAll();

    if (
      this.comparisonModal?.modal &&
      !this.comparisonModal.modal.classList.contains("hidden")
    ) {
      this.comparisonModal.populateDropdowns();
      this.comparisonModal.updateComparison();
    }

    if (
      this.favoritesDrawer?.drawer &&
      !this.favoritesDrawer.drawer.classList.contains("hidden")
    ) {
      this.favoritesDrawer.render();
    }
  }

  updateStaticTranslations() {
    const lang = getLang();

    const brandName = $("#brand-name-text");
    const brandTagline = $("#brand-tagline-text");
    const brandBadge = $("#brand-badge-text");
    if (brandName) brandName.textContent = t("brand.name");
    if (brandTagline) brandTagline.textContent = t("brand.tagline");
    if (brandBadge) brandBadge.textContent = t("brand.badge");

    const navCompare = $("#nav-compare-btn-text");
    const navFavs = $("#nav-favs-btn-text");
    const langBtn = $("#lang-toggle-btn-text");
    if (navCompare) navCompare.textContent = t("nav.compare");
    if (navFavs) navFavs.textContent = t("nav.favorites");
    if (langBtn) langBtn.textContent = t("nav.langToggle");

    const searchInput = $("#global-city-search-input");
    if (searchInput) searchInput.placeholder = t("search.placeholder");

    const weatherTitle = $("#weather-section-title");
    const weatherLiveBadge = $("#weather-live-badge");
    if (weatherTitle) weatherTitle.textContent = t("weather.title");
    if (weatherLiveBadge)
      weatherLiveBadge.textContent = t("weather.liveDataBadge");

    const climateTitle = $("#climate-chart-title");
    const climateSub = $("#climate-chart-subtitle");
    const popTitle = $("#pop-chart-title");
    const popSub = $("#pop-chart-subtitle");
    const globeTitle = $("#globe-viz-title");
    const globeSub = $("#globe-viz-subtitle");
    if (climateTitle)
      climateTitle.textContent = t("visualizations.climateTitle");
    if (climateSub)
      climateSub.textContent = t("visualizations.climateSubtitle");
    if (popTitle) popTitle.textContent = t("visualizations.populationTitle");
    if (popSub) popSub.textContent = t("visualizations.populationSubtitle");
    if (globeTitle) globeTitle.textContent = t("visualizations.globeTitle");
    if (globeSub) globeSub.textContent = t("visualizations.globeSubtitle");

    const attrTitle = $("#attractions-section-title");
    const attrSub = $("#attractions-section-subtitle");
    if (attrTitle) attrTitle.textContent = t("attractions.title");
    if (attrSub) attrSub.textContent = t("attractions.subtitle");

    const footerAbout = $("#footer-about-title");
    const footerText = $("#footer-about-text");
    const footerCredits = $("#footer-api-credits");
    const footerRights = $("#footer-rights-text");
    if (footerAbout) footerAbout.textContent = t("footer.aboutTitle");
    if (footerText) footerText.textContent = t("footer.aboutText");
    if (footerCredits) footerCredits.textContent = t("footer.apiCredits");
    if (footerRights) footerRights.textContent = t("footer.rights");

    const timeLabel = $("#hero-local-time-label");
    if (timeLabel)
      timeLabel.textContent = lang === "fa" ? "زمان محلی:" : "Local Time:";

    const heroFavText = $("#hero-favorite-text");
    if (heroFavText) {
      heroFavText.textContent = storage.isFavorite(this.activeCity.id)
        ? t("hero.favoritedAction")
        : t("hero.favoriteAction");
    }

    const heroCompareText = $("#hero-compare-btn-text");
    if (heroCompareText) heroCompareText.textContent = t("hero.compareAction");

    const surpriseText = $("#surprise-me-btn-text");
    if (surpriseText) surpriseText.textContent = t("hero.surpriseMe");

    const labels = {
      pop: ["#stat-label-pop", "hero.population"],
      elev: ["#stat-label-elev", "hero.elevation"],
      area: ["#stat-label-area", "hero.area"],
      dens: ["#stat-label-dens", "hero.density"],
      coords: ["#stat-label-coords", "hero.coordinates"],
    };
    Object.values(labels).forEach(([sel, key]) => {
      const el = $(sel);
      if (el) el.textContent = t(key);
    });

    const countryTitle = $("#country-profile-title");
    const countryCapLabel = $("#country-capital-label");
    const countryCurrLabel = $("#country-currency-label");
    const countryRegLabel = $("#country-region-label");
    if (countryTitle)
      countryTitle.textContent =
        lang === "fa" ? "اطلاعات کشور متبوع" : "Country Profile";
    if (countryCapLabel)
      countryCapLabel.textContent = lang === "fa" ? "پایتخت:" : "Capital:";
    if (countryCurrLabel)
      countryCurrLabel.textContent = lang === "fa" ? "واحد پول:" : "Currency:";
    if (countryRegLabel)
      countryRegLabel.textContent =
        lang === "fa" ? "منطقه جغرافیایی:" : "Region:";
  }

  renderAll() {
    this.renderHeroSection();
    this.renderQuickStats();
    this.renderLiveWeatherBadge();
    this.renderWeatherSection();
    this.renderEncyclopedicOverview();
    this.renderCountryDetails();
    this.renderAttractionsGrid();
    this.renderFeaturedCities();

    if (this.climateChart)
      this.climateChart.render(this.activeCity.climate, this.activeTheme);
    if (this.populationChart)
      this.populationChart.render(
        this.activeCity.populationHistory,
        this.activeTheme,
      );
    if (this.globeViz)
      this.globeViz.render(this.activeCity.coordinates, this.activeTheme);
    if (this.cityMap) this.cityMap.setCity(this.activeCity, this.activeTheme);
  }

  destroy() {
    if (this.timeInterval) clearInterval(this.timeInterval);
    window.removeEventListener("hashchange", this._onHashChange);
    this.climateChart?.destroy?.();
    this.populationChart?.destroy?.();
    this.globeViz?.destroy?.();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new ShahravaApp();
  app
    .start()
    .catch((err) => console.error("[Shahrava] Bootstrap failed:", err));
  window.__SHAHRAVA__ = app;
});
