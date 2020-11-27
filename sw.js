
//Estrategias de Cache en PWA

//1. Cache Only: La aplicacion se carga siempre del cache (va una vez a la red y nunca mas)
//2. Cache with Network Fallback: Veo el cache, si no esta, me voy a la network
//3. Network with Cache Fallback: Voy a la red pero si la red no existe, cargo de cache
//4. Cache dinamico: Una combi de las 3 estrategias de cache
 // Si un elemento no esta en el cache, lo guardo para la proxima peticion
 // No tienes seguridad de los elementos que van a ser cargados en cache

//Esto se ejecuta una vez cuando el service worker es instalado


//APP SHELL: Son los elementos que requiere si o si la web para funcionar\
//Los recursos
//Poner todo lo que pase por el proceso de cache
const APP_SHELL = [
    "/",
    "/index.html",
    "/vendor/fontawesome-free-5.15.1-web/css/all.min.css",
    "/css/style.css",
    "/img/logo.svg",
    "/ubicaciones.html",
    "/js/init.js"
];
//Del contenido del app shell, que cosas jamas de los jamases deberia cambiar
const APP_SHELL_INMUTABLE =[

    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@10"

];
const CACHE_ESTATICO = "estatico-v1";
const CACHE_INMUTABLE = "inmutable-v1";

self.addEventListener('install', e=>{
    //Programaticamente cuando llegue fetch voy a cambiarlo
    const cacheEstatico = caches.open(CACHE_ESTATICO).then(cache=>cache.addAll(APP_SHELL));
    //Este no lo voy a cambiar nunca
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
    //Equivalente al await
    //Voy a esperar las dos promesas al mismo tiempo
    e.waitUntil(Promise.all([cacheEstatico,cacheInmutable]));
});

//Esto se ejecuta una vez cuando el service worker se activa
self.addEventListener('activate', e=>{
    console.log("El service worker fue activado");
});

//Esto se ejecuta por cada una de las peticiones que haga el navegador
self.addEventListener('fetch', e=>{
    
    // if(e.request.url.includes('index.html')){
    //     //Retornar otra peticion
    //     let respuesta = new Response(
    //         "<h1>Hola esta pagina es mentirosa, no es la original</h1>"
    //         , {headers:{'Content-Type':'text/html'}});
    //     e.respondWith(respuesta);
    // } else {
    //     e.respondWith(e.request);
    // }

});