self.addEventListener('install', e => {
    console.log('Installed SW')
})

const version = 'universalBots'
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then( allCaches => {
            allCaches.map(cacheName => cacheName !== version ? caches.delete(cacheName) : cacheName)
        })
    )
})

self.addEventListener('fetch', e => {
    // if(e.request.method === "POST" || e.request.method === "PATCH") return console.log("patch and put request is returned")
    // e.respondWith(
        
    //     fetch(e.request)
    //     .then( allReq => {
    //         const resClone = allReq.clone();

    //         caches.open(version).then(cache => {
    //             cache.put(e.request, resClone)
    //         })

    //         return allReq
    //     }).catch( () => caches.match(e.request))
    // )
})