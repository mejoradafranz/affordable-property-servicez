
// Inject fusion photos into Services and Galleries dropdowns
(function () {
  var fusionPhotos = {
    'service': [
      'PHOTOS/1bc91e72-8341-47ad-b665-6cbf0dfd636b.webp',
      'PHOTOS/24eaf447-3b5f-4b71-a951-1fde00f43cca.webp'
    ],
    'galleri': [
      'PHOTOS/43f58220-ec86-4cda-a9f7-1b6710546dec.webp',
      'PHOTOS/604f7b52-9f44-44cb-a3ce-e39701b0aac7.webp'
    ]
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown').forEach(function (dd) {
      var link = dd.querySelector('a');
      if (!link) return;
      var text = link.textContent.toLowerCase();
      var photos = null;
      if (text.indexOf('service') !== -1) photos = fusionPhotos['service'];
      else if (text.indexOf('galleri') !== -1) photos = fusionPhotos['galleri'];
      if (!photos) return;
      var menu = dd.querySelector('.dropdown-menu');
      if (!menu) return;
      var fusion = document.createElement('div');
      fusion.className = 'svc-fusion';
      fusion.innerHTML =
        '<img src="' + photos[0] + '" alt="Our work">' +
        '<img src="' + photos[1] + '" alt="Our work">';
      menu.insertBefore(fusion, menu.firstChild);
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

// Transparent header → white on scroll (runs on all pages)
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var hdr = document.getElementById('header');
    if (!hdr) return;
    function check() {
      if (window.scrollY > 60) {
        hdr.classList.add('scrolled');
      } else {
        hdr.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  });
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
