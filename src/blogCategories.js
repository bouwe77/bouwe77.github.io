import { createSlug } from './utils'

export function getBlogCategoriesHtmlForHomepage(blogCategories) {
  const template = `<span 
  ><a href="categories/{{ slug }}"
    >{{ name }} ({{ count }})</a
  ></span
  >`

  let html = ''
  let first = true
  blogCategories.forEach((cat) => {
    let categoryHtml = ''
    categoryHtml += template
      .replaceAll('{{ slug }}', cat.slug)
      .replaceAll('{{ name }}', cat.name)
      .replaceAll('{{ count }}', cat.count)

    if (!first) categoryHtml = ' · ' + categoryHtml
    first = false

    html += categoryHtml
  })

  return html
}

export function getBlogCategoriesHtmlForCategoryListPage(blogCategories) {
  const template = `<div>
    <div>
    <h3>
        <b><a href="/categories/{{ slug }}">{{ name }} ({{ count }})</a></b>
    </h3>
    </div>
</div>`

  let html = ''
  blogCategories.forEach((cat) => {
    let categoryHtml = ''
    categoryHtml += template
      .replaceAll('{{ slug }}', cat.slug)
      .replaceAll('{{ name }}', cat.name)
      .replaceAll('{{ count }}', cat.count)

    html += categoryHtml
  })

  return html
}

export function getBlogCategoriesHtmlForBlogPost(blogCategories) {
  let categoriesHtml = ''
  if (blogCategories) {
    categoriesHtml += ' · '
    let first = true
    blogCategories.forEach((category) => {
      if (!first) categoriesHtml += ', '
      first = false
      categoriesHtml += `<a href="/categories/${createSlug(category)}">${category}</a>`
    })
  }

  return categoriesHtml
}
