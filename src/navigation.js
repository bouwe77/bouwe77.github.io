export function getNavigationHtml(currentPage = "") {
  const pages = ["about", "blog", "workshops", "links", "contact"];

  let html = "<ul class='nav-list'>";
  pages.forEach((page) => {
    html += `<li class='nav-item'><a href="/${page}" ${
      page === currentPage ? "class='nav-active'" : "class='nav-inactive'"
    }>${page}</a></li>`;
  });

  html += "</ul>";

  return html;
}

/*
              <ul class="nav-list">
                <li class="nav-item">
                  <a href="/about" class="nav-active">about</a>
                </li>
                <li class="nav-item">
                  <a href="/blog" class="nav-inactive">blog</a>
                </li>
                <li class="nav-item">
                  <a class="nav-inactive" href="/workshops">workshops</a>
                </li>
                <li class="nav-item">
                  <a class="nav-inactive" href="/links">links</a>
                </li>
                <li class="nav-item">
                  <a class="nav-inactive" href="/contact">contact</a>
                </li>
              </ul>

*/
