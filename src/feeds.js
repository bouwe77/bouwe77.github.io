import { promises as fs } from 'fs'
import { Feed } from 'feed'
import { constants } from './constants.js'
import { filepaths } from './filepaths.js'

export async function createFeeds(blogData) {
  const updated = getFeedUpdatedDate(blogData.pages)

  const feed = new Feed({
    title: constants.siteName,
    description: constants.siteDescription,
    id: constants.siteUrl,
    link: constants.siteUrl,
    language: constants.language,
    image: constants.siteImage,
    favicon: constants.faviconDefault,
    copyright: constants.copyright,
    updated,
    feedLinks: {
      json: 'https://bouwe.io/json',
      atom: 'https://bouwe.io/atom',
    },
    author: {
      name: constants.authorName,
      email: constants.authorEmail,
      link: constants.authorLink,
    },
  })

  blogData.pages.forEach((post) => {
    feed.addItem({
      title: post.attributes.title,
      id: post.url,
      link: post.url,
      description: post.attributes.summary,
      author: [
        {
          name: constants.authorName,
          email: constants.authorEmail,
          link: constants.authorLink,
        },
      ],
      date: new Date(Date.parse(post.attributes.date)),
    })
  })

  await fs.writeFile(filepaths.getPublishRssFilePath(), String(feed.rss2()))

  await fs.writeFile(filepaths.getPublishAtomFilePath(), String(feed.atom1()))
}

function getFeedUpdatedDate(posts) {
  if (posts.length === 0) {
    return new Date('1970-01-01T00:00:00.000Z')
  }

  return posts.reduce((latestDate, post) => {
    const postDate = new Date(`${post.attributes.date}T00:00:00.000Z`)
    return postDate > latestDate ? postDate : latestDate
  }, new Date(`${posts[0].attributes.date}T00:00:00.000Z`))
}
