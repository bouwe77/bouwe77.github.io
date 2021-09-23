---
date: "2020-10-28"
title: "Goodbye Gatsby, hello static site generator"
summary: ""
categories:
  - "Blogging"
  - "Gatsby"
  - "JavaScript"
---

Until now, my blog was powered by [Gatsby]. What I liked about it is that I could write blog posts and pages as Markdown documents, push to GitHub and you're done. However, I didn't understand Gatsby and, in contrast to my expectations, I was not motivated to learn it. This decreased my motivation to improve my website and write blog posts.

Then I read [a tweet by Ryan Florence] where he showed [a gist] of a very simple static site generator script. It generated HTML pages from a folder of Markdown documents. It inspired me to use it as the starting point for creating my own static site generator.

> A static site generator is a piece of software that generates a bunch of HTML documents and links them together. The result is a barebones static HTML website, just like in the olden days, which you publish to a hosting provider or cloud service provider. Your live website doesn't need a database or any other hosting facilities, all pages are generated in advance.

Static site generators are very suitable for websites which have no or little dynamic functionality. My blog, for example, are just some pages and blog posts. There is no dynamic content that needs to change on the fly and there are no possibilities for user interaction, like liking and commenting, because [I use Twitter for that].

### The general idea

I have a `content` folder which contains Markdown documents for all pages and blog posts. So when writing a blog post or page I add a new Markdown document to that folder. Then I run a JavaScript file, based on Ryan Florence's gist, that creates HTML pages for all Markdown files and puts them in a folder called `publish`.

I created HTML templates so all pages have the same header and CSS styling is applied. When generating HTML pages, the template and Markdown content are merged. Also static files, like CSS, images and favicons are published, but that is merely a copy action.

Both the `content` and `publish` folders are pushed to the same GitHub repo. As soon as I push to the `master` branch, a deploy of my website on [Netlify] is triggered, which only hosts the `publish` folder.

### Front matter

Every blog post Markdown document contains _front matter_, which is meta data about the blog post. Front matter is not only supported by [Gatsby], but also by static site generators such as [Jekyll] and [Hugo]. Front matter is formatted in [YAML] and added on top of every Markdown document. This is the front matter for the blog post you are reading now:

```
---
date: "2020-10-28"
title: "Goodbye Gatsby, hello static site generator"
categories:
  - "Blogging"
  - "Gatsby"
  - "JavaScript"
---

Until now, my blog was powered by [Gatsby]. What I liked about it is ... ... ...
```

The most important meta data are the categories for each blog post. The publish script contains custom code to gather category information from all blog posts to generate category pages that list the blog posts per category. It is also used to create a list of categories on the homepage, which link to the category pages and show the number of blog posts for each category.

### Automation

Creating Markdown files in the correct folder, with the right name, specifying front matter etc. is sensitive to errors, so I created a script to automate that. It asks me some questions and then creates everything for me. Of course I still have to write the blog post, but the plumbing is done.

The script is a CLI built with JavaScript and [Inquirer] and using it looks kind of like this:

<img alt="Automated creation of a blog post" src="/ssg.gif" width="672"/>

### Conclusion

After migrating my site from Gatsby to my own SSG solution, the blog post you are reading now is the first I created with it. I am very happy with the convenience of creating content and the feeling of having control and exactly knowing what's going on.

Although everything of my site, including my SSG scripts, are open source, I don't think it is usable for someone else. The functionality is quite specific for my use case and the JavaScript I wrote is pretty messy.

But as I use it, of course I will improve a lot along the way.

[gatsby]: https://www.gatsbyjs.com
[i use twitter for that]: using-twitter-for-blog-commenting
[a tweet by ryan florence]: https://twitter.com/ryanflorence/status/1294303054007635973
[a gist]: https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca
[netlify]: https://netlify.com
[jekyll]: https://jekyllrb.com
[hugo]: https://gohugo.io
[yaml]: https://yaml.org
[inquirer]: https://github.com/SBoudrias/Inquirer.js
