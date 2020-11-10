//TODO Display categories on the blog post page.
//TODO Determine read time: http://www.craigabbott.co.uk/how-to-calculate-reading-time-like-medium

import remark from "remark";
import html from "remark-html";
import report from "vfile-reporter";
import fm from "front-matter";

import { getBlogCategoriesHtml } from "./blogCategories";
import { getBlogsHtml } from "./blogs";
import { createSlug, formatDate } from "./utils";
import { createFeeds } from "./feeds";
import { constants, filepaths } from "./constants";
import {
  readFileContents,
  readFilesInFolder,
  copyFile,
  createFile,
  createFolder,
  deleteFolder,
} from "./fileSystem";

publish();

async function publish() {
  deleteFolder(filepaths.getPublishDirectory());
  createFolder(filepaths.getPublishDirectory());
  createFolder(filepaths.getPublishCategoriesDirectory());

  // Copy all files from the static folder as-is to the publish folder.
  await copyStaticFiles();

  // Get front matter and markdown content for all pages and blogs.
  const pageData = await getPageData();
  const blogData = await getBlogData();

  // Create the HOME page, which is a combination of an HTML template and subtemplates.
  await createHomePage(blogData);

  // Convert all PAGE markdown files with front matter to HTML pages and copy them to the publish folder.
  await createPages(pageData);

  // Convert all BLOG markdown files with front matter to HTML pages and copy them to the publish folder.
  await createPages(blogData);

  // Create a page for each blog category.
  await createCategoryPages(blogData);

  await createFeeds(blogData);

  console.log(" _                                _");
  console.log("| |                              (_)");
  console.log("| |__   ___  _   ___      _____   _  ___");
  console.log("| '_ \\ / _ \\| | | \\ \\ /\\ / / _ \\ | |/ _ \\");
  console.log("| |_) | (_) | |_| |\\ V  V /  __/_| | (_) |");
  console.log("|_.__/ \\___/ \\__,_| \\_/\\_/ \\___(_)_|\\___/");

  console.log("\n✓ Done!\n");
}

async function getBlogData() {
  const blogData = {
    template: filepaths.getBlogTemplateFilePath(),
    pages: [],
    categories: [],
  };

  let blogSubFolders = await readFilesInFolder(filepaths.getBlogDirectory());
  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      if (subFolder.startsWith(".")) return;

      const subFolderPath = filepaths.getBlogSubFolder(subFolder);
      let files = await readFilesInFolder(subFolderPath);

      for (const filename of files) {
        const filePath = filepaths.getBlogContentFilePath(subFolder, filename);

        var fileExtension = filename.substr(filename.lastIndexOf(".") + 1);

        // If it's not an .md file it is considered a static file that just needs to be copied as-is.
        if (fileExtension !== "md") {
          await copyFile(filePath, filepaths.getPublishFilePath(filename));
          continue;
        }

        // If we end up here it's an .md file for which the meta data is added to the blogData array.
        const markdownFilePath = filepaths.getMarkdownFilePath(subFolder);
        let fileContents = await readFileContents(filePath);
        const parsedFrontMatterAndMarkdown = fm(fileContents);

        const slug = filename.replace(".md", "");
        parsedFrontMatterAndMarkdown.filename = filename;
        parsedFrontMatterAndMarkdown.slug = slug;
        parsedFrontMatterAndMarkdown.url = `${constants.siteUrl}/${slug}`;
        parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
          filepaths.getRelativeBlogContentFilePath(subFolder)
        );

        if (!parsedFrontMatterAndMarkdown.attributes.categories)
          parsedFrontMatterAndMarkdown.attributes.categories = [];

        blogData.pages.push(parsedFrontMatterAndMarkdown);

        parsedFrontMatterAndMarkdown.attributes.categories.forEach(
          (categoryName) => {
            var existingCategory = blogData.categories.find(
              (category) => category.name === categoryName
            );
            if (existingCategory) existingCategory.count++;
            else
              blogData.categories.push({
                name: categoryName,
                count: 1,
                slug: createSlug(categoryName),
              });
          }
        );
      }

      // Sort the categories alphabetically.
      blogData.categories = blogData.categories.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    })
  );

  // Sort the blogs on date descending and then by title ascending.
  blogData.pages = blogData.pages.sort(function (a, b) {
    if (a.attributes.date === b.attributes.date) {
      return a.attributes.title > b.attributes.title ? 1 : -1;
    }
    return b.attributes.date > a.attributes.date ? 1 : -1;
  });

  return blogData;
}

async function getPageData() {
  const pageData = { template: filepaths.getPageTemplateFilePath(), pages: [] };

  let pages = await readFilesInFolder(filepaths.getPagesDirectory());
  await Promise.all(
    pages.map(async (filename) => {
      if (filename.startsWith(".")) return;

      let fileContents = await readFileContents(
        filepaths.getPageContentFilePath(filename)
      );

      const slug = filename.replace(".md", "");
      const parsedFrontMatterAndMarkdown = fm(fileContents);
      parsedFrontMatterAndMarkdown.filename = filename;
      parsedFrontMatterAndMarkdown.slug = slug;
      parsedFrontMatterAndMarkdown.editOnGitHubUrl = getEditOnGitHubUrl(
        filepaths.getRelativePageContentFilePath(filename)
      );

      pageData.pages.push(parsedFrontMatterAndMarkdown);
    })
  );

  return pageData;
}

async function copyStaticFiles() {
  let staticFiles = await readFilesInFolder(filepaths.getStaticDirectory());
  await Promise.all(
    staticFiles.map(async (filename) => {
      await copyFile(
        filepaths.getStaticContentFilePath(filename),
        filepaths.getPublishFilePath(filename)
      );
    })
  );
}

async function createHomePage(blogData) {
  let htmlBody = await readFileContents(filepaths.getHomeTemplateFilePath());

  htmlBody = htmlBody.replace(
    new RegExp("{{ blogs }}", "g"),
    getBlogsHtml(blogData.pages)
  );

  htmlBody = htmlBody.replace(
    new RegExp("{{ blogCategories }}", "g"),
    getBlogCategoriesHtml(blogData.categories)
  );

  const html = await getContainerHtml(htmlBody, constants.siteDescription);

  await createFile(filepaths.getHomePublishFilePath(), html);
}

async function createPages(data) {
  const template = await readFileContents(data.template);

  data.pages.forEach(async (page) => {
    const makeHtmlBody = (content) => {
      let htmlBody = template.replace(
        new RegExp("{{ title }}", "g"),
        page.attributes.title
      );

      if (page.attributes.date)
        htmlBody = htmlBody.replace(
          new RegExp("{{ date }}", "g"),
          formatDate(page.attributes.date)
        );

      htmlBody = htmlBody.replace(new RegExp("{{ content }}", "g"), content);
      htmlBody = htmlBody.replace(new RegExp("{{ slug }}", "g"), page.slug);
      htmlBody = htmlBody.replace(
        new RegExp("{{ editOnGitHubUrl }}", "g"),
        page.editOnGitHubUrl
      );

      return htmlBody;
    };

    let body = await toHtml(makeHtmlBody, page.body);
    let html = await getContainerHtml(body, page.attributes.title);

    await createFile(
      filepaths.getPublishFilePathForMarkdown(page.filename),
      html
    );
  });
}

async function createCategoryPages(blogData) {
  const template = await readFileContents(
    filepaths.getCategoryTemplateFilePath()
  );

  const allCategories = [];

  blogData.categories.forEach(async (cat) => {
    allCategories.push(cat.name);

    const blogsHtml = getBlogsHtml(
      blogData.pages.filter((p) => p.attributes.categories.includes(cat.name))
    );

    const slug = createSlug(cat.name);
    const title = `${constants.categoryPageTitle} "${cat.name}"`;

    const makeHtmlBody = (content) => {
      let htmlBody = template;
      htmlBody = htmlBody.replace(new RegExp("{{ title }}", "g"), title);
      htmlBody = htmlBody.replace(new RegExp("{{ content }}", "g"), content);
      htmlBody = htmlBody.replace(new RegExp("{{ slug }}", "g"), slug);
      return htmlBody;
    };

    const body = await toHtml(makeHtmlBody, blogsHtml);
    const html = await getContainerHtml(body, title);

    await createFile(filepaths.getCategoryPageFilePath(slug), html);
  });

  const categoriesJson = JSON.stringify(allCategories);
  await createFile(filepaths.getAllCategoriesJsonFilePath(), categoriesJson);
}

async function toHtml(makeHtmlBody, markdown) {
  return new Promise(async (resolve, reject) => {
    // add remark plugins here for syntax highlighting, etc.
    remark()
      .use(html)
      .process(String(markdown), async (err, markup) => {
        if (err) {
          console.error(report(err));
          reject(err);
        }

        const htmlBody = makeHtmlBody(markup);

        resolve(htmlBody);
      });
  });
}

function getEditOnGitHubUrl(relativeFilePath) {
  return `${constants.gitHubEditUrl}${relativeFilePath}`;
}

async function getContainerHtml(body, title) {
  let template = await readFileContents(
    filepaths.getContainerTemplateFilePath()
  );

  let html = template
    .replace(new RegExp("{{ title }}", "g"), title)
    .replace(new RegExp("{{ body }}", "g"), body);

  return html;
}
