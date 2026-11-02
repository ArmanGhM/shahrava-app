/**
 * SHAHRAVA — Local Storage Service
 * Manages favorites, recent searches, and user preferences safely.
 */

const FAVORITES_KEY = 'shahrava_favorite_cities';
const RECENTS_KEY = 'shahrava_recent_searches';

export const storage = {
  getFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : ['tehran', 'isfahan'];
    } catch {
      return ['tehran', 'isfahan'];
    }
  },

  isFavorite(cityId) {
    const list = this.getFavorites();
    return list.includes(cityId);
  },

  toggleFavorite(cityId) {
    let list = this.getFavorites();
    if (list.includes(cityId)) {
      list = list.filter(id => id !== cityId);
    } else {
      list.push(cityId);
    }
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('favoriteschange', { detail: { favorites: list } }));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return list.includes(cityId);
  },

  getRecents() {
    try {
      const data = localStorage.getItem(RECENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addRecent(cityName) {
    if (!cityName) return;
    let list = this.getRecents();
    list = [cityName, ...list.filter(n => n.toLowerCase() !== cityName.toLowerCase())].slice(0, 6);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  clearRecents() {
    try {
      localStorage.removeItem(RECENTS_KEY);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }
};
