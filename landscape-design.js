// ===== GALLERY CAROUSEL =====
const track = document.getElementById('galleryTrack');
const slides = track ? track.children : [];
const total = slides.length;
let current = 0;
let autoTimer;

const dotsWrap = document.getElementById('galDots');

function buildDots() {
  if (!dotsWrap) return;
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.classList.add('gal-dot');
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
  }
}

function updateDots() {
  document.querySelectorAll('.gal-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goTo(index) {
  current = (index + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

function start() { autoTimer = setInterval(() => goTo(current + 1), 4500); }
function stop() { clearInterval(autoTimer); }

const prevBtn = document.getElementById('galPrev');
const nextBtn = document.getElementById('galNext');

if (track && prevBtn && nextBtn) {
  buildDots();
  start();
  prevBtn.addEventListener('click', () => { stop(); goTo(current - 1); start(); });
  nextBtn.addEventListener('click', () => { stop(); goTo(current + 1); start(); });

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); });
  track.addEventListener('touchend', e => {
    const diff = sx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    start();
  });
}

// ===== HAMBURGER (reuse from script.js) =====
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.svc-feature, .svc-review-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
