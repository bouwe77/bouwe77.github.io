import { formatDate } from './utils'

export function getBlogsHtml(blogs) {
  const template = `
<div>
    <div>
      <h4>
          <a href="/{{ slug }}">{{ title }}</a>
      </h4>
      <p style="margin:0">{{ summary }}</p>
      <p style="margin:0"><i>{{ date }} · {{ readingTime }} minute read</i></p>
    </div>
</div>`

  let html = ''
  blogs.forEach((blog) => {
    html += template
      .replaceAll('{{ slug }}', blog.slug)
      .replaceAll('{{ title }}', blog.attributes.title)
      .replaceAll('{{ summary }}', blog.attributes.summary)
      .replaceAll('{{ date }}', formatDate(blog.attributes.date))
      .replaceAll('{{ readingTime }}', blog.readingTime)
  })

  return html
}
