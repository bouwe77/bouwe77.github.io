# bouwe.io

This is my blog, located at https://bouwe.io.

# Under the hood

This website is published with a static site generator (SSR) I made, inspired by this gist by Ryan Florence:
https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca.

I write pages and blogs as Markdown files, which also contain front matter. The `build.js` script
transforms these into HTML pages and puts them in a `build` folder. It also generates HTML for dynamic
data such as blog categories and adds that to the HTML pages as well. Finally, the `build` folder is
uploaded to a web host.

# TO DO

- call build.js on Netlify instead of locally.
- create categories page
- automate creating new page or blog, specify categories also
- automate updating categories page.
- robots.txt + sitemap.xml -> Figure out how this works
