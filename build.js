// Hier was ik gebleven:
// - Ik was de HTML aan het genereren voor de blog categories op de homepage, zie partials/blogCategories.js
// - Deze HTML/CSS is cleaner dan die W3.css grid meuk: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_blog_layout
// - blogDirectory.js maken zodat ik met het commando "node blog" via wat vragen een blog post kan genereren

import path from "path";
import { promises as fs } from "fs";
import shell, { cat } from "shelljs";
import remark from "remark";
import html from "remark-html";
import report from "vfile-reporter";
import fm from "front-matter";

import { getBlogCategoriesHtml } from "./partials/blogCategories";
import { getBlogsHtml } from "./partials/blogs";

const __dirname = path.resolve();
const blogDirectory = "blog";
const pagesDirectory = "pages";
const staticDirectory = "static";
const buildDirectory = "build";
const templatesDirectory = "pageTemplates";

go();

async function go() {
  shell.rm("-rf", "build");
  shell.mkdir("build");
  shell.mkdir("build/categories");

  // Copy all files from the static folder as-is to the build folder.
  await copyStaticFiles();

  // Get front matter and markdown content for all pages and blogs.
  const pageData = await getPageData();
  const blogData = await getBlogData();

  // Create the HOME page, which is a combination of an HTML template and subtemplates.
  await createHomePage(blogData);

  // Convert all PAGE markdown files with front matter to HTML pages and copy them to the build folder.
  await createPages(pageData);

  // Convert all BLOG markdown files with front matter to HTML pages and copy them to the build folder.
  await createPages(blogData);

  // Create a page for each blog category.
  await createCategoryPages(blogData.categories);
}

async function getBlogData() {
  const blogData = { template: "blog.html", pages: [], categories: [] };

  let blogSubFolders = await fs.readdir(path.join(__dirname, blogDirectory));
  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      if (subFolder.startsWith(".")) return;
      const subFolderPath = path.join(__dirname, blogDirectory, subFolder);
      let files = await fs.readdir(subFolderPath);
      const filename = files[0];

      let fileContents = await fs.readFile(path.join(subFolderPath, filename));
      const parsedFrontMatterAndMarkdown = fm(String(fileContents));

      parsedFrontMatterAndMarkdown.filename = filename;
      parsedFrontMatterAndMarkdown.slug = filename.replace(".md", "");
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
    })
  );

  return blogData;
}

async function getPageData() {
  const pageData = { template: "page.html", pages: [] };

  let pages = await fs.readdir(path.join(__dirname, pagesDirectory));
  await Promise.all(
    pages.map(async (filename) => {
      if (filename.startsWith(".")) return;
      let fileContents = await fs.readFile(
        path.join(__dirname, pagesDirectory, filename)
      );
      const parsedFrontMatterAndMarkdown = fm(String(fileContents));
      parsedFrontMatterAndMarkdown.filename = filename;
      pageData.pages.push(parsedFrontMatterAndMarkdown);
    })
  );

  return pageData;
}

async function copyStaticFiles() {
  let staticFiles = await fs.readdir(path.join(__dirname, staticDirectory));
  await Promise.all(
    staticFiles.map(async (filename) => {
      await fs.copyFile(
        path.join(__dirname, staticDirectory, filename),
        path.join(__dirname, buildDirectory, filename)
      );
      console.log("›", filename);
    })
  );
}

async function createHomePage(blogData) {
  let html = await readTemplate("home.html");

  html = String(html).replace(
    new RegExp("{{ blogs }}", "g"),
    getBlogsHtml(blogData.pages)
  );

  html = String(html).replace(
    new RegExp("{{ blogCategories }}", "g"),
    getBlogCategoriesHtml(blogData.categories)
  );

  await fs.writeFile(path.join(__dirname, "build", "index.html"), String(html));
  console.log("›", "index.html");
}

async function createPages(data) {
  const template = await readTemplate(data.template);

  data.pages.forEach(async (page) => {
    let html = await toHtml(page.attributes.title, page.body, template);
    await fs.writeFile(
      path.join(__dirname, "build", page.filename.replace(/\.md$/, ".html")),
      html
    );
    console.log("›", page.filename);
  });
}

async function createCategoryPages(categories) {
  const template = await readTemplate("page.html");

  categories.forEach(async (cat) => {
    let html = await toHtml(
      cat.name,
      `Page for category <b>${cat.name}</b>`,
      template
    );
    await fs.writeFile(
      path.join(__dirname, "build/categories", createSlug(cat.name) + ".html"),
      html
    );
    console.log("›", cat.name);
  });
}

async function toHtml(title, markdown, template) {
  return new Promise(async (resolve, reject) => {
    // add remark plugins here for syntax highlighting, etc.
    remark()
      .use(html)
      .process(String(markdown), async (err, markup) => {
        if (err) {
          console.error(report(err));
          reject(err);
        }

        let htmlPage = String(template);
        htmlPage = htmlPage.replace(new RegExp("{{ title }}", "g"), title);
        htmlPage = htmlPage.replace(new RegExp("{{ content }}", "g"), markup);

        resolve(htmlPage);
      });
  });
}

async function readTemplate(templateFile) {
  return await fs.readFile(
    path.join(__dirname, templatesDirectory, templateFile)
  );
}

function createSlug(text) {
  let slug = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slug;
}
