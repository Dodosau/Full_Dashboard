async function fetchText(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status} – ${url}`);
  return res.text();
}

function loadCssOnce(href) {
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.href = href;
  document.head.appendChild(link);
}

function loadJsOnce(src) {
  if (document.querySelector(`script[data-src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.src = src;
  document.body.appendChild(script);
}

async function loadWidget(name, container) {
  const base = `widgets/${name}/${name}`;
  container.innerHTML = await fetchText(`${base}.html`);
  loadCssOnce(`${base}.css`);
  loadJsOnce(`${base}.js`);
}

async function boot() {
  const widgets = document.querySelectorAll("[data-widget]");

  await Promise.allSettled(
    [...widgets].map(async (el) => {
      const name = el.dataset.widget;
      try {
        await loadWidget(name, el);
      } catch (err) {
        el.innerHTML = `
          <div style="color:#ffb4b4">
            <strong>Erreur widget "${name}"</strong><br/>
            <small>${err.message}</small>
          </div>
        `;
        console.error(err);
      }
    })
  );

  window.__WIDGETS_READY__ = true;
  window.dispatchEvent(new Event("widgets:ready"));
}

boot();
