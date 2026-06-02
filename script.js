// Always start at top of page — prevents mobile browsers from restoring scroll position
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// After any in-page anchor scroll, remove the hash from the URL so bookmarks/shares stay clean
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function() {
    setTimeout(() => history.replaceState(null, '', window.location.pathname), 700);
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
  nav.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  nav.classList.contains('open') ? closeNav() : openNav();
});

if (navOverlay) navOverlay.addEventListener('click', closeNav);

// Close menu when a non-dropdown link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (!link.closest('.dropdown > a') && !link.parentElement.classList.contains('dropdown')) {
      closeNav();
    }
  });
});

// Dropdown toggle — close others first, then toggle
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = link.parentElement;
    const isOpen = parent.classList.contains('open');
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    if (!isOpen) parent.classList.add('open');
  });
});

// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
  }
});

// ===== REVIEWS CAROUSEL =====
const track = document.getElementById('reviewsTrack');
const cards = track ? track.children : [];
const totalCards = cards.length;
let currentIndex = 0;
let autoSlideInterval;

const dotsContainer = document.getElementById('carouselDots');

function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = (index + totalCards) % totalCards;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn && prevBtn && track) {
  buildDots();
  startAutoSlide();

  nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
  prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAutoSlide(); });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    startAutoSlide();
  });
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) item.classList.add('active');
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const json = await res.json();
      if (json.success) {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#388e3c';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Failed. Try Again.';
        btn.style.background = '#c62828';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Failed. Try Again.';
      btn.style.background = '#c62828';
      btn.disabled = false;
    }
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.service-card, .gallery-item, .review-card, .faq-item, .info-block');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
