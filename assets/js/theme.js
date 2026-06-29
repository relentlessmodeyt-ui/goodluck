/* Shared light/dark theme toggle wiring (button id="themeToggle").
   The early class is set inline in <head>; this just handles clicks. */
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  function sync() { btn.setAttribute('aria-pressed', document.documentElement.classList.contains('theme-light')); }
  sync();
  btn.addEventListener('click', function () {
    var light = document.documentElement.classList.toggle('theme-light');
    try { localStorage.setItem('apex-theme', light ? 'light' : 'dark'); } catch (e) {}
    sync();
  });
})();
