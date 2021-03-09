export function getNavigationHtml(currentPage = "") {
  const pages = ["about", "workshops", "links", "contact"];

  let html = "";
  let first = true;
  pages.forEach((page) => {
    let pageHtml = "";
    pageHtml += `<a href="/${page}" ${
      page === currentPage ? "class='nav-active'" : ""
    }>${page}</a>`;
    if (!first) pageHtml = " · " + pageHtml;
    first = false;
    html += pageHtml;
  });

  return html;
}
