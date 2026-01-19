(function initWeather() {
  if (window.__weather_loaded__) return;
  window.__weather_loaded__ = true;

  const tempEl = document.getElementById("w-temp");
  const descEl = document.getElementById("w-desc");

  if (!tempEl || !descEl) return;

  // Placeholder (on branchera Open-Meteo ensuite)
  tempEl.textContent = "—°";
  descEl.textContent = "API météo à connecter";
})();
