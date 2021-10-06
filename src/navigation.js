export function getNavigationHtml(currentPage = "") {
  const pages = ["about", "blog", "contact"];

  let html = "<ul class='nav-list'>";
  pages.forEach((page) => {
    html += `<li class='nav-item'><a href="/${page}" ${
      page === currentPage ? "class='nav-active'" : "class='nav-inactive'"
    }>${page}</a></li>`;
  });

  html += "</ul>";

  return html;
}
