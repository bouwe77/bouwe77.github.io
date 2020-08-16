# bouwe.io

This is my blog, located at https://bouwe.io.

# Under the hood

This website is published with a static site generator (SSR) I made, inspired this gist by Ryan Florence:
https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca.

I write pages and blogs as Markdown files and the build script (build.js) transforms
these to HTML pages and puts them in a `build` folder. Finally, that `build` folder is
uploaded to a web host.

# TO DO

- generate HTML from the blog folder.
- Have 1 HTML template for both static index.html and generated pages/blogs from markdown. Or create HTML body for the homepage and let build.js insert that into the template instead of markdown.
- call build.js on Netlify instead of locally.
- create categories page
- automate creating new page or blog, specify categories also
- automate updating categories page.
- robots.txt + sitemap.xml -> Figure out how this works
