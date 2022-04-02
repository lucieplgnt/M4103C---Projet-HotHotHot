// var urlCache = [
//     "/M4103C---Projet-HotHotHot",
//     "/M4103C---Projet-HotHotHot/index.html",  
//     "/M4103C---Projet-HotHotHot/js/script.js",
//     "/M4103C---Projet-HotHotHot/js/chart.js",
//     "/M4103C---Projet-HotHotHot/service-worker.js",
//     "/M4103C---Projet-HotHotHot/style/style.css",
//     "/M4103C---Projet-HotHotHot/images/pikachu.png",
//     "/M4103C---Projet-HotHotHot/images/kakashi.png",
//     "/M4103C---Projet-HotHotHot/images/logoTrash.png"
// ];



// // Charger les ressources puis les mettre en cache
// self.addEventListener('install', (e) => {
//     e.waitUntil(
//         caches.open('M4103C---Projet-HotHotHot').then(function (cache) {
//             console.log("Cashe Opened");
//             return cache.addAll(urlCache);
//         })
//     );
// });

self.addEventListener('install', (e) => {

    e.waitUntil(
  
      caches.open('M4103C---Projet-HotHotHot').then((cache) => cache.addAll([
  
          "/M4103C---Projet-HotHotHot",
          "/M4103C---Projet-HotHotHot/index.html",  
          "/M4103C---Projet-HotHotHot/js/script.js",
          "/M4103C---Projet-HotHotHot/js/chart.js",
          "/M4103C---Projet-HotHotHot/service-worker.js",
          "/M4103C---Projet-HotHotHot/style/style.css",
          "/M4103C---Projet-HotHotHot/images/pikachu.png",
          "/M4103C---Projet-HotHotHot/images/kakashi.png",
          "/M4103C---Projet-HotHotHot/images/logoTrash.png"

      ])),
  
    );
  
  });
  
  
  
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }

//                 // IMPORTANT: Cloner la requête.
//                 // Une requete est un flux et est à consommation unique
//                 // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
//                 var fetchRequest = event.request.clone();

//                 return fetch(fetchRequest).then(
//                     function (response) {
//                         if (!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }

//                         // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
//                         var responseToCache = response.clone();

//                         caches.open('M4103C---Projet-HotHotHot')
//                             .then(function (cache) {
//                                 cache.put(event.request, responseToCache);
//                             });

//                         return response;
//                     }
//                 );
//             })
//     );
// });
  Stratégie "Cache, falling back to network"
  
  => d'abord vérifier si la ressource n'est pas dans le cache pour la récupérer (offline)
  
  sinon, récupérer depuis le serveur en ligne (online)
  
  self.addEventListener('fetch', (e) => {
  
    e.respondWith(
  
      caches.match(e.request).then((response) => response || fetch(e.request)),
  
    );
  
  });
  
  
