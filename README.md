# bouwe.io

This is my blog, located at https://bouwe.io.

# Under the hood

This website is published with a static site generator (SSR) script.

I write pages and blogs as Markdown files and the build script (build.js) transforms
these to HTML pages and puts them in a `build` folder. Finally, that `build` folder is
uploaded to a web host.

The script I've built for this is based on this gist by Ryan Florence:
https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca

# TO DO

- rename all blog/index.mdx files to slugified-folder-name.md
- generate HTML from the following folders: pages, blog.
- copy images folder to build folder when building
- robots.txt + sitemap.xml -> Figure out how this works
- create categories page
- automate creating new page or blog, specify tag(s) also
