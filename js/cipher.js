/**
 * NGHS - Tactical Cipher / Scramble Text Engine
 * Inspired by Arkham Intelligence text decoding & decryption aesthetic
 */

class CipherEngine {
  constructor() {
    this.charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_#&@!$%*+=-/<>[]';
    this.activeAnimations = new WeakMap();
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindElements();
    });
  }

  bindElements() {
    const cipherEls = document.querySelectorAll('[data-cipher], .cipher-hover, .nav-link, .btn-chamfer, .footer-link, .card-title, .cipher-trigger');
    cipherEls.forEach(el => {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.innerText.trim();
      }

      el.addEventListener('mouseenter', () => {
        this.scramble(el, { speed: 28, iterations: 12 });
      });

      // Also support touch / focus
      el.addEventListener('focus', () => {
        this.scramble(el, { speed: 28, iterations: 12 });
      });
    });
  }

  getRandomChar() {
    return this.charset[Math.floor(Math.random() * this.charset.length)];
  }

  scramble(element, options = {}) {
    const originalText = element.dataset.originalText || element.innerText.trim();
    if (!originalText) return;

    element.dataset.originalText = originalText;
    const speed = options.speed || 30;
    const totalIterations = options.iterations || 10;

    // Cancel existing animation on this element
    if (this.activeAnimations.has(element)) {
      clearInterval(this.activeAnimations.get(element));
      this.activeAnimations.delete(element);
    }

    let iteration = 0;
    const len = originalText.length;

    const interval = setInterval(() => {
      let output = '';
      const resolvedCount = Math.floor((iteration / totalIterations) * len);

      for (let i = 0; i < len; i++) {
        const char = originalText[i];
        if (char === ' ' || char === '\n' || char === '\t') {
          output += char;
        } else if (i < resolvedCount) {
          output += char;
        } else {
          output += this.getRandomChar();
        }
      }

      element.innerText = output;

      iteration++;
      if (iteration > totalIterations) {
        element.innerText = originalText;
        clearInterval(interval);
        this.activeAnimations.delete(element);
        if (options.onComplete) options.onComplete();
      }
    }, speed);

    this.activeAnimations.set(element, interval);
  }

  decodeReveal(element, delay = 0) {
    setTimeout(() => {
      this.scramble(element, { speed: 35, iterations: 16 });
    }, delay);
  }
}

// Global instance
window.cipherEngine = new CipherEngine();
