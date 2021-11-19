---
title: Remix
---

# What

Web framework

Michael Jackson, Ryan Florence, React Training

Built on React Router 6

# Platforms

Deploy to any server

Starter templates: Express (Node), Vercel, AWS Lambda Architect

Later: Netlify, Azure, Firebase, CloudFlare workers

# Client/Server

Client entry point: browser rendering/hydration

Server entry point: Send real HTML over the wire
Has a `handleRequest` function.

Both server and client gets compiled to HTML returned by the server.

# Routes

Root route

Define routes via filesystem, and/or via a custom routes 

Each route can describe their own meta tags

Each route can have links (e.g. CSS)

# Layouts

When a route has the same name as a folder, it becomes a "layout route" for the child routes inside the folder. Render an <Outlet /> and the child routes will appear there. This is how you can have multiple levels of persistent layout nesting associated with URLs.

When rendering in the browser these links are loaded, but also removed, which makes sure you have no CSS conflicts: You exactly know which styles are used.





