import path from "path";
import { promises as fs } from "fs";
import shell from "shelljs";
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

  // Create the HOME page, which is a combination of an HTML template and subtemplates.
  const html = await readTemplate("home.html");
  await fs.writeFile(path.join(__dirname, "build", "index.html"), String(html));
  console.log("›", "index.html");

  // Convert all PAGE markdown files with front matter to HTML pages and copy them to the build folder.
  const readPageTemplate = async () => {
    return await readTemplate("page.html");
  };

  let pages = await fs.readdir(path.join(__dirname, pagesDirectory));
  await Promise.all(
    pages.map(async (filename) => {
      if (filename.startsWith(".")) return;
      createHtmlPage(
        path.join(__dirname, pagesDirectory),
        filename,
        readPageTemplate
      );
      console.log("›", filename);
    })
  );

  // Convert all BLOG markdown files with front matter to HTML pages and copy them to the build folder.
  const readBlogTemplate = async () => {
    return await readTemplate("blog.html");
  };

  let blogSubFolders = await fs.readdir(path.join(__dirname, blogDirectory));
  await Promise.all(
    blogSubFolders.map(async (subFolder) => {
      if (subFolder.startsWith(".")) return;
      const subFolderPath = path.join(__dirname, blogDirectory, subFolder);
      let files = await fs.readdir(subFolderPath);
      const filename = files[0];
      await createHtmlPage(subFolderPath, filename, readBlogTemplate);
      console.log("›", filename);
    })
  );

  console.log("Done!");

  async function createHtmlPage(directory, filename, readTemplate) {
    const blogTemplate = await readTemplate();
    let fileContents = await fs.readFile(path.join(directory, filename));
    const parsedFrontMatterAndMarkdown = fm(String(fileContents));
    let html = await toHtml(
      parsedFrontMatterAndMarkdown.attributes.title,
      parsedFrontMatterAndMarkdown.body,
      blogTemplate
    );
    await fs.writeFile(
      path.join(__dirname, "build", filename.replace(/\.md$/, ".html")),
      html
    );
  }
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
