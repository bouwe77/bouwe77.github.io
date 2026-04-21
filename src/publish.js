import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import fm from 'front-matter'
import { fileURLToPath } from 'url'

import {
  getBlogCategoriesHtmlForHomepage,
  getBlogCategoriesHtmlForBlogPost,
  getBlogCategoriesHtmlForCategoryListPage,
} from './blogCategories.js'
import { getHtmlForPagesPage } from './pages.js'
import { getBlogsHtml } from './blogs.js'
import { replaceTokens, createSlug, formatDate, getReadingTime } from './utils.js'
import { createFeeds } from './feeds.js'
import { constants } from './constants.js'
import { filepaths } from './filepaths.js'
import { readFileContents, readFilesInFolder, copyFile, createFile, createFolder, deleteFolder } from './fileSystem.js'
import { getNavigationHtml } from './navigation.js'
import { createRedirectHtmlPages } from './redirects.js'

const ignorePrefixes = ['.', '_']
const ignoredBlogFolderPrefixes = ['.']
const unlistedBlogFolderPrefix = '_'

const navigationHtml = getNavigationHtml()
const navigationHtmlBlogPages = getNavigationHtml('blog')

export async function publish() {
  deleteFolder(filepaths.getPublishDirectory())
  createFolder(filepaths.getPublishDirectory())
  createFolder(filepaths.getPublishCategoriesDirectory())

  // Copy all files from the static folder as-is to the publish folder.
  await copyStaticFiles()

  // Create redirect HTML pages for all redirects.
  await createRedirectHtmlPages()

  // Get front matter and markdown content for all pages and blogs.
  const pageData = await getPageData()
  const blogData = await getBlogData()

  // Create the HOME page, which is a combination of an HTML template and subtemplates.
  await createHomePage(blogData)

  // Create the BLOG page, which displays all blog posts.
  await createBlogListPage(blogData)

  // Create the CATEGORIES page, which displays all blog post categories.
  await createCategoryListPage(blogData)

  // Convert all PAGE markdown files with front matter to HTML pages and copy them to the publish folder.
  await createPages(pageData)

  // Convert all BLOG markdown files with front matter to HTML pages and copy them to the publish folder.
  await createPages(blogData)

  // Create a page for each blog category.
  await createCategoryPages(blogData)

  // Create a PAGES page, which displays links to all pages from the content/pages folder.
  await createPagesPage(pageData)

  await createVideosPage()

  // Create RSS and Atom feeds.
  await createFeeds(blogData)

  const fgGreen = '\x1b[32m'
  console.log(fgGreen, '┌─────────────┐')
  console.log(fgGreen, '│   ✓ Done!   │')
  console.log(fgGreen, '└─────────────┘')
  console.log('\n\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  publish()
}

async function getBlogData() {
  const blogData = {
    template: filepaths.getBlogTemplateFilePath(),
    pages: [],
    listedPages: [],
    categories: [],
  }

  let blogSubFolders = (await readFilesInFolder(filepaths.getBlogDirectory())).filter(
    (subFolder) => !ignoredBlogFolderPrefixes.some((prefix) => subFolder.startsWith(prefix)),
  )

  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      const isUnlisted = subFolder.startsWith(unlistedBlogFolderPrefix)
      const subFolderPath = filepaths.getBlogSubFolder(subFolder)
      let files = await readFilesInFolder(subFolderPath)

      for (const filename of files) {
        const filePath = filepaths.getBlogContentFilePath(subFolder, filename)

        var fileExtension = filename.substr(filename.lastIndexOf('.') + 1)

        // If it's not an .md file it is considered a static file that just needs to be copied as-is.
        if (fileExtension !== 'md') {
          await copyFile(filePath, filepaths.getPublishFilePath(filename))
          continue
        }

        // If we end up here it's an .md file for which the meta data is added to the blogData array.
        let fileContents = await readFileContents(filePath)
        const parsedFrontMatterAndMarkdown = fm(fileContents)

        const slug = filename.replace('.md', '')
        parsedFrontMatterAndMarkdown.filename = filename
        parsedFrontMatterAndMarkdown.slug = slug
        parsedFrontMatterAndMarkdown.url = `${constants.siteUrl}/${slug}`
        parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
          filepaths.getRelativeBlogContentFilePath(subFolder, filename),
        )
        parsedFrontMatterAndMarkdown.readingTime = getReadingTime(parsedFrontMatterAndMarkdown.body)
        parsedFrontMatterAndMarkdown.isBlog = true
        parsedFrontMatterAndMarkdown.isUnlisted = isUnlisted

        if (!parsedFrontMatterAndMarkdown.attributes.categories) parsedFrontMatterAndMarkdown.attributes.categories = []

        blogData.pages.push(parsedFrontMatterAndMarkdown)

        if (isUnlisted) continue

        blogData.listedPages.push(parsedFrontMatterAndMarkdown)

        parsedFrontMatterAndMarkdown.attributes.categories.forEach((categoryName) => {
          var existingCategory = blogData.categories.find((category) => category.name === categoryName)
          if (existingCategory) existingCategory.count++
          else
            blogData.categories.push({
              name: categoryName,
              count: 1,
              slug: createSlug(categoryName),
            })
        })
      }

      // Sort the categories alphabetically.
      blogData.categories = blogData.categories.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    }),
  )

  // Sort the blogs on date descending and then by title ascending.
  blogData.pages = blogData.pages.sort(function (a, b) {
    if (a.attributes.date === b.attributes.date) {
      return a.attributes.title > b.attributes.title ? 1 : -1
    }
    return b.attributes.date > a.attributes.date ? 1 : -1
  })
  blogData.listedPages = blogData.listedPages.sort(function (a, b) {
    if (a.attributes.date === b.attributes.date) {
      return a.attributes.title > b.attributes.title ? 1 : -1
    }
    return b.attributes.date > a.attributes.date ? 1 : -1
  })

  return blogData
}

async function getPageData() {
  const pageData = { template: filepaths.getPageTemplateFilePath(), pages: [] }

  let pages = (await readFilesInFolder(filepaths.getPagesDirectory())).filter((filename) =>
    ignorePrefixes.every((prefix) => !filename.startsWith(prefix)),
  )
  await Promise.all(
    pages.map(async (filename) => {
      let fileContents = await readFileContents(filepaths.getPageContentFilePath(filename))

      const slug = filename.replace('.md', '')
      const parsedFrontMatterAndMarkdown = fm(fileContents)
      parsedFrontMatterAndMarkdown.filename = filename
      parsedFrontMatterAndMarkdown.slug = slug
      parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
        filepaths.getRelativePageContentFilePath(filename),
      )
      parsedFrontMatterAndMarkdown.stylesheets = parsedFrontMatterAndMarkdown.attributes.stylesheets || []

      pageData.pages.push(parsedFrontMatterAndMarkdown)
    }),
  )

  return pageData
}

async function copyStaticFiles() {
  let staticFiles = await readFilesInFolder(filepaths.getStaticDirectory())
  await Promise.all(
    staticFiles.map(async (filename) => {
      await copyFile(filepaths.getStaticContentFilePath(filename), filepaths.getPublishFilePath(filename))
    }),
  )
}

async function createHomePage(blogData) {
  const pageTemplate = await readFileContents(filepaths.getHomeTemplateFilePath())

  const numberOfBlogPosts = 5

  const data = {
    blogs: getBlogsHtml(blogData.listedPages.slice(0, numberOfBlogPosts)),
    blogCategories: getBlogCategoriesHtmlForHomepage(blogData.categories),
    gitHubRepoUrl: constants.gitHubRepoUrl,
    yearNow: new Date().getFullYear(),
  }

  const htmlBody = replaceTokens(pageTemplate, data)

  const html = await getContainerHtml(htmlBody, constants.siteDescription, navigationHtml)

  await createFile(filepaths.getHomePublishFilePath(), html)
}

async function createPage(
  pageSpecificHtml,
  navigation,
  publishToFilePath,
  title = constants.siteDescription,
  extraStylesheets = '',
) {
  const htmlBodyTemplate = await readFileContents(filepaths.getBodyTemplateFilePath())

  const bodyData = { page: pageSpecificHtml }
  const htmlBody = replaceTokens(htmlBodyTemplate, bodyData)

  const html = await getContainerHtml(htmlBody, title, navigation, extraStylesheets)

  await createFile(publishToFilePath, html)
}

async function createBlogListPage(blogData) {
  let pageTemplate = await readFileContents(filepaths.getBlogListTemplateFilePath())

  const data = {
    blogs: getBlogsHtml(blogData.listedPages),
  }

  const pageSpecificHtml = replaceTokens(pageTemplate, data)

  await createPage(pageSpecificHtml, navigationHtmlBlogPages, filepaths.getBlogListPublishFilePath())
}

async function createCategoryListPage(blogData) {
  let pageTemplate = await readFileContents(filepaths.getCategoryListTemplateFilePath())

  const data = {
    categories: getBlogCategoriesHtmlForCategoryListPage(blogData.categories),
  }

  const pageSpecificHtml = replaceTokens(pageTemplate, data)

  await createPage(pageSpecificHtml, navigationHtmlBlogPages, filepaths.getCategoryListPublishFilePath())
}

async function createPages(data) {
  const pageTemplate = await readFileContents(data.template)

  await Promise.all(
    data.pages.map(async (page) => {
      const navigationHtml = page.isBlog ? navigationHtmlBlogPages : getNavigationHtml(page.slug)

      const interactivityHtml = await getInteractivityHtml(page.attributes.title, page.slug, page.editOnGitHubUrl)

      const makeHtmlBody = (content) => {
        const data = {
          title: page.attributes.title,
          date: page.attributes.date ? formatDate(page.attributes.date) : undefined,
          categories: getBlogCategoriesHtmlForBlogPost(page.attributes.categories),
          readingTime: ` · ${page.readingTime} minute read`,
          content,
          slug: page.slug,
          interactivity: interactivityHtml,
          extraStylesheets: getStylesheetLinksHtml(page.stylesheets),
        }

        const htmlBody = replaceTokens(pageTemplate, data)

        return htmlBody
      }

      const pageSpecificHtml = await toHtml(makeHtmlBody, page.body)

      await createPage(
        pageSpecificHtml,
        navigationHtml,
        filepaths.getPublishFilePathForMarkdown(page.filename),
        page.attributes.title,
        getStylesheetLinksHtml(page.stylesheets),
      )
    }),
  )
}

async function createCategoryPages(blogData) {
  const pageTemplate = await readFileContents(filepaths.getCategoryTemplateFilePath())

  const allCategories = []

  await Promise.all(
    blogData.categories.map(async (cat) => {
      allCategories.push(cat.name)

      const slug = createSlug(cat.name)
      const title = `${constants.categoryPageTitle} "${cat.name}"`

      const makePageSpecificHtml = (content) => {
        const data = {
          title: title,
          content: content,
          slug: slug,
        }

        const htmlBody = replaceTokens(pageTemplate, data)

        return htmlBody
      }

      const blogsHtml = getBlogsHtml(blogData.listedPages.filter((p) => p.attributes.categories.includes(cat.name)))

      const pageSpecificHtml = await toHtml(makePageSpecificHtml, blogsHtml)

      await createPage(pageSpecificHtml, navigationHtml, filepaths.getCategoryPageFilePath(slug), title)
    }),
  )

  // Create a JSON file with all the blog categories, because we need them elsewhere too.
  const categoriesJson = JSON.stringify(allCategories)
  await createFile(filepaths.getAllCategoriesJsonFilePath(), categoriesJson)
}

async function toHtml(makeHtmlBody, markdown) {
  // Markdown content is repo-authored and intentionally contains raw HTML.
  const markup = await remark().use(gfm).use(html, { sanitize: false }).process(String(markdown))

  return makeHtmlBody(String(markup))
}

function getEditOnGitHubUrl(relativeFilePath) {
  return `${constants.gitHubEditUrl}${relativeFilePath}`
}

async function getContainerHtml(body, title, navigation, extraStylesheets = '') {
  let template = await readFileContents(filepaths.getContainerTemplateFilePath())

  const data = {
    title,
    body,
    navigation,
    extraStylesheets,
  }

  let html = replaceTokens(template, data)

  return html
}

function getStylesheetLinksHtml(stylesheets = []) {
  return stylesheets
    .map((stylesheetPath) => `    <link rel="stylesheet" href="${stylesheetPath}" />`)
    .join('\n')
}

async function getInteractivityHtml(title, slug, editOnGitHubUrl) {
  let template = await readFileContents(filepaths.getInteractivityTemplateFilePath())

  const data = {
    title,
    slug,
    editOnGitHubUrl,
  }

  let html = replaceTokens(template, data)

  return html
}

// Create a page with links to all pages from the content/pages folder.
async function createPagesPage(pageData) {
  const pages = pageData.pages
    .map((page) => ({
      title: page.attributes.title ? page.attributes.title : page.slug,
      slug: page.slug,
    }))
    .sort(function (a, b) {
      if (a.title === b.title) return 0
      return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1
    })

  const data = {
    pages: getHtmlForPagesPage(pages),
  }

  const pageTemplate = await readFileContents(filepaths.getPagesTemplateFilePath())

  const htmlBody = replaceTokens(pageTemplate, data)

  await createPage(htmlBody, getNavigationHtml('pages'), filepaths.getPagesPublishFilePath(), 'Pages')
}

async function createVideosPage() {
  const pageTemplate = await readFileContents(filepaths.getVideosTemplateFilePath())

  const htmlBody = pageTemplate

  await createPage(htmlBody, getNavigationHtml('videos'), filepaths.getVideosPublishFilePath(), 'Videos')
}
