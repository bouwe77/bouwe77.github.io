//TODO container.html ook meenemen!
import path from "path";

export const constants = {
  siteName: "bouwe.io",
  siteUrl: "https://bouwe.io",
  siteDescription: "bouwe.io, a blog by Bouwe Westerdijk",
  language: "en",
  siteImage: "https://bouwe.io/bouwe-react-amsterdam.png",
  faviconDefault: "https://bouwe.io/favicon.ico",
  copyright: `All rights reserved 2019 - ${new Date().getFullYear()}, Bouwe Westerdijk`,
  authorName: "Bouwe Westerdijk",
  authorEmail: "bouwe@bouwe.nl",
  authorLink: "https://bouwe.io",
  gitHubEditUrl: "https://github.com/bouwe77/bouwe.io/edit/master/",
  categoryPageTitle: "Blog posts about",
};

const __dirname = path.resolve();
const blogDirectory = "content/blog";
const pagesDirectory = "content/pages";
const staticDirectory = "content/static";
const publishDirectory = "publish";
const publishCategoriesDirectory = "publish/categories";
const templatesDirectory = "templates";

export const filepaths = {
  getPublishDirectory: () => path.join(__dirname, publishDirectory),
  getPublishCategoriesDirectory: () =>
    path.join(__dirname, publishDirectory, "categories"),
  getBlogDirectory: () => path.join(__dirname, blogDirectory),
  getBlogSubFolder: (subFolder) =>
    path.join(__dirname, blogDirectory, subFolder),
  getMarkdownFilePath: (subFolder) =>
    path.join(__dirname, blogDirectory, subFolder, subFolder + ".md"),
  getBlogContentFilePath: (subFolder, filename) =>
    path.join(__dirname, blogDirectory, subFolder, filename),
  getRelativeBlogContentFilePath: (subFolder) =>
    path.join(blogDirectory, subFolder, subFolder + ".md"),
  getPublishFilePath: (filename) =>
    path.join(__dirname, publishDirectory, filename),
  getPagesDirectory: () => path.join(__dirname, pagesDirectory),
  getPageContentFilePath: (filename) =>
    path.join(__dirname, pagesDirectory, filename),
  getRelativePageContentFilePath: (filename) =>
    path.join(pagesDirectory, filename),
  getStaticDirectory: () => path.join(__dirname, staticDirectory),
  getStaticContentFilePath: (filename) =>
    path.join(__dirname, staticDirectory, filename),
  getHomePublishFilePath: () =>
    path.join(__dirname, publishDirectory, "index.html"),
  getPublishFilePathForMarkdown: (filename) =>
    path.join(__dirname, publishDirectory, filename.replace(/\.md$/, ".html")),
  getCategoryPageFilePath: (slug) =>
    path.join(__dirname, publishCategoriesDirectory, slug + ".html"),
  getAllCategoriesJsonFilePath: () =>
    path.join(__dirname, "src", "allCategories.json"),
  getContainerTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "container.html"),
  getHomeTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "home.html"),
  getPageTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "page.html"),
  getBlogTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "blog.html"),
  getCategoryTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "category.html"),
  getPublishRssFilePath: () =>
    path.join(__dirname, publishDirectory, "rss2.xml"),
  getPublishAtomFilePath: () =>
    path.join(__dirname, publishDirectory, "atom.xml"),
};
