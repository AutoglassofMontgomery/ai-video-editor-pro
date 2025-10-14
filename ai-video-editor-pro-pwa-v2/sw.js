const CACHE = 'ai-video-editor-pro-v2';
const ASSETS = ['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
    const copy = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{}); return resp;
  }).catch(()=>cached)));
});
