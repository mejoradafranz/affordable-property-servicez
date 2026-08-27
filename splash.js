
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

// Inject Call/Text + Free Quote buttons into logo bar + popup modal (all pages)
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var logoBar = document.querySelector('.header-logo-bar');
    if (!logoBar) return;
    var logoLink = logoBar.querySelector('a');

    // Call / Text button
    var callBtn = document.createElement('a');
    callBtn.href = 'tel:+14074078000';
    callBtn.className = 'header-call-btn';
    callBtn.innerHTML = '<i class="fas fa-phone"></i> Call / Text';

    // Free Quote button
    var quoteBtn = document.createElement('button');
    quoteBtn.className = 'header-quote-btn';
    quoteBtn.id = 'openQuoteModal';
    quoteBtn.innerHTML = '<i class="fas fa-file-alt"></i> Free Quote';

    // Desktop-only inline nav — cloned from the main menu so Home/Services sit
    // next to Call/Text and Galleries/Reviews/Contact sit next to Free Quote.
    // (Hidden on mobile via CSS; the original hamburger menu still handles nav there.)
    var leftNav = document.createElement('ul');
    leftNav.className = 'header-inline-nav header-inline-nav-left';
    var rightNav = document.createElement('ul');
    rightNav.className = 'header-inline-nav header-inline-nav-right';

    var navLinksList = document.getElementById('navLinks');
    if (navLinksList) {
      var allLis = Array.prototype.slice.call(navLinksList.children);
      allLis.slice(0, 2).forEach(function (li) { leftNav.appendChild(li.cloneNode(true)); });
      allLis.slice(2).forEach(function (li) { rightNav.appendChild(li.cloneNode(true)); });
    }

    // Center cluster: nav sits right beside the logo; Call/Text and Free Quote
    // stay pinned to the far corners of the bar.
    var centerWrap = document.createElement('div');
    centerWrap.className = 'logo-bar-center';
    centerWrap.appendChild(leftNav);
    centerWrap.appendChild(logoLink);
    centerWrap.appendChild(rightNav);

    logoBar.appendChild(centerWrap);
    logoBar.insertBefore(callBtn, centerWrap);
    logoBar.appendChild(quoteBtn);

    // Modal HTML
    var modal = document.createElement('div');
    modal.id = 'quoteModal';
    modal.className = 'quote-modal';
    modal.innerHTML =
      '<div class="quote-modal-inner">' +
        '<button class="quote-modal-close" id="closeQuoteModal">&times;</button>' +
        '<h2>Get a Free Quote</h2>' +
        '<p>Fill out the form and Robert will personally reach out within 24 hours.</p>' +
        '<form class="quote-modal-form" id="quoteModalForm">' +
          '<input type="hidden" name="access_key" value="e6f3572e-8200-48e6-aa20-116547493455" />' +
          '<input type="hidden" name="subject" value="New Quote Request – Affordable Property Servicez" />' +
          '<input type="text" name="name" placeholder="Your Name" required />' +
          '<input type="email" name="email" placeholder="Your Email" required />' +
          '<input type="tel" name="phone" placeholder="Phone Number" />' +
          '<select name="service">' +
            '<option value="">Select a Service</option>' +
            '<option>Landscape Design &amp; Installation</option>' +
            '<option>Kitchen &amp; Bathroom Remodeling</option>' +
            '<option>Interior Remodeling Services</option>' +
            '<option>Outdoor Living &amp; Hardscaping</option>' +
            '<option>Irrigation &amp; Drainage Systems</option>' +
          '</select>' +
          '<textarea rows="4" name="message" placeholder="Tell us about your project..."></textarea>' +
          '<button type="submit" class="btn-primary" style="width:100%">Send Message</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);

    function openModal() { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

    document.getElementById('openQuoteModal').addEventListener('click', openModal);
    document.getElementById('closeQuoteModal').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

    document.getElementById('quoteModalForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      try {
        var res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(this) });
        var json = await res.json();
        if (json.success) {
          this.innerHTML = '<p class="quote-modal-success">&#10003; Message sent! We\'ll be in touch shortly.</p>';
        } else { throw new Error(); }
      } catch (_) {
        btn.textContent = 'Failed. Try Again.';
        btn.style.background = '#c62828';
        btn.disabled = false;
      }
    });
  });
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
