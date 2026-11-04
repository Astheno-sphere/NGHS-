/**
 * NGHS - Fullscreen Presentation Slider Deck
 * Original Smooth Opacity & Scale Deck Animation
 */

class SlideDeckController {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '.slider-container');
    if (!this.container) return;

    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.transitionDuration = 1400; // ms: total transition window (fadeOut + fadeIn)
    this.lastTransitionTime = 0;
    this.accumulatedDelta = 0;
    this.wheelThreshold = 45;

    // UI elements
    this.downArrowBtn = document.querySelector('.scroll-down-btn');
    this.hudCurrent = document.querySelector('.hud-current');
    this.hudTotal = document.querySelector('.hud-total');
    this.hudDots = document.querySelectorAll('.hud-dot');
    this.footerLegalSlide1 = document.querySelector('.footer-text-slide1');
    this.footerLegalNormal = document.querySelector('.footer-text-normal');

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    // Activate initial slide
    this.slides.forEach((slide, idx) => {
      if (idx === 0) {
        slide.classList.add('active');
        const initialVideo = slide.querySelector('.slide-video');
        if (initialVideo) {
          initialVideo.play().catch(() => {});
        }
      } else {
        slide.classList.remove('active', 'leaving');
      }
    });

    this.updateHUD();

    // Event listeners
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

    const fadeOutDuration = 600; // ms: current slide smoothly drops from 100% to 0%
    const fadeInDuration = 750;  // ms: next slide smoothly rises from 0% to 100%

    // Stage 1: Fade out current slide from 100% to 0% opacity
    currentSlide.classList.remove('active');
    currentSlide.classList.add('leaving');

    setTimeout(() => {
      // Stage 2: Target slide fades in from 0% to 100% opacity
      currentSlide.classList.remove('leaving');

      this.currentIndex = targetIndex;
      this.updateHUD();

      // Toggle slide-specific footer copyright if specified
      if (this.footerLegalSlide1 && this.footerLegalNormal) {
        if (this.currentIndex === 0) {
          this.footerLegalSlide1.style.display = 'inline';
          this.footerLegalNormal.style.display = 'none';
        } else {
          this.footerLegalSlide1.style.display = 'none';
          this.footerLegalNormal.style.display = 'inline';
        }
      }

      // Activate target slide for smooth 0% -> 100% entry
      targetSlide.classList.remove('leaving');
      targetSlide.classList.add('active');

      const targetVideo = targetSlide.querySelector('.slide-video');
      if (targetVideo) {
        targetVideo.play().catch(() => {});
      }

      // Trigger decrypt cipher animation on main title of new slide
      const titleEl = targetSlide.querySelector('.slide-title');
      if (titleEl && window.cipherEngine) {
        window.cipherEngine.decodeReveal(titleEl, 120);
      }

      setTimeout(() => {
        this.isTransitioning = false;
      }, fadeInDuration);

    }, fadeOutDuration);
  }

  updateHUD() {
    if (this.hudCurrent) {
      this.hudCurrent.innerText = `0${this.currentIndex + 1}`;
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
