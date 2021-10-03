// This script "kills" Gatsby: https://noelwelsh.com/posts/2019-07-11-gatsby-is-a-virus.html

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  self.registration
    .unregister()
    .then(function () {
      return self.clients.matchAll();
    })
    .then(function (clients) {
      clients.forEach((client) => client.navigate(client.url));
    });
});
