/* 離線快取：先回快取，背景再抓新版（stale-while-revalidate）。
   沒有快取時才等網路，超過 3 秒沒回應就改用快取。
   背景抓到內容不同的新版時，通知頁面顯示「有新版本」。 */
const CACHE = "nordic-trip-v37";
const ASSETS = ["./", "./index.html", "./data.js", "./manifest.webmanifest",
                "./fonts/serif.woff2", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
const TEXT = /\.(html|js|webmanifest)$|\/$/;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function notify() {
  return self.clients.matchAll({ type: "window" }).then(cs => cs.forEach(c => c.postMessage({ type: "update" })));
}
/* 背景更新：抓新版存進快取；文字檔內容和快取不同時通知頁面 */
function refresh(req, cached) {
  return fetch(req, { cache: "no-cache" }).then(res => {
    if (!res.ok) return res;
    const copy = res.clone();
    let changed = Promise.resolve(false);
    if (cached && TEXT.test(new URL(req.url).pathname)) {
      changed = Promise.all([cached.clone().text(), res.clone().text()]).then(t => t[0] !== t[1]);
    }
    return caches.open(CACHE).then(c => c.put(req, copy))
      .then(() => changed).then(ch => ch ? notify() : null).then(() => res);
  });
}
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(cached => {
    const net = refresh(req, cached);
    if (cached) { e.waitUntil(net.catch(() => {})); return cached; }
    return Promise.race([net, timeout(3000)]).catch(() =>
      caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")));
  }));
});
