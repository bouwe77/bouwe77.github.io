import slugify from 'slugify'

export function replaceTokens(html, data) {
  for (const token of Object.keys(data)) {
    html = html.replaceAll(`{{ ${token} }}`, data[token])
  }

  return html
}

export function createSlug(text) {
  return slugify(text, { lower: true, strict: true })
}

export function formatDate(date) {
  const dateSegments = date.split('-')

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const month = months[dateSegments[1] - 1]
  const day = parseInt(dateSegments[2])
  const year = dateSegments[0]

  return `${month} ${day}, ${year}`
}

export function getReadingTime(text) {
  const wordsPerMinute = 300
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime
}
