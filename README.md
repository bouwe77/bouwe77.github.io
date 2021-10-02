# bouwe.io
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is my blog, located at https://bouwe.io.

# Under the hood

This website is published using a static site generator script I made myself, inspired by this gist by Ryan Florence: https://gist.github.com/ryanflorence/fb3fe3209877e7a37700a20251804cca.

I wrote a blog post about how I use SSG for my blog: https://bouwe.io/goodbye-gatsby-hello-static-site-generator.

# My workflow to write a blog post or page

I write pages and blogs as Markdown files, which also contain front matter. The `publish.js` script
transforms these into HTML pages and puts them in a `publish` folder. It also generates HTML for dynamic
data such as blog categories and adds that to the HTML pages as well. Finally, the `publish` folder is
uploaded to a web host.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bouwe.io"><img src="https://avatars.githubusercontent.com/u/4126793?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bouwe K. Westerdijk</b></sub></a><br /><a href="https://github.com/bouwe77/bouwe77.github.io/issues?q=author%3Abouwe77" title="Bug reports">🐛</a> <a href="#blog-bouwe77" title="Blogposts">📝</a> <a href="https://github.com/bouwe77/bouwe77.github.io/commits?author=bouwe77" title="Code">💻</a> <a href="#content-bouwe77" title="Content">🖋</a> <a href="https://github.com/bouwe77/bouwe77.github.io/commits?author=bouwe77" title="Documentation">📖</a> <a href="#design-bouwe77" title="Design">🎨</a> <a href="#ideas-bouwe77" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!