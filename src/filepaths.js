import path from "path";

const __dirname = path.resolve();
const blogDirectory = "content/blog";
const pagesDirectory = "content/pages";
const staticDirectory = "content/static";
const publishDirectory = "docs";
const publishCategoriesDirectory = "docs/categories";
const templatesDirectory = "templates";

function convertMarkdownFilenameToHtmlFilename(filename) {
  return filename.replace(/\.md$/, ".html");
}

export const filepaths = {
  getPublishDirectory: () => path.join(__dirname, publishDirectory),
  getPublishCategoriesDirectory: () =>
    path.join(__dirname, publishDirectory, "categories"),
  getBlogDirectory: () => path.join(__dirname, blogDirectory),
  getBlogSubFolder: (subFolder) =>
    path.join(__dirname, blogDirectory, subFolder),
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
  getBlogListPublishFilePath: () =>
    path.join(__dirname, publishDirectory, "blog.html"),
  getCategoryListPublishFilePath: () =>
    path.join(__dirname, publishCategoriesDirectory, "index.html"),
  getRedirectPublishFilePath: (redirectFrom) =>
    path.join(__dirname, publishDirectory, redirectFrom + ".html"),
  getPublishFilePathForMarkdown: (filename) =>
    path.join(
      __dirname,
      publishDirectory,
      convertMarkdownFilenameToHtmlFilename(filename)
    ),
  getPagesPublishFilePath: () =>
    path.join(__dirname, publishDirectory, "pages.html"),
  convertMarkdownFilenameToHtmlFilename,
  getCategoryPageFilePath: (slug) =>
    path.join(__dirname, publishCategoriesDirectory, slug + ".html"),
  getAllCategoriesJsonFilePath: () =>
    path.join(__dirname, "src", "allCategories.json"),
  getContainerTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "container.html"),
  getBodyTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "body.html"),
  getHomeTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "home.html"),
  getBlogListTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "blogs.html"),
  getCategoryListTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "categories.html"),
  getPageTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "page.html"),
  getPagesTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "pages.html"),
  getVideosTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "videos.html"),
  getBlogTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "blog.html"),
  getCategoryTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "category.html"),
  getRedirectTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "redirect.html"),
  getInteractivityTemplateFilePath: () =>
    path.join(__dirname, templatesDirectory, "interactivity.html"),
  getPublishRssFilePath: () =>
    path.join(__dirname, publishDirectory, "rss2.xml"),
  getPublishAtomFilePath: () =>
    path.join(__dirname, publishDirectory, "atom.xml"),
};
