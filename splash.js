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
