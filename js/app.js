/**
 * NGHS - Application Logic & Tactical UI Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteModals();
  initContactForms();
  initArticleModals();
  initFooterActions();
  initMobileMenu();
});

// Tactical Quote Modal
function initQuoteModals() {
  const quoteButtons = document.querySelectorAll('.btn-quote-trigger, .tag-tell-us');
  const quoteModal = document.getElementById('quoteModal');
  const closeModalBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  if (!quoteModal) return;

  quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(quoteModal);
      const articleModal = document.getElementById('articleModal');
      if (articleModal) closeModal(articleModal);
    });
  });

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.tactical-modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Quote form submission
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'PROCESSING DISPATCH...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = 'DISPATCH VERIFIED';
        showToast('QUOTATION REQUEST REGISTERED // DISPATCH ID #NGHS-9921');
        setTimeout(() => {
          closeModal(quoteModal);
          quoteForm.reset();
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }, 1200);
      }, 1000);
    });
  }
}

// Contact Form on contact.html
function initContactForms() {
  const contactForm = document.getElementById('mainContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.btn-chamfer-submit');
    const originalText = submitBtn.innerText;
    
    if (window.cipherEngine) {
      window.cipherEngine.scramble(submitBtn, { speed: 20, iterations: 14 });
    }
    submitBtn.innerText = 'TRANSMITTING...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = 'TRANSMISSION CONFIRMED';
      showToast('LOGISTICS INQUIRY TRANSMITTED TO NORDEN GLOBAL HANDELHUS HQ');
      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1200);
  });
}

// Article briefing modal on on-field.html
function initArticleModals() {
  const readMoreLinks = document.querySelectorAll('.read-more-btn');
  const articleModal = document.getElementById('articleModal');
  const modalTitle = document.getElementById('articleModalTitle');
  const modalDate = document.getElementById('articleModalDate');
  const modalBody = document.getElementById('articleModalBody');

  if (!articleModal || !readMoreLinks.length) return;

  const articleData = {
    'OPTIMIZING SUPPLY CHAINS': {
      date: 'JAN 15, 2024',
      badge: 'TACTICAL INTELLIGENCE // FIELD REPORT 01',
      content: `
        <p><strong>OVERVIEW:</strong> Navigating the intricate cross-border dynamics between Nordic hubs and European freight networks requires automated supplier validation, end-to-end container tracking, and synchronized border customs pre-clearance.</p>
        <p><strong>KEY METRICS:</strong></p>
        <ul>
          <li>Average border clearance reduction: 4.8 hrs → 38 minutes</li>
          <li>Cold chain temp variance: < 0.2°C across 1,800km transit</li>
          <li>Verified supplier compliance rating: 99.84%</li>
        </ul>
        <p><strong>OPERATIONAL IMPACT:</strong> Norwegian small-to-medium businesses bypass intermediary markup while retaining complete chain-of-custody documentation under Nordic maritime standard NSAB 2015.</p>
      `
    },
    'SOLUTIONS FOR A FUTURE': {
      date: 'JAN 15, 2024',
      badge: 'SUSTAINABILITY AUDIT // FIELD REPORT 02',
      content: `
        <p><strong>OVERVIEW:</strong> Decarbonizing maritime and intermodal freight requires systematic adoption of low-emission vessel corridors, modular biodegradable packaging, and route optimization algorithms that minimize deadweight ballast voyages.</p>
        <p><strong>KEY METRICS:</strong></p>
        <ul>
          <li>CO2e offset reduction per metric ton/nautical mile: -27.4%</li>
          <li>Recyclable packaging integration: 100% G.I. tagged produce</li>
          <li>Optimized route utilization: 94.2% fleet capacity</li>
        </ul>
        <p><strong>ETHICAL COMPLIANCE:</strong> Real-time fuel telemetry integrated directly into client reporting dashboards for CSRD compliance and ESG investor transparency.</p>
      `
    },
    'STRATEGIES FOR SUCCESS': {
      date: 'JAN 15, 2024',
      badge: 'LOGISTIC ACCELERATION // FIELD REPORT 03',
      content: `
        <p><strong>OVERVIEW:</strong> Harbour crane scheduling, berth reservations, and customs escrow accounts prevent costly demurrage penalties at key North Sea and Baltic transshipment terminals.</p>
        <p><strong>KEY METRICS:</strong></p>
        <ul>
          <li>Demurrage risk mitigation: 0 incidents across 1,420 TEU</li>
          <li>Direct warehouse dispatch time: 2.4 hours post-docking</li>
          <li>Cross-border tariffs processed in real time: NOK 48M+</li>
        </ul>
        <p><strong>SUMMARY:</strong> Seamless integration between maritime carriers and Norwegian road freight carriers ensures zero terminal bottlenecks.</p>
      `
    }
  };

  readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.news-card') || link.closest('.blog-card');
      const title = card ? card.querySelector('.card-heading, .news-title').innerText.trim() : 'OPTIMIZING SUPPLY CHAINS';
      const data = articleData[title] || articleData['OPTIMIZING SUPPLY CHAINS'];

      if (modalTitle) modalTitle.innerText = title;
      if (modalDate) modalDate.innerText = data.date + ' // ' + data.badge;
      if (modalBody) modalBody.innerHTML = data.content;

      openModal(articleModal);
    });
  });
}

// Footer links actions
function initFooterActions() {
  const telegramLink = document.querySelector('.footer-telegram');
  const whatsappLink = document.querySelector('.footer-whatsapp');
  const emailLink = document.querySelector('.footer-email');

  if (telegramLink) {
    telegramLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('TELEGRAM DISPATCH: CONNECTING TO @SALSABIL_INTL_BOT');
      setTimeout(() => {
        window.open('https://t.me/SalsabilInternational', '_blank');
      }, 700);
    });
  }

  if (whatsappLink) {
    whatsappLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('WHATSAPP LOGISTICS DESK: OPENING DIRECT FREIGHT AGENT');
      setTimeout(() => {
        window.open('https://wa.me/4722000000?text=Inquiry%20from%20Salsabil%20International%20Platform', '_blank');
      }, 700);
    });
  }

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:procurement@salsabil-international.com?subject=Logistics%20Inquiry%20-%20Salsabil%20International';
    });
  }
}

// Mobile Menu Handler
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu-wrapper');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close when clicking nav link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn-contact');
    navLinks.forEach(l => {
      l.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }
}

// Modal helper functions
function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const firstInput = modal.querySelector('input, textarea, button');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Toast notification
function showToast(message) {
  let toast = document.querySelector('.tactical-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'tactical-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-dot"></span><span class="toast-text">${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
