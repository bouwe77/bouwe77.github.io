export function getBlogCategoriesHtml(blogCategories) {
  const template = `<span 
  ><a href="categories/{{ slug }}"
    >{{ name }} ({{ count }})</a
  ></span
  > `;

  let html = "";
  blogCategories.forEach((cat) => {
    html += template
      .replace(new RegExp("{{ slug }}", "g"), cat.slug)
      .replace(new RegExp("{{ name }}", "g"), cat.name)
      .replace(new RegExp("{{ count }}", "g"), cat.count);
  });

  return html;
}
