# bouwe.io

This is my blog, located at https://bouwe.io.

# Under the hood

This website is published using a static site generator script I made myself, inspired by this gist by Ryan Florence: https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca.

I wrote a blog post about how I use SSG for my blog: https://bouwe.io/goodbye-gatsby-hello-static-site-generator.

# My workflow to write a blog post or page

I write pages and blogs as Markdown files, which also contain front matter. The `publish.js` script
transforms these into HTML pages and puts them in a `publish` folder. It also generates HTML for dynamic
data such as blog categories and adds that to the HTML pages as well. Finally, the `publish` folder is
uploaded to a web host.
