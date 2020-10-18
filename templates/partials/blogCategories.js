export function getBlogCategoriesHtml(blogCategories) {
  const template = `<span 
  ><a href="categories/{{ slug }}"
    >{{ name }} ({{ count }})</a
  ></span
  >`;

  let html = "";
  let first = true;
  blogCategories.forEach((cat) => {
    let categoryHtml = "" 
    categoryHtml += template
      .replace(new RegExp("{{ slug }}", "g"), cat.slug)
      .replace(new RegExp("{{ name }}", "g"), cat.name)
      .replace(new RegExp("{{ count }}", "g"), cat.count);
  
    if (!first) categoryHtml= " · " + categoryHtml;
    first=false;
    
    html += categoryHtml
  });

  return html;
}
