/**
 * SHAHRAVA — Interactive Leaflet Map (OpenFreeMap Edition)
 *
 * از کاشی‌های برداری OpenFreeMap استفاده می‌کند (جهانی، رایگان، بدون نیاز به API Key).
 * مارکرها و پاپ‌آپ‌های Leaflet بدون تغییر حفظ شده‌اند.
 */

import * as L from "leaflet";
import { maplibreGL } from "@maplibre/maplibre-gl-leaflet";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { getLang } from "../i18n/index.js";

// ✅ تنظیم Worker برای Vite
setWorkerUrl(workerUrl);

export class CityMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.cityMarker = null;
    this.attractionMarkers = [];
    this.currentCity = null;
    this.currentTheme = null;
    this.activeCategory = "all";
    this.init();
  }

  init() {
    const el = document.getElementById(this.containerId);
    if (!el) return;

    // ✅ ایجاد نقشه Leaflet
    this.map = L.map(this.containerId, {
      zoomControl: false,
      attributionControl: true,
    }).setView([35.6892, 51.389], 12);

    L.control.zoom({ position: "bottomright" }).addTo(this.map);

    // ✅ افزودن لایه کاشی برداری OpenFreeMap
    // استایل "liberty" یک ظاهر کلاسیک و متعادل دارد
    maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
    }).addTo(this.map);

    console.info("✅ [نقشه] OpenFreeMap (Liberty) بارگذاری شد");
  }

  setCity(city, theme) {
    if (!this.map || !city) return;
    this.currentCity = city;
    this.currentTheme = theme;

    const [lat, lon] = city.coordinates;
    this.map.flyTo([lat, lon], 12, {
      duration: 1.8,
      easeLinearity: 0.25,
    });

    if (this.cityMarker) {
      this.map.removeLayer(this.cityMarker);
    }
    this.clearAttractionMarkers();

    const primaryColor = theme ? theme.primary : "#0d9488";
    const beaconHtml = `
      <div class="relative flex items-center justify-center w-10 h-10">
        <div class="absolute w-10 h-10 rounded-full animate-ping opacity-60" style="background:${primaryColor}"></div>
        <div class="absolute w-6 h-6 rounded-full shadow-lg border-2 border-white flex items-center justify-center" style="background:${primaryColor}">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    `;

    const beaconIcon = L.divIcon({
      html: beaconHtml,
      className: "custom-city-beacon",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    this.cityMarker = L.marker([lat, lon], { icon: beaconIcon }).addTo(
      this.map,
    );

    const lang = getLang();
    const cityName = lang === "fa" ? city.nameFa : city.nameEn;
    const countryName = lang === "fa" ? city.countryFa : city.countryEn;

    this.cityMarker.bindPopup(`
      <div class="p-2 font-sans text-center">
        <h4 class="font-bold text-slate-900 text-sm">${cityName}</h4>
        <p class="text-xs text-slate-500">${countryName}</p>
      </div>
    `);

    this.renderAttractionMarkers();
  }

  renderAttractionMarkers() {
    this.clearAttractionMarkers();
    if (!this.currentCity || !this.currentCity.attractions) return;

    const lang = getLang();
    const primary = this.currentTheme ? this.currentTheme.primary : "#0d9488";
    const secondary = this.currentTheme
      ? this.currentTheme.secondary
      : "#f59e0b";

    const filtered = this.currentCity.attractions.filter((attr) => {
      if (this.activeCategory === "all") return true;
      return attr.category === this.activeCategory;
    });

    filtered.forEach((attr) => {
      const [lat, lon] = attr.coordinates;
      const name = lang === "fa" ? attr.nameFa : attr.nameEn;
      const desc = lang === "fa" ? attr.descFa : attr.descEn;
      const categoryLabel =
        lang === "fa"
          ? attr.categoryFa || "جاذبه"
          : attr.category || "Landmark";

      const markerHtml = `
        <div class="group relative flex items-center justify-center w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-125">
          <div class="w-8 h-8 rounded-2xl shadow-xl border-2 border-white flex items-center justify-center" style="background:${secondary}">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "custom-attraction-pin",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const popupHtml = `
        <div class="w-64 overflow-hidden rounded-xl bg-white shadow-2xl p-0 font-sans text-right" dir="${lang === "fa" ? "rtl" : "ltr"}">
          ${attr.image ? `<img src="${attr.image}" alt="${name}" class="w-full h-28 object-cover" onerror="this.style.display='none'"/>` : ""}
          <div class="p-3">
            <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mb-1.5" style="background:${primary}">
              ${categoryLabel}
            </span>
            <h4 class="font-bold text-slate-900 text-sm mb-1">${name}</h4>
            <p class="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-2">${desc}</p>
            ${attr.yearBuilt ? `<p class="text-[10px] text-slate-400 font-medium">قدمت: ${attr.yearBuilt}</p>` : ""}
          </div>
        </div>
      `;

      const marker = L.marker([lat, lon], { icon }).addTo(this.map);
      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: "custom-leaflet-popup",
      });
      marker.attractionId = attr.id;
      this.attractionMarkers.push(marker);
    });
  }

  filterCategory(category) {
    this.activeCategory = category;
    this.renderAttractionMarkers();
  }

  panToAttraction(attraction) {
    if (!this.map || !attraction) return;
    const [lat, lon] = attraction.coordinates;
    this.map.flyTo([lat, lon], 15, { duration: 1.2 });

    const targetMarker = this.attractionMarkers.find(
      (m) => m.attractionId === attraction.id,
    );
    if (targetMarker) {
      setTimeout(() => targetMarker.openPopup(), 1250);
    }
  }

  clearAttractionMarkers() {
    this.attractionMarkers.forEach((m) => this.map.removeLayer(m));
    this.attractionMarkers = [];
  }

  invalidateSize() {
    if (this.map) this.map.invalidateSize();
  }
}
