const PAGES_ORIGIN = "https://eloise-67o.pages.dev";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, PAGES_ORIGIN);
    const headers = new Headers(request.headers);

    // Preserve same-origin checks on the Pages admin API while rejecting other origins.
    const origin = headers.get("Origin");
    if (origin) {
      try {
        const parsedOrigin = new URL(origin);
        if (parsedOrigin.host === incoming.host && incoming.hostname === "eloise.solfund.workers.dev") {
          headers.set("Origin", PAGES_ORIGIN);
        }
      } catch {
        return new Response("Invalid request origin", { status: 403 });
      }
    }

    const forwarded = new Request(target.toString(), new Request(request, { headers }));
    return fetch(forwarded, { redirect: "manual", cf: { cacheTtl: 0, cacheEverything: false } });
  }
};
