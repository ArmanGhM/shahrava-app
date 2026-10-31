/**
 * SHAHRAVA — Global City Search & Autocomplete
 * Debounced search across curated cities + Nominatim live geocoding.
 */

import { searchCities, CITIES } from '../data/cities.js';
import { searchGlobalLocations } from '../api/geocoding.js';
import { debounce, $ } from '../utils/helpers.js';
import { storage } from '../services/storage.js';
import { getLang, t } from '../i18n/index.js';

export class CitySearch {
  constructor(inputElement, resultsContainer, onSelectCallback) {
    this.input = inputElement;
    this.container = resultsContainer;
    this.onSelect = onSelectCallback;
    this.currentQuery = '';
    this.selectedIndex = -1;
    this.results = [];
    this.init();
  }

  init() {
    if (!this.input || !this.container) return;

    const handleSearch = debounce(async (val) => {
      await this.performSearch(val);
    }, 280);

    this.input.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      this.currentQuery = val;
      if (!val) {
        this.renderRecents();
      } else {
        handleSearch(val);
      }
    });

    this.input.addEventListener('focus', () => {
      if (!this.input.value.trim()) {
        this.renderRecents();
      } else {
        this.container.classList.remove('hidden');
      }
    });

    // Keyboard navigation
    this.input.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        this.handleKeyboard(e);
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.input.contains(e.target) && !this.container.contains(e.target)) {
        this.container.classList.add('hidden');
      }
    });
  }

  async performSearch(query) {
    const lang = getLang();
    this.container.classList.remove('hidden');
    this.container.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <svg class="animate-spin w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>${t('search.searching', 'در حال جستجو...')}</span>
      </div>
    `;

    // 1. Check curated cities first (instant)
    const curatedMatches = searchCities(query).map(c => ({
      id: c.id,
      nameFa: c.nameFa,
      nameEn: c.nameEn,
      countryFa: c.countryFa,
      countryEn: c.countryEn,
      isCurated: true,
      cityData: c
    }));

    // 2. Query Nominatim for global cities
    let osmMatches = [];
    try {
      const osm = await searchGlobalLocations(query, lang);
      osmMatches = osm
        .filter(item => !curatedMatches.some(c => c.nameEn.toLowerCase() === item.name.toLowerCase() || c.nameFa === item.name))
        .map(item => ({
          id: item.id,
          nameFa: item.name,
          nameEn: item.name,
          countryFa: item.country,
          countryEn: item.country,
          isCurated: false,
          coordinates: [item.lat, item.lon],
          osmData: item
        }));
    } catch {
      // Ignore network errors in geocoding
    }

    this.results = [...curatedMatches, ...osmMatches].slice(0, 7);
    this.renderResults();
  }

  renderResults() {
    const lang = getLang();
    if (!this.results.length) {
      this.container.innerHTML = `
        <div class="p-5 text-center text-xs text-slate-400">
          ${t('search.noResults', 'موردی برای این جستجو یافت نشد.')}
        </div>
      `;
      return;
    }

    const itemsHtml = this.results.map((item, idx) => {
      const name = lang === 'fa' ? item.nameFa : item.nameEn;
      const country = lang === 'fa' ? item.countryFa : item.countryEn;
      const badge = item.isCurated 
        ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#070C11] shadow-md" style="background:var(--city-primary)">برگزیده</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10">جهانی</span>`;

      return `
        <div data-index="${idx}" class="search-result-item flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] ${this.selectedIndex === idx ? 'bg-white/[0.08] border-white/15' : ''}">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--city-primary)]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <div class="font-bold text-sm text-white">${name}</div>
              <div class="text-xs text-slate-400">${country}</div>
            </div>
          </div>
          <div>${badge}</div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="p-2 space-y-1">
        ${itemsHtml}
      </div>
    `;

    // Attach click handlers
    this.container.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectResult(idx);
      });
    });
  }

  renderRecents() {
    const recents = storage.getRecents();
    if (!recents.length) {
      this.container.classList.add('hidden');
      return;
    }

    const lang = getLang();
    const items = recents.map(name => `
      <button type="button" class="recent-pill px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-colors">
        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>${name}</span>
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="p-3">
        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>${t('search.recentSearches', 'جستجوهای اخیر')}</span>
          <button id="clear-recents-btn" type="button" class="text-rose-400 hover:underline text-[11px]">${t('search.clearRecents', 'پاکسازی')}</button>
        </div>
        <div class="flex flex-wrap gap-2">
          ${items}
        </div>
      </div>
    `;

    this.container.classList.remove('hidden');

    this.container.querySelectorAll('.recent-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.innerText.trim();
        this.input.value = text;
        this.performSearch(text);
      });
    });

    const clearBtn = this.container.querySelector('#clear-recents-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        storage.clearRecents();
        this.container.classList.add('hidden');
      });
    }
  }

  handleKeyboard(e) {
    if (!this.results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.results.length;
      this.renderResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.results.length) % this.results.length;
      this.renderResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < this.results.length) {
        this.selectResult(this.selectedIndex);
      } else if (this.results.length > 0) {
        this.selectResult(0);
      }
    } else if (e.key === 'Escape') {
      this.container.classList.add('hidden');
    }
  }

  selectResult(index) {
    const item = this.results[index];
    if (!item) return;

    this.container.classList.add('hidden');
    this.input.value = '';
    storage.addRecent(item.nameFa || item.nameEn);

    if (this.onSelect) {
      this.onSelect(item);
    }
  }
}
