const VERSION = 'v1'
/* primero vamos a crear un precache */
self.addEventListener('install',event =>{ 
    event.waitUntil(precache())
});

/*escuchamos peticiones del browser*/
self.addEventListener('fetch', event =>{
    const request = event.request;
    //get
    if(request.method != 'GET'){ return; }
    //buscar en cache
    event.respondWith(cacheResponse(request));
    //actualizar el cache
    event.waitUntil(updateCache(request));
})


//funciones que manipulan cache
async function precache() {
    const cache = await caches.open(VERSION);
    return cache.addAll([
        '/',
        '/manifest.json',
        '/index.html',
// JS FILES 
        '/src/models/areas.js',
        '/src/models/map.js',
        '/src/models/pointAreas.js',
        '/src/models/stack.js',
        '/src/models/stand.js',
        '/src/app/index.js',
        '/src/sweetalert2@11.js',
        '/static/js/leaflet.js',

// CSS FILES
        '/static/css/main.css',
        '/static/css/puntos.css',
        '/static/css/sweet_alert.css',
        '/static/css/leaflet.css',
        
// STAND's
        '/static/img/stands/s1.webp',
        '/static/img/stands/s2.webp',
        '/static/img/stands/s3.webp',
        '/static/img/stands/s4.webp',
        '/static/img/stands/s5.webp',
        '/static/img/stands/s6.webp',
// VISOR's
        '/static/img/visor/s1_1plano.webp',
        '/static/img/visor/s1_2plano.webp',
        '/static/img/visor/s2_1plano.webp',
        '/static/img/visor/s3_1plano.webp',
        '/static/img/visor/s3_2plano.webp',
        '/static/img/visor/s3_3plano.webp',
        '/static/img/visor/s4_1plano.webp',
        '/static/img/visor/s4_2plano.webp',
        '/static/img/visor/s4_3plano.webp',
        '/static/img/visor/s4plano.webp',
        '/static/img/visor/s5_1plano.webp',
        '/static/img/visor/s5_1planocopi.webp',
        '/static/img/visor/s5_2plano.webp',
        '/static/img/visor/s6_1plano.webp',
// ICONGEN
        '/static/img/icongen/android-chrome-192x192.png',
        '/static/img/icongen/android-chrome-512x512.png',
        '/static/img/icongen/android-chrome-maskable-192x192.png',
        '/static/img/icongen/android-chrome-maskable-512x512.png',
        '/static/img/icongen/apple-touch-icon.png',

// OTHER IMG FILES
        '/static/img/favicon.ico',
        '/static/img/gps.png',
        '/static/img/grifo.png',
        '/static/img/infog.png',
        '/static/img/mapa.png',
        '/static/img/mapaH.png',
        '/static/img/mapaH.webp',
        '/static/img/marker-icon.png',
        '/static/img/marker-shadow.png',
        '/static/img/satelite.png',
        '/static/img/number-1.png',
    ]);
}

async function cacheResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request); //si no encuentro respondo con lo que venga de internet
}

async function updateCache(request){
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request,response);
}