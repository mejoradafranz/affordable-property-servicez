// ===== NAV SERVICE PREVIEW POPUP =====
(function () {
  var services = {
    'landscape-design.html': {
      title: 'Landscape Design & Installation',
      photos: [
        'PHOTOS/063dea30-b1f8-41fb-a901-4f5ce91ff59b.webp',
        'PHOTOS/0c2ee8bb-f1a9-42b6-8740-f7ec22757643.webp',
        'PHOTOS/1983bdff-d47d-4754-99d1-d2e0470b004e.webp',
        'PHOTOS/1bc91e72-8341-47ad-b665-6cbf0dfd636b.webp'
      ]
    },
    'kitchen-bathroom.html': {
      title: 'Kitchen & Bathroom Remodeling',
      photos: [
        'PHOTOS/1c4769b7-2f8f-4578-ba8c-588a3ea19e4c.webp',
        'PHOTOS/24d8f22e-2460-439b-a41e-0266a5bbd3ee.webp',
        'PHOTOS/24eaf447-3b5f-4b71-a951-1fde00f43cca.webp',
        'PHOTOS/273f6bc1-c6a9-4be1-83b9-a792f49a9091.webp'
      ]
    },
    'interior-remodeling.html': {
      title: 'Interior Remodeling Services',
      photos: [
        'PHOTOS/2f764107-39ef-4357-8fa9-2529e0cba746.webp',
        'PHOTOS/33c270ae-5f2f-4eba-a91e-7b8585c89c11.webp',
        'PHOTOS/3b1b72bf-cfd4-452a-8219-65465c71811b.webp',
        'PHOTOS/3ef7dcdc-d277-41d6-89f2-872b3b55bb7d.webp'
      ]
    },
    'outdoor-living.html': {
      title: 'Outdoor Living & Hardscaping',
      photos: [
        'PHOTOS/43f58220-ec86-4cda-a9f7-1b6710546dec.webp',
        'PHOTOS/4d384c9f-e69d-45fb-88cb-79bcf05be0a5.webp',
        'PHOTOS/59774f8c-fa65-467c-a37c-430aa5f3c689.webp',
        'PHOTOS/604f7b52-9f44-44cb-a3ce-e39701b0aac7.webp'
      ]
    },
    'irrigation-drainage.html': {
      title: 'Irrigation & Drainage Systems',
      photos: [
        'PHOTOS/6101257c-64d7-497a-8d35-c0e198278a4e.webp',
        'PHOTOS/65a9d47f-b91a-4970-b607-e736a07cefe8.webp',
        'PHOTOS/6640620c-8132-478b-a2ef-2c8c6276c846.webp',
        'PHOTOS/77261ed6-e8c5-4a6a-9ebb-c19177d411d1.webp'
      ]
    }
  };

  // Inject popup HTML
  var popup = document.createElement('div');
  popup.id = 'navPreviewPopup';
  popup.className = 'nav-preview-popup';
  popup.innerHTML =
    '<div class="nav-preview-overlay"></div>' +
    '<div class="nav-preview-card">' +
      '<button class="nav-preview-close" aria-label="Close">&#x2715;</button>' +
      '<div class="nav-preview-slides" id="npSlides">' +
        '<button class="nav-preview-prev" id="npPrev">&#8249;</button>' +
        '<button class="nav-preview-next" id="npNext">&#8250;</button>' +
        '<div class="nav-preview-dots" id="npDots"></div>' +
      '</div>' +
      '<div class="nav-preview-info">' +
        '<h3 class="nav-preview-title" id="npTitle"></h3>' +
        '<a href="#" class="btn-primary nav-preview-btn" id="npBtn">View Service &#8594;</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(popup);

  var slidesEl = document.getElementById('npSlides');
  var dotsEl   = document.getElementById('npDots');
  var titleEl  = document.getElementById('npTitle');
  var btnEl    = document.getElementById('npBtn');
  var prevBtn  = document.getElementById('npPrev');
  var nextBtn  = document.getElementById('npNext');
  var closeBtn = popup.querySelector('.nav-preview-close');
  var overlay  = popup.querySelector('.nav-preview-overlay');

  var currentSlide = 0;
  var autoTimer = null;

  function buildSlides(photos) {
    // Remove old slides (keep buttons and dots container)
    var old = slidesEl.querySelectorAll('.nav-preview-slide');
    old.forEach(function(s) { s.remove(); });
    dotsEl.innerHTML = '';
    photos.forEach(function(src, i) {
      var slide = document.createElement('div');
      slide.className = 'nav-preview-slide' + (i === 0 ? ' active' : '');
      var img = document.createElement('img');
      img.src = src;
      img.alt = 'Service photo';
      img.loading = 'lazy';
      slide.appendChild(img);
      slidesEl.insertBefore(slide, prevBtn);

      var dot = document.createElement('button');
      dot.className = 'nav-preview-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Photo ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i); });
      dotsEl.appendChild(dot);
    });
  }

  function goTo(index) {
    var slides = slidesEl.querySelectorAll('.nav-preview-slide');
    var dots   = dotsEl.querySelectorAll('.nav-preview-dot');
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function() { goTo(currentSlide + 1); }, 2200);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function openPopup(svcKey) {
    var svc = services[svcKey];
    if (!svc) return;
    currentSlide = 0;
    buildSlides(svc.photos);
    titleEl.textContent = svc.title;
    btnEl.href = svcKey;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
    startAuto();
  }

  function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
    stopAuto();
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  prevBtn.addEventListener('click', function() { goTo(currentSlide - 1); startAuto(); });
  nextBtn.addEventListener('click', function() { goTo(currentSlide + 1); startAuto(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) closePopup();
  });

  // Touch swipe support inside popup
  var touchStartX = 0;
  slidesEl.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  slidesEl.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(currentSlide + (diff > 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  // Wire up dropdown service links on all pages
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-menu a').forEach(function(link) {
      var href = link.getAttribute('href') || '';
      var svcKey = href.replace(/^.*\//, '');
      if (!services[svcKey]) return;

      link.addEventListener('click', function(e) {
        e.preventDefault();
        openPopup(svcKey);
      });

      // Desktop: also open on hover for a quick preview
      link.addEventListener('mouseenter', function() {
        if (window.innerWidth > 900) openPopup(svcKey);
      });
    });
  });
})();

// ===== SERVICES COLLAGE OVERLAY =====
(function () {
  var svcList = [
    { title: 'Landscape Design\n& Installation',    url: 'landscape-design.html',    photo: 'PHOTOS/063dea30-b1f8-41fb-a901-4f5ce91ff59b.webp' },
    { title: 'Kitchen & Bathroom\nRemodeling',       url: 'kitchen-bathroom.html',    photo: 'PHOTOS/77261ed6-e8c5-4a6a-9ebb-c19177d411d1.webp' },
    { title: 'Interior Remodeling\nServices',        url: 'interior-remodeling.html', photo: 'PHOTOS/24eaf447-3b5f-4b71-a951-1fde00f43cca.webp' },
    { title: 'Outdoor Living\n& Hardscaping',        url: 'outdoor-living.html',      photo: 'PHOTOS/1bc91e72-8341-47ad-b665-6cbf0dfd636b.webp' },
    { title: 'Irrigation &\nDrainage Systems',       url: 'irrigation-drainage.html', photo: 'PHOTOS/6640620c-8132-478b-a2ef-2c8c6276c846.webp' }
  ];

  var collage = document.createElement('div');
  collage.id = 'servicesCollage';
  collage.className = 'svc-collage';

  var itemsHTML = svcList.map(function (s) {
    return '<a href="' + s.url + '" class="svc-collage-item">' +
      '<img src="' + s.photo + '" alt="' + s.title.replace('\n', ' ') + '" loading="lazy">' +
      '<div class="svc-collage-label">' + s.title.replace('\n', '<br>') + '</div>' +
    '</a>';
  }).join('');

  collage.innerHTML =
    '<div class="svc-collage-head">' +
      '<span>OUR SERVICES</span>' +
      '<button class="svc-collage-close" id="svcCollageClose">&#x2715;</button>' +
    '</div>' +
    '<div class="svc-collage-grid">' + itemsHTML + '</div>';

  document.body.appendChild(collage);

  function openCollage() {
    collage.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Close the nav panel so collage gets full focus
    var nav = document.querySelector('nav');
    var hbg = document.getElementById('hamburger');
    var ovl = document.getElementById('navOverlay');
    if (nav) nav.classList.remove('open');
    if (hbg) hbg.classList.remove('open');
    if (ovl) ovl.classList.remove('active');
  }

  function closeCollage() {
    collage.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('svcCollageClose').addEventListener('click', closeCollage);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown > a').forEach(function (link) {
      if (link.textContent.trim().toLowerCase().indexOf('service') !== -1) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          openCollage();
        });
      }
    });
  });
})();

// Inject "Our Best Work" scrolling section into nav (runs on all pages)
(function () {
  var row1 = [
    'PHOTOS/063dea30-b1f8-41fb-a901-4f5ce91ff59b.webp',
    'PHOTOS/0c2ee8bb-f1a9-42b6-8740-f7ec22757643.webp',
    'PHOTOS/1983bdff-d47d-4754-99d1-d2e0470b004e.webp',
    'PHOTOS/1bc91e72-8341-47ad-b665-6cbf0dfd636b.webp',
    'PHOTOS/1c4769b7-2f8f-4578-ba8c-588a3ea19e4c.webp',
    'PHOTOS/24d8f22e-2460-439b-a41e-0266a5bbd3ee.webp',
    'PHOTOS/24eaf447-3b5f-4b71-a951-1fde00f43cca.webp',
    'PHOTOS/273f6bc1-c6a9-4be1-83b9-a792f49a9091.webp'
  ];
  var row2 = [
    'PHOTOS/2f764107-39ef-4357-8fa9-2529e0cba746.webp',
    'PHOTOS/33c270ae-5f2f-4eba-a91e-7b8585c89c11.webp',
    'PHOTOS/3b1b72bf-cfd4-452a-8219-65465c71811b.webp',
    'PHOTOS/43f58220-ec86-4cda-a9f7-1b6710546dec.webp',
    'PHOTOS/4d384c9f-e69d-45fb-88cb-79bcf05be0a5.webp',
    'PHOTOS/59774f8c-fa65-467c-a37c-430aa5f3c689.webp',
    'PHOTOS/604f7b52-9f44-44cb-a3ce-e39701b0aac7.webp',
    'PHOTOS/6640620c-8132-478b-a2ef-2c8c6276c846.webp'
  ];

  function makeTrack(photos, reverse) {
    var doubled = photos.concat(photos);
    var imgs = doubled.map(function (p) {
      return '<img class="nav-work-photo" src="' + p + '" alt="Our work" loading="lazy">';
    }).join('');
    return '<div class="nav-work-track' + (reverse ? ' rev' : '') + '">' + imgs + '</div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var section = document.createElement('div');
    section.className = 'nav-work-section';
    section.innerHTML =
      '<p class="nav-work-title">Our Best Work</p>' +
      '<div class="nav-work-row">' + makeTrack(row1, false) + '</div>' +
      '<div class="nav-work-row">' + makeTrack(row2, true) + '</div>';
    nav.appendChild(section);
  });
})();

// Inject nav overlay (shared across all pages)
(function() {
  var overlay = document.createElement('div');
  overlay.id = 'navOverlay';
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
})();

// ===== LOGO SPLASH SCREEN =====
(function () {
  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      function doPlay() {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.value = freq;
          const start = ctx.currentTime + i * 0.18;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.18, start + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.7);
          osc.start(start);
          osc.stop(start + 0.7);
        });
      }
      if (ctx.state === 'running') {
        doPlay();
      } else {
        // Play on the very first interaction (mousemove, scroll, touch — invisible to user)
        const triggers = ['mousemove', 'touchstart', 'touchmove', 'scroll', 'keydown', 'click'];
        let played = false;
        function onInteract() {
          if (played) return;
          played = true;
          ctx.resume().then(doPlay);
          triggers.forEach(e => document.removeEventListener(e, onInteract));
        }
        triggers.forEach(e => document.addEventListener(e, onInteract, { once: false, passive: true }));
      }
    } catch (e) {}
  }

  const splash = document.createElement('div');
  splash.id = 'splash-screen';
  splash.innerHTML = `
    <div class="splash-inner">
      <img src="https://d3p2r6ofnvoe67.cloudfront.net/fit-in/160x160/filters:strip_exif()/filters:no_upscale()/filters:format(webp)/media/4c763a19-47e3-47de-a568-20d8f2c11971.png" alt="Affordable Property Servicez LLC" />
      <p>Affordable Property Servicez LLC</p>
    </div>
  `;
  document.body.prepend(splash);

  playChime();

  // Auto-dismiss after 2s
  setTimeout(() => {
    splash.classList.add('splash-hide');
    setTimeout(() => splash.remove(), 800);
  }, 2000);
})();
