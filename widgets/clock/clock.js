(function initClock() {
  if (window.__clock_loaded__) return;
  window.__clock_loaded__ = true;

  const timeEl = document.getElementById("clock-time");
  const dateEl = document.getElementById("clock-date");
  if (!timeEl || !dateEl) return;

  function update() {
    const now = new Date();

    timeEl.textContent = now.toLocaleTimeString("fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    dateEl.textContent = now.toLocaleDateString("fr-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  update();
  setInterval(update, 1000);
})();
