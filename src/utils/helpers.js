/**
 * SHAHRAVA — Helper Utilities & Web Audio Atmosphere
 */

/**
 * Standard debounce implementation
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

/**
 * Safe query selector helper
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Interactive Web Audio Ambient Sound Generator
 * Synthesizes subtle atmospheric soundscapes tailored to city themes
 * completely in the browser without any external audio asset dependencies!
 */
class CitySoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.filterNode = null;
    this.currentTheme = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.gainNode.connect(this.filterNode);
    this.filterNode.connect(this.ctx.destination);
  }

  setThemeSound(themeId) {
    this.currentTheme = themeId;
    if (!this.isPlaying || !this.ctx) return;

    // Frequencies tailored to city atmospheres
    const tonePresets = {
      tehran: [146.83, 220.00, 293.66], // D minor / Desert night & Alborz serenity
      tokyo: [261.63, 329.63, 392.00, 523.25], // C major cyber shimmer
      paris: [174.61, 220.00, 261.63], // F major accordion warmth
      dubai: [110.00, 164.81, 220.00], // A deep desert resonant drone
      newyork: [130.81, 196.00, 246.94], // Metro urban depth
      istanbul: [164.81, 246.94, 329.63], // E minor Bosphorus breeze
      rome: [130.81, 164.81, 196.00], // C ancient classical harmony
      barcelona: [196.00, 246.94, 293.66], // G Mediterranean vibrant rhythm
      london: [110.00, 146.83, 220.00], // Atmospheric mist chord
      isfahan: [146.83, 196.00, 293.66], // Turquoise dome acoustic resonance
      kyoto: [220.00, 277.18, 329.63], // Zen bamboo garden stillness
      cairo: [110.00, 155.56, 220.00], // Nile ancient modal frequencies
      sydney: [196.00, 261.63, 329.63] // Pacific ocean azure breeze
    };

    const freqs = tonePresets[themeId] || [164.81, 220.00, 329.63];

    // Smoothly retune active oscillators
    this.oscillators.forEach((osc, i) => {
      const targetFreq = freqs[i % freqs.length];
      if (osc && osc.frequency) {
        osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.8);
      }
    });
  }

  toggle(themeId) {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
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
    if (!this.ctx) this.init();
    this.currentTheme = themeId;
    this.stopOscillators();

    const tonePresets = {
      tehran: [146.83, 220.00, 293.66],
      tokyo: [261.63, 329.63, 392.00, 523.25],
      paris: [174.61, 220.00, 261.63],
      dubai: [110.00, 164.81, 220.00],
      newyork: [130.81, 196.00, 246.94],
      istanbul: [164.81, 246.94, 329.63],
      rome: [130.81, 164.81, 196.00],
      barcelona: [196.00, 246.94, 293.66],
      london: [110.00, 146.83, 220.00],
      isfahan: [146.83, 196.00, 293.66],
      kyoto: [220.00, 277.18, 329.63],
      cairo: [110.00, 155.56, 220.00],
      sydney: [196.00, 261.63, 329.63]
    };

    const freqs = tonePresets[themeId] || [164.81, 220.00, 329.63];

    this.oscillators = freqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : (idx === 1 ? 'triangle' : 'sine');
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04 / freqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      return osc;
    });

    // Fade in master gain gently
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
    setTimeout(() => {
      this.stopOscillators();
      this.isPlaying = false;
    }, 850);
  }

  stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.oscillators = [];
  }
}

export const citySoundEngine = new CitySoundEngine();
