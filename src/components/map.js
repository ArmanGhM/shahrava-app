/**
 * SHAHRAVA — Interactive Leaflet Map Experience
 * Styled map layers, custom glowing city beacon, category-filtered
 * landmark markers, and network-independent SVG popup placeholders.
 */

import L from 'leaflet';
import { getLang } from '../i18n/index.js';
import { createCityPlaceholder } from '../utils/placeholders.js';
import { pick } from '../api/countries.js';

export class CityMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.cityMarker = null;
    this.attractionMarkers = [];
    this.currentCity = null;
    this.currentTheme = null;
    this.activeCategory = 'all';
    this.init();
  }

  init() {
    const el = document.getElementById(this.containerId);
    if (!el) return;

    // Initialize Leaflet map
    this.map = L.map(this.containerId, {
      zoomControl: false,
      attributionControl: true,
    }).setView([35.6892, 51.389], 12);

    // Add zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Standard free OpenStreetMap tile provider
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map);
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

    // Clear previous markers
    if (this.cityMarker) {
      this.map.removeLayer(this.cityMarker);
    }
    this.clearAttractionMarkers();

    // City Center Glowing Beacon Marker
    const primaryColor = theme ? theme.primary : '#16C6B1';
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
      className: 'custom-city-beacon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    this.cityMarker = L.marker([lat, lon], { icon: beaconIcon }).addTo(this.map);

    const lang = getLang();
    const cityName = lang === 'fa' ? city.nameFa : city.nameEn;
    const countryName = lang === 'fa' ? city.countryFa : city.countryEn;

    this.cityMarker.bindPopup(`
      <div class="p-3 text-center">
        <h4 class="font-bold text-sm text-[var(--city-text)]">${cityName}</h4>
        <p class="text-xs text-[var(--city-text-secondary)] mt-0.5">${countryName}</p>
      </div>
    `);

    // Render attraction markers
    this.renderAttractionMarkers();
  }

  renderAttractionMarkers() {
    this.clearAttractionMarkers();
    if (!this.currentCity || !this.currentCity.attractions) return;

    const lang = getLang();
    const primary = this.currentTheme ? this.currentTheme.primary : '#16C6B1';
    const secondary = this.currentTheme ? this.currentTheme.secondary : '#D6B66D';

    const filtered = this.currentCity.attractions.filter((attr) => {
      if (this.activeCategory === 'all') return true;
      return attr.category === this.activeCategory;
    });

    filtered.forEach((attr) => {
      const [lat, lon] = attr.coordinates;
      const name = lang === 'fa' ? attr.nameFa : attr.nameEn;
      const desc = lang === 'fa' ? attr.descFa : attr.descEn;
      const categoryLabel =
        lang === 'fa'
          ? attr.categoryFa || 'جاذبه'
          : attr.categoryEn || attr.category || 'Landmark';
      const yearBuiltStr = pick(attr.yearBuilt, lang);

      // RULE 5: Leaflet popups use SVG placeholder ONLY (never network image)
      const popupImgSvg = createCityPlaceholder(name, primary, secondary, {
        width: 480,
        height: 240,
      });

      const markerHtml = `
        <div class="group relative flex items-center justify-center w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-125" title="${name}">
          <div class="w-8 h-8 rounded-2xl shadow-xl border-2 border-white flex items-center justify-center" style="background:${secondary}">
            <svg class="w-4 h-4 text-[#070C11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'custom-attraction-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const popupHtml = `
        <div class="w-64 overflow-hidden rounded-xl bg-[var(--city-surface-elevated)] shadow-2xl p-0 text-start" dir="${lang === 'fa' ? 'rtl' : 'ltr'}">
          <img src="${popupImgSvg}" alt="${name}" class="w-full h-24 object-cover"/>
          <div class="p-3 space-y-1.5">
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11]" style="background:${primary}">
              ${categoryLabel}
            </span>
            <h4 class="font-bold text-sm text-[var(--city-text)]">${name}</h4>
            <p class="text-xs text-[var(--city-text-secondary)] leading-relaxed line-clamp-3">${desc}</p>
            ${yearBuiltStr ? `<p class="text-[10px] text-[var(--city-muted)] font-medium pt-1 border-t border-[var(--city-border)]">${lang === 'fa' ? 'قدمت: ' : 'Built: '}${yearBuiltStr}</p>` : ''}
          </div>
        </div>
      `;

      const marker = L.marker([lat, lon], { icon }).addTo(this.map);
      marker.bindPopup(popupHtml, { maxWidth: 280, className: 'custom-leaflet-popup' });
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
    this.map.flyTo([lat, lon], 15, {
      duration: 1.2,
    });

    const targetMarker = this.attractionMarkers.find(
      (m) => m.attractionId === attraction.id
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
    if (this.map) {
      this.map.invalidateSize();
    }
  }
}
