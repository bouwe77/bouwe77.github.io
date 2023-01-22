export function getHtmlForPagesPage(pages) {
  const template = `<div>
    <div>
        <b><a href="/{{ slug }}">{{ title }}</a></b>
    </div>
</div>`

  let html = ''
  pages.forEach((page) => {
    let pageHtml = ''
    pageHtml += template
      .replace(new RegExp('{{ slug }}', 'g'), page.slug)
      .replace(new RegExp('{{ title }}', 'g'), page.title)

    html += pageHtml
  })

  return html
}
