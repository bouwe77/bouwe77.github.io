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

const rootDirectory = path.resolve();
const blogDirectory = "content/blog";
const pagesDirectory = "content/pages";
const staticDirectory = "content/static";
const publishDirectory = "publish";
const publishCategoriesDirectory = "publish/categories";
const templatesDirectory = "templates";

export const filepaths = {
  getPublishDirectory: () => path.join(__dirname, publishDirectory),
  getPublishDirectory: () =>
    path.join(__dirname, publishDirectory, "categories"),
  getBlogDirectory: () => path.join(__dirname, blogDirectory),
  getBlogSubFolder: (subFolder) =>
    path.join(__dirname, blogDirectory, subFolder),
  getBlogContentFilePath: (subFolder) =>
    path.join(__dirname, blogDirectory, subFolder, subFolder + ".md"),
  getPublishFilePath: (filename) =>
    path.join(__dirname, publishDirectory, filename),
  getPagesDirectory: () => path.join(__dirname, pagesDirectory),
  getPageContentFilePath: (filename) =>
    path.join(__dirname, pagesDirectory, filename),
  getStaticDirectory: () => path.join(__dirname, staticDirectory),
  getStaticContentFilePath: (filename) =>
    path.join(__dirname, staticDirectory, filename),
  getHomePublishFilePath: () =>
    path.join(__dirname, publishDirectory, "index.html"),
  getPublishFilePathForMarkdown: (filename) =>
    path.join(__dirname, publishDirectory, filename.replace(/\.md$/, ".html")),
};
