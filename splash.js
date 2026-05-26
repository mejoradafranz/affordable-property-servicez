// ===== LOGO SPLASH SCREEN =====
(function () {
  // Play a soft refreshing chime when logo appears
  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
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
  playChime();

  // Create overlay
  const splash = document.createElement('div');
  splash.id = 'splash-screen';
  splash.innerHTML = `
    <div class="splash-inner">
      <img src="https://d3p2r6ofnvoe67.cloudfront.net/fit-in/160x160/filters:strip_exif()/filters:no_upscale()/filters:format(webp)/media/4c763a19-47e3-47de-a568-20d8f2c11971.png" alt="Affordable Property Servicez LLC" />
      <p>Affordable Property Servicez LLC</p>
    </div>
  `;
  document.body.prepend(splash);

  // After 2s — start fade out
  setTimeout(() => {
    splash.classList.add('splash-hide');
    // After fade completes — remove from DOM
    setTimeout(() => splash.remove(), 800);
  }, 2000);
})();
