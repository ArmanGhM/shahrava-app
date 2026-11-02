/**
 * SHAHRAVA — Helper Utilities & Web Audio Atmosphere
 */

export function debounce(fn, wait = 300) {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

class CitySoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.filterNode = null;
    this.currentTheme = null;
    this._initPromise = null;
  }

  async init() {
    if (this.ctx) return;
    if (this._initPromise) return this._initPromise;

    this._initPromise = (async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          console.warn("[sound] Web Audio API not supported");
          return;
        }
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = "lowpass";
        this.filterNode.frequency.setValueAtTime(1200, this.ctx.currentTime);

        this.gainNode.connect(this.filterNode);
        this.filterNode.connect(this.ctx.destination);
      } catch (err) {
        console.error("[sound] Failed to init AudioContext:", err);
      }
    })();

    return this._initPromise;
  }

  _getPreset(themeId) {
    const presets = {
      tehran: [146.83, 196.0, 220.0, 293.66],
      tokyo: [261.63, 329.63, 392.0, 523.25],
      paris: [174.61, 220.0, 261.63, 349.23],
      dubai: [110.0, 164.81, 220.0, 293.66],
      newyork: [130.81, 196.0, 246.94, 392.0],
      istanbul: [164.81, 196.0, 246.94, 329.63],
      rome: [130.81, 164.81, 196.0, 261.63],
      barcelona: [196.0, 246.94, 293.66, 392.0],
      london: [110.0, 146.83, 174.61, 220.0],
      isfahan: [146.83, 196.0, 220.0, 293.66],
      kyoto: [220.0, 277.18, 329.63, 440.0],
      cairo: [110.0, 155.56, 220.0, 261.63],
      sydney: [196.0, 261.63, 329.63, 392.0],
    };
    return presets[themeId] || presets.tehran;
  }

  async toggle(themeId) {
    await this.init();

    if (!this.ctx) {
      console.warn("[sound] AudioContext not available");
      return false;
    }

    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.error("[sound] Failed to resume:", err);
        return false;
      }
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(themeId);
      return true;
    }
  }

  start(themeId) {
    if (!this.ctx || this.isPlaying) return;

    this.currentTheme = themeId;
    this.stopOscillators();

    const freqs = this._getPreset(themeId);

    this.oscillators = freqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      oscGain.gain.setValueAtTime(0.03 / freqs.length, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      return osc;
    });

    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 2);

    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;

    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(
      this.gainNode.gain.value,
      this.ctx.currentTime,
    );
    this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);

    this.isPlaying = false;
    setTimeout(() => this.stopOscillators(), 1100);
  }

  setThemeSound(themeId) {
    if (!this.isPlaying || !this.ctx) return;

    this.currentTheme = themeId;
    const freqs = this._getPreset(themeId);

    this.oscillators.forEach((osc, i) => {
      const targetFreq = freqs[i % freqs.length];
      if (osc && osc.frequency) {
        osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.5);
      }
    });
  }

  stopOscillators() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.oscillators = [];
  }
}

export const citySoundEngine = new CitySoundEngine();
