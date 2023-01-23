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
      .replace(new RegExp('{{ slug }}', 'g'), blog.slug)
      .replace(new RegExp('{{ title }}', 'g'), blog.attributes.title)
      .replace(new RegExp('{{ summary }}', 'g'), blog.attributes.summary)
      .replace(new RegExp('{{ date }}', 'g'), formatDate(blog.attributes.date))
      .replace(new RegExp('{{ readingTime }}', 'g'), blog.readingTime)
  })

  return html
}
