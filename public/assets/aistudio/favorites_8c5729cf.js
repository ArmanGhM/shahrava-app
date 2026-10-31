/**
 * SHAHRAVA — Favorites Drawer / Manager
 */

import { storage } from '../services/storage.js';
import { getCityById } from '../data/cities.js';
import { getCityTheme } from '../data/themes.js';
import { getLang, t } from '../i18n/index.js';

export class FavoritesDrawer {
  constructor(drawerElement, onSelectCity) {
    this.drawer = drawerElement;
    this.onSelect = onSelectCity;
    this.listContainer = document.getElementById('favorites-list-container');
    this.closeBtn = document.getElementById('close-favorites-btn');

    this.init();
  }

  init() {
    if (!this.drawer) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide());
    }

    this.drawer.addEventListener('click', (e) => {
      if (e.target === this.drawer) this.hide();
    });

    window.addEventListener('favoriteschange', () => {
      if (!this.drawer.classList.contains('hidden')) {
        this.render();
      }
    });
  }

  show() {
    this.drawer.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    this.render();
  }

  hide() {
    this.drawer.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  render() {
    if (!this.listContainer) return;
    const lang = getLang();
    const favIds = storage.getFavorites();

    if (!favIds.length) {
      this.listContainer.innerHTML = `
        <div class="py-12 text-center">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h4 class="font-bold text-white text-base mb-1">${t('favoritesModal.emptyTitle', 'هنوز شهری را نشان نکرده‌اید')}</h4>
          <p class="text-xs text-slate-400 max-w-xs mx-auto">${t('favoritesModal.emptyDesc', 'با کلیک روی نماد قلب هر شهر، آن را به لیست علاقه‌مندی‌ها بیافزایید.')}</p>
        </div>
      `;
      return;
    }

    const itemsHtml = favIds.map(cityId => {
      const city = getCityById(cityId);
      const theme = getCityTheme(city.themeId || city.id);
      const name = lang === 'fa' ? city.nameFa : city.nameEn;
      const country = lang === 'fa' ? city.countryFa : city.countryEn;

      return `
        <div class="fav-card obsidian-card relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group">
          <div class="flex items-center gap-3.5 cursor-pointer select-city-btn" data-city-id="${city.id}">
            <img src="${city.heroImage}" alt="${name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=400&q=80'" class="w-12 h-12 rounded-xl object-cover border border-white/15 shadow-md group-hover:scale-105 transition-transform duration-300"/>
            <div>
              <div class="font-bold text-white text-sm flex items-center gap-2 group-hover:text-[var(--city-primary)] transition-colors">
                ${name}
                <span class="w-2 h-2 rounded-full shadow-[0_0_8px_var(--city-primary)]" style="background:${theme.primary}"></span>
              </div>
              <div class="text-xs text-slate-400">${country}</div>
            </div>
          </div>
          <button data-remove-id="${city.id}" class="remove-fav-btn p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="حذف از نشان‌شده‌ها">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');

    this.listContainer.innerHTML = `
      <div class="space-y-2.5">
        ${itemsHtml}
      </div>
    `;

    // Click handler to select city
    this.listContainer.querySelectorAll('.select-city-btn').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-city-id');
        this.hide();
        if (this.onSelect) this.onSelect(id);
      });
    });

    // Remove button handler
    this.listContainer.querySelectorAll('.remove-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-remove-id');
        storage.toggleFavorite(id);
        this.render();
      });
    });
  }
}
