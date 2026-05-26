// ===== LOGO SPLASH SCREEN =====
(function () {
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
