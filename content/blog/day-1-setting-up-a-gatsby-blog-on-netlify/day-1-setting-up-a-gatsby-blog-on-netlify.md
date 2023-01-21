---
date: "2019-05-14"
title: "Day 1 - Setting up a Gatsby blog on Netlify"
summary: "Let's create a blog with Gatsby and go live!"
categories:
  - "100 days of code"
  - "React"
  - "Gatsby"
  - "Netlify"
---

Today I is my first day of this coding challenge and I will build a blog so I can share my
100 Days of Code experiences with you.

As I am typing this I still use a Google Drive text document and that doesn’t feel good. I really need a blog.

First I have to make some architectural decisions.

I decide to choose [Gatsby] as my blogging platform. It’s a static site generator that uses React.js and GraphQL.
The latter is a subject I still have to learn one day so this might be a good opportunity. Static site generators
was also on my to do list and then Gatsby is an obvious choice as it works with React.

For hosting the site I choose [Netlify], a cloud hosting solution that integrates nicely with [Github]. You create
a site on Netlify and connect it to a Github repo. As soon as you push new changes to that repo the site is automatically
deployed. And it’s free, because as long as you do not generate too much traffic you can use the free Starter plan.

To be able to blog with Gatsby, I thought I would need some kind of plugin. But there are also complete Gatsby starter
projects, which are Gatsby sites with some specific functionality. And so I found the [gatsby-starter-lumen] starter project,
which is a blogging site.
This looks like a clean solution I can use without too many big changes. And it supports categorizing and tagging my blog posts
which is an important feature for me.

I hit the “Try this starter on Netlify” button and before I know it I have Github repo for this site, deployed the site on
Netlify and imported the Github repo in CodeSandbox to start coding. Nice!

Unfortunately the day is over and although my blog is live now, the demo content has yet to be replaced by my own. However,
I started experimenting with Gatsby which has been on my to do list for a long time.

[gatsby-starter-lumen]: https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen
[gatsby]: https://gatsbyjs.org
[netlify]: https://netlify.com
[github]: https://github.com
