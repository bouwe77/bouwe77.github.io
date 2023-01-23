export function getHtmlForPagesPage(pages) {
  const template = `<div>
    <div>
        <b><a href="/{{ slug }}">{{ title }}</a></b>
    </div>
</div>`

  let html = ''
  pages.forEach((page) => {
    let pageHtml = ''
    pageHtml += template.replaceAll('{{ slug }}', page.slug).replaceAll('{{ title }}', page.title)

    html += pageHtml
  })

  return html
}
