import path from "path";
import { promises as fs } from "fs";
import shell from "shelljs";
import cheerio from "cheerio";
import remark from "remark";
import html from "remark-html";
import report from "vfile-reporter";

const __dirname = path.resolve();
const pagesDirectory = "pages";
const staticDirectory = "static";
const buildDirectory = "build";

go();

async function go() {
  shell.rm("-rf", "build");
  shell.mkdir("build");

  // Copy all files from the static folder to the build folder.
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

  // Publish all markdown files from the pages folder as HTML pages and copy them to the build folder.
  let pages = await fs.readdir(path.join(__dirname, pagesDirectory));
  await Promise.all(
    pages.map(async (filename) => {
      let page = path.join(__dirname, pagesDirectory, filename);
      let body = await createPage(page);
      await fs.writeFile(
        path.join(__dirname, "build", filename.replace(/\.md$/, ".html")),
        body
      );
      console.log("›", filename);
    })
  );
  console.log("Done!");
}

async function createPage(filePath) {
  let markdown = await fs.readFile(filePath);
  return new Promise(async (resolve, reject) => {
    // add remark plugins here for syntax highlighting, etc.
    remark()
      .use(html)
      .process(String(markdown), async (err, markup) => {
        if (err) {
          console.error(report(err));
          reject(err);
        }
        let page = getPage(String(markup));
        resolve(page);
      });
  });
}

function getPage(body) {
  let $ = cheerio.load(body);
  let title = $("h1").text();
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="https://unpkg.com/@exampledev/new.css@1.1.3/new.css" />
    <style>body { font-family: "Iowan Old Style", "Apple Garamond", Baskerville, "Times New Roman", "Droid Serif", Times, "Source Serif Pro", serif; }</style>
  </head>
  <body>
    ${body}
  </body>
</html>
  `;
}