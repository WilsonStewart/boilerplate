(() => {
  const HOT_RELOAD_URL = "/hot-reload";

  let es;

  function connect() {
    console.log("[hot-reload] connecting…");
    es = new EventSource(HOT_RELOAD_URL);

    es.onopen = () => {
      console.log("[hot-reload] connected");
    };

    es.onerror = (err) => {
      console.warn("[hot-reload] connection lost, reloading page", err);

      // Close explicitly to avoid multiple reload attempts
      es.close();

      // Reload the page — this will also re-establish SSE
      window.location.reload();
    };
  }

  connect();
})();
