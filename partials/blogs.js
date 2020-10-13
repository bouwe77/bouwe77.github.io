export function getBlogsHtml(blogs) {
  const template = `
<div>
    <div>
    <h3>
        <b><a href="/{{ slug }}">{{ title }}</a></b>
    </h3>
    </div>
</div>`;

  let html = "";
  blogs.forEach((blog) => {
    html += template
      .replace(new RegExp("{{ slug }}", "g"), blog.slug)
      .replace(new RegExp("{{ title }}", "g"), blog.attributes.title)
      .replace(new RegExp("{{ summary }}", "g"), blog.attributes.summary);
  });

  return html;
}
