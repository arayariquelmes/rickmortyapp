
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
    //"rickmortyduoc/",
    "index.html",
    "vendor/fontawesome-free-5.15.1-web/css/all.min.css",
    "css/style.css",
    "img/logo.svg",
    "ubicaciones.html",
    "js/init.js"
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
    //Limpiar caches antiguos
    console.log("El service worker fue activado");
});

//Esto se ejecuta por cada una de las peticiones que haga el navegador
self.addEventListener('fetch', e=>{
    
    //Preguntarme si la peticion que estoy recibiendo se encuentra dentro de algun cache
    //Si se encuentra en el cache la voy a servir desde ahi, sino voy a buscarla a la red
    //Cache con Network Fallback

    const respuesta = caches.match(e.request).then(res=>{
        //Me voy a preguntar si la respuesta esta en el cache
        //Voy a hacer esta estrategia exceptuando con la api
        if(res && !e.request.url.includes("/api")){
            return res;
        } else {
            //Con la API voy a usar la estragia Network with Cache Fallback
            //Voy a internet, si la internet F, sirvo del cache
            //Hacer la petición a internet
            const petInternet = fetch(e.request).then(newRes=>{
                //Si la respuesta es correcta
                if(newRes.ok || newRes.type == 'opaque'){
                    //La guardo en el cache dinamico
                    return caches.open("dinamico-v1").then(cache=>{
                        //Con esto se guarda en el cache, se debe clonar porque una promesa puede ser resuelta solo una vez
                        cache.put(e.request, newRes.clone());
                        return newRes.clone();
                    });
                }else {
                    //Si no funciono el cache, si no funcionó la internet, F
                    //Retornas la respuesta de error normalmente
                    console.log(newRes);
                    return newRes;
                }

            }).catch(error=>caches.match(e.request));
            return petInternet;
        }
    });
    
    e.respondWith(respuesta);

});