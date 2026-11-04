/**
 * NGHS - Fullscreen Presentation Slider Deck (v2, 2026-11-05)
 *
 * One master timeline per transition — the synchronicity system:
 *   t=0    outgoing slide fades/scales out (600ms)
 *   t=150  scene engine crossfades to the incoming slide's scene (700ms)
 *   t=600  incoming slide fades in (750ms); HUD counter swaps + scrambles;
 *          headline decode starts, resolving as the fade completes
 *   t=750+ marker/desc/actions stagger in on CSS --d delays (see main.css)
 *   t=1400 input unlocks
 */

class SlideDeckController {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '.slider-container');
    if (!this.container) return;

    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.transitionDuration = 1400; // ms: the full lock window
    this.lastTransitionTime = 0;
    this.accumulatedDelta = 0;
    this.wheelThreshold = 45;

    // Staged timeline offsets (ms)
    this.T_SCENE = 150;
    this.T_FADE_IN = 600;

    // UI elements
    this.downArrowBtn = document.querySelector('.scroll-down-btn');
    this.hudCurrent = document.querySelector('.hud-current');
    this.hudTotal = document.querySelector('.hud-total');
    this.hudDots = document.querySelectorAll('.hud-dot');

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === 0);
      slide.classList.remove('leaving');
    });

    this.updateHUD();

    // Opening beat: decode the hero headline once the page settles.
    const firstTitle = this.slides[0].querySelector('.slide-title');
    if (firstTitle && window.cipherEngine) {
      window.cipherEngine.decodeReveal(firstTitle, 450);
    }

    this.bindWheelEvents();
    this.bindKeyboardEvents();
    this.bindTouchEvents();
    this.bindControls();
    this.bindNavLinks();
  }

  bindWheelEvents() {
    window.addEventListener('wheel', (e) => {
      if (e.target.closest('.modal-content') || e.target.closest('.scrollable-view')) {
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (this.isTransitioning || now - this.lastTransitionTime < this.transitionDuration) {
        return;
      }

      this.accumulatedDelta += e.deltaY;

      if (Math.abs(this.accumulatedDelta) >= this.wheelThreshold) {
        if (this.accumulatedDelta > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        this.accumulatedDelta = 0;
      }
    }, { passive: false });
  }

  bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        this.nextSlide();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        this.prevSlide();
      }
    });
  }

  bindTouchEvents() {
    let startY = 0;
    let endY = 0;

    window.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }, { passive: true });
  }

  bindControls() {
    if (this.downArrowBtn) {
      this.downArrowBtn.addEventListener('click', () => {
        this.nextSlide();
      });
    }

    if (this.hudDots && this.hudDots.length > 0) {
      this.hudDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          this.goToSlide(idx);
        });
      });
    }
  }

  bindNavLinks() {
    const navMapping = {
      'SOURCE': 0,
      'SECTORS': 3,
      'HOW IT WORKS': 1,
      'PROOFS': 2
    };

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const text = link.innerText.trim().toUpperCase();
      if (navMapping[text] !== undefined) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.goToSlide(navMapping[text]);
        });
      }
    });
  }

  nextSlide() {
    let target = this.currentIndex + 1;
    if (target >= this.totalSlides) {
      target = 0; // Seamless loop
    }
    this.goToSlide(target, 'next');
  }

  prevSlide() {
    let target = this.currentIndex - 1;
    if (target < 0) {
      target = this.totalSlides - 1;
    }
    this.goToSlide(target, 'prev');
  }

  goToSlide(targetIndex, direction = 'next') {
    if (targetIndex === this.currentIndex || this.isTransitioning) return;
    if (targetIndex < 0 || targetIndex >= this.totalSlides) return;

    this.isTransitioning = true;
    this.lastTransitionTime = Date.now();

    const currentSlide = this.slides[this.currentIndex];
    const targetSlide = this.slides[targetIndex];

    // t=0: outgoing slide leaves.
    currentSlide.classList.remove('active');
    currentSlide.classList.add('leaving');

    // t=150: the scene crossfades underneath the outgoing fade.
    setTimeout(() => {
      const scene = targetSlide.dataset.scene;
      if (scene && window.sceneEngine) {
        window.sceneEngine.goTo(scene);
      }
    }, this.T_SCENE);

    // t=600: incoming slide activates — fade-in, HUD, decode all fire together.
    setTimeout(() => {
      currentSlide.classList.remove('leaving');

      this.currentIndex = targetIndex;
      this.updateHUD(true);

      targetSlide.classList.remove('leaving');
      targetSlide.classList.add('active');

      const titleEl = targetSlide.querySelector('.slide-title');
      if (titleEl && window.cipherEngine) {
        // speed 28 x 20 iterations ~= 640ms: resolves as the 750ms fade completes.
        window.cipherEngine.scramble(titleEl, { speed: 28, iterations: 20 });
      }

      setTimeout(() => {
        this.isTransitioning = false;
      }, this.transitionDuration - this.T_FADE_IN);
    }, this.T_FADE_IN);
  }

  updateHUD(scramble = false) {
    if (this.hudCurrent) {
      this.hudCurrent.innerText = `0${this.currentIndex + 1}`;
      if (scramble && window.cipherEngine) {
        window.cipherEngine.scramble(this.hudCurrent, { speed: 24, iterations: 8 });
      }
    }
    if (this.hudTotal) {
      this.hudTotal.innerText = `0${this.totalSlides}`;
    }
    if (this.hudDots && this.hudDots.length > 0) {
      this.hudDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.slideController = new SlideDeckController();
});
