---
title: Remix
---

# What

Web framework

Michael Jackson, Ryan Florence, React Training

Built on React Router 6

Met React, en alle frameworks zijn we steeds verder verwijderd van de fundamentals of the web,
zoals HTTP, forms, etc.

Weet je nog hoe ik in mijn vorige lightning talk vertelde over server state
en client state? Het probleem is er vanwege een stricte scheiding tussen server en client apps
en steeds complexer wordende frontends.

Ik ben oud genoeg om te weten dat dat vroeger anders ging, en de makers van Remix ook. Dus wat zij met Remix doen
is de developer experience van tegenwoordig, dus bijv. declaratief programmeren in JS en React combineren met de
fundamentals van het web, zoals HTTP, Request/Response, forms, cookies enz.

En ondanks dat je je Remix app bouwt in JavaScript en React betekent niet per se dat je app zelf in de browser ook een JS app is.
Het kan zijn dat de server gewoon HTML rendert naar de browser, bijvoorbeeld als je een heel simpel form hebt.

Remix lost de problemen niet op, zoals bijvoorbeeld React Query wel doet, maar elimineert het probleem juist. Een voorbeeld is dat je geen cache hoeft bij te houden, omdat de browser dat al kan doen via HTTP caching headers. Dus door je HTTP headers goed te zetten in je Remix code is er geen abstractie en geen code nodig. Je elimineert het probleem van caching i.p.v. het op te lossen zoals React Query doet.

React makes you a better JS developer, and Remix makes you a better web developer.

# SSR + SSG

Remix does not support SSG, unless you download the build website yourself.

# Platforms

Remix doesn't want to own your platform, or your server. Deploy to any server, it's all about choices.

Starter templates: Express (Node), Vercel, AWS Lambda Architect

Later: Netlify, Azure, Firebase, CloudFlare workers

# Client/Server

Client entry point: browser rendering/hydration

Server entry point: Send real HTML over the wire
Has a `handleRequest` function.

In the future, if you would omit the client entry point, Remix assumes it's a fully server rendered app, and if you
omit the server entry point it's a fully client rendered app like Create React App.

There is a server build and a client build

Server is a "cloud function", depending on the platform. The client is an asset which you can put on a CDN.

Remix does not (yet) support Client Side Rendering, but this will probably be done service workers.

# Routes

Root route, nested routes

Define routes via filesystem, and/or via a custom routes

Each route can describe their own meta tags

Each route can have links (e.g. CSS), which is another example of eliminating a problem instead of solving it like, obfuscating CSS classes, making them unique, with hashes by using CSS Modules, CSS-in-JS, Styled Components, ...

If a route only returns a LoaderFunction, or ActionFunction, it becomes an API endpoint. Without nested routing of course, now it's an independent route.

# Layouts

When a route has the same name as a folder, it becomes a "layout route" for the child routes inside the folder. Render an <Outlet /> and the child routes will appear there. This is how you can have multiple levels of persistent layout nesting associated with URLs.

When rendering in the browser these links are loaded, but also removed, which makes sure you have no CSS conflicts: You exactly know which styles are used.
