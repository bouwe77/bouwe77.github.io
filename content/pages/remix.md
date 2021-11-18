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

Client entry point

Server entry point: Send real HTML over the wire
Has a `handleRequest` function.

Both server and client gets compiled to HTML returned by the server.

# Routes

Root route

Each route can describe their own meta tags

Each route can have links (e.g. CSS)

When rendering in the browser these links are loaded, but also removed, which makes sure you have no CSS conflicts: You exactly know which styles are used.





