import path from "path";
import { promises as fs } from "fs";
import shell from "shelljs";
import cheerio from "cheerio";
import remark from "remark";
import html from "remark-html";
import report from "vfile-reporter";
import fm from "front-matter";

const __dirname = path.resolve();
const blogDirectory = "blog";
const pagesDirectory = "pages";
const staticDirectory = "static";
const buildDirectory = "build";
const templatesDirectory = "templates";

go();

async function go() {
  shell.rm("-rf", "build");
  shell.mkdir("build");

  // Copy all files from the static folder as-is to the build folder.
  let statics = await fs.readdir(path.join(__dirname, staticDirectory));
  await Promise.all(
    statics.map(async (filename) => {
      await fs.copyFile(
        path.join(__dirname, staticDirectory, filename),
        path.join(__dirname, buildDirectory, filename)
      );
      console.log("›", filename);
    })
  );

  const pageTemplate = await fs.readFile(
    path.join(__dirname, templatesDirectory, "page.html")
  );

  // Convert all markdown files from the pages folder to HTML pages and copy them to the build folder.
  let pages = await fs.readdir(path.join(__dirname, pagesDirectory));
  await Promise.all(
    pages.map(async (filename) => {
      if (filename.startsWith(".")) return;
      let page = path.join(__dirname, pagesDirectory, filename);
      let markdown = await fs.readFile(page);
      let html = await markdownToHtml(markdown);
      html =
        "TODO: code refactoren zodat Pages en Blogs dezelfde ombutsacties gebruiken";
      await fs.writeFile(
        path.join(__dirname, "build", filename.replace(/\.md$/, ".html")),
        html
      );
      console.log("›", filename);
    })
  );

  const blogTemplate = await fs.readFile(
    path.join(__dirname, templatesDirectory, "blog.html")
  );

  // Convert all markdown files with front matter to HTML pages and copy them to the build folder.
  let blogSubFolders = await fs.readdir(path.join(__dirname, blogDirectory));
  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      if (subFolder.startsWith(".")) return;
      const subFolderPath = path.join(__dirname, blogDirectory, subFolder);
      let files = await fs.readdir(subFolderPath);
      const filename = files[0];
      let fileContents = await fs.readFile(path.join(subFolderPath, filename));
      const parsedFrontMatterAndMarkdown = fm(String(fileContents));
      let html = await markdownToHtml(
        parsedFrontMatterAndMarkdown.attributes.title,
        parsedFrontMatterAndMarkdown.body,
        blogTemplate
      );
      await fs.writeFile(
        path.join(__dirname, "build", filename.replace(/\.md$/, ".html")),
        html
      );
      console.log("›", filename);
    })
  );

  console.log("Done!");
}

async function markdownToHtml(title, markdown, template) {
  return new Promise(async (resolve, reject) => {
    // add remark plugins here for syntax highlighting, etc.
    remark()
      .use(html)
      .process(String(markdown), async (err, markup) => {
        if (err) {
          console.error(report(err));
          reject(err);
        }

        //TODO Content1 and Content2
        const content1 = markup;
        const content2 = "";

        let htmlPage = String(template);
        htmlPage = htmlPage.replace(new RegExp("{{ title }}", "g"), title);
        htmlPage = htmlPage.replace(
          new RegExp("{{ content1 }}", "g"),
          content1
        );
        htmlPage = htmlPage.replace(
          new RegExp("{{ content2 }}", "g"),
          content2
        );

        resolve(htmlPage);
      });
  });
}
