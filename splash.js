// ===== LOGO SPLASH SCREEN =====
(function () {
  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
    } catch (e) {}
  }

  function dismiss() {
    splash.classList.add('splash-hide');
    setTimeout(() => splash.remove(), 800);
  }

  const splash = document.createElement('div');
  splash.id = 'splash-screen';
  splash.style.cursor = 'pointer';
  splash.innerHTML = `
    <div class="splash-inner">
      <img src="https://d3p2r6ofnvoe67.cloudfront.net/fit-in/160x160/filters:strip_exif()/filters:no_upscale()/filters:format(webp)/media/4c763a19-47e3-47de-a568-20d8f2c11971.png" alt="Affordable Property Servicez LLC" />
      <p>Affordable Property Servicez LLC</p>
      <span style="font-size:13px;color:rgba(255,255,255,0.55);margin-top:18px;display:block;letter-spacing:2px;animation:splashText 1s ease forwards;">TAP ANYWHERE TO ENTER</span>
    </div>
  `;
  document.body.prepend(splash);

  // Tap/click anywhere on splash → play chime + dismiss
  splash.addEventListener('click', function handler() {
    splash.removeEventListener('click', handler);
    playChime();
    dismiss();
  }, { once: true });

  // Auto-dismiss after 4s even without a tap (no sound — browser policy)
  setTimeout(() => {
    if (document.getElementById('splash-screen')) dismiss();
  }, 4000);
})();
