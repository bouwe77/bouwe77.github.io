import inquirer from "inquirer";
import path from "path";
import fs from "fs";

import allCategories from "./todo/allCategories.json";

import { createSlug } from "./urls/slug";

const __dirname = path.resolve();
const blogDirectory = "content/blog";
const pagesDirectory = "content/pages";

const message = `
==========================
Create a blog post or page
==========================
`;

console.log(message);

askGeneralQuestions();

function askGeneralQuestions() {
  const generalQuestions = [
    {
      name: "type",
      type: "list",
      message: "What?",
      choices: ["Blog post", "Page"],
    },
    {
      name: "title",
      type: "input",
      message: "Title:",
      validate: (title) => {
        if (title && title.length > 0) return true;
        return "Please enter a title";
      },
    },
  ];

  inquirer
    .prompt(generalQuestions)
    .then(async (answers) => {
      if (answers.type === "Blog post") askBlogQuestions(answers);
      else {
        await createPage(answers);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function askBlogQuestions(generalAnswers) {
  const blogQuestions = [
    {
      name: "date",
      type: "input",
      message: "Date:",
      default: new Date().toISOString().split("T")[0],
    },
    {
      name: "summary",
      type: "input",
      message: "Summary:",
      default: "",
    },
    {
      name: "categories",
      type: "checkbox",
      message: "Categories:",
      choices: allCategories.map((category) => {
        return {
          name: category,
        };
      }),
    },
    {
      name: "additionalCategories",
      type: "input",
      message: "Additional categories:",
    },
  ];

  inquirer.prompt(blogQuestions).then(async (answers) => {
    const blogData = { ...generalAnswers, ...answers };

    const additionalCategories =
      blogData.additionalCategories.length > 0
        ? blogData.additionalCategories.split(",")
        : [];

    blogData.categories = [...blogData.categories, ...additionalCategories];
    blogData.additionalCategories = undefined;

    await createBlog(blogData);
  });
}

async function createBlog(blogData) {
  const slug = createSlug(blogData.title.trim());
  const filename = slug + ".md";

  let categories = "";
  blogData.categories.forEach(
    (category) => (categories += '  - "' + category.trim() + '"\n')
  );

  const text = `---
date: "${blogData.date}"
title: "${blogData.title}"
summary: "${blogData.summary}"
categories:
${categories}---

This is a blog about ${blogData.title}...`;

  const folderPath = path.join(__dirname, blogDirectory, slug);
  const filePath = path.join(folderPath, filename);

  if (fs.existsSync(folderPath)) {
    throw new Error(`Folder ${folderPath} already exists`);
  }

  fs.mkdirSync(folderPath);

  await fs.promises.writeFile(filePath, String(text));

  console.log("\n✓ Done!\n");
}

async function createPage(pageData) {
  const filename = createSlug(pageData.title) + ".md";
  const text = `---
title: ${pageData.title}
---

This is a page about ${pageData.title}...`;

  const filePath = path.join(__dirname, pagesDirectory, filename);

  // The "wx" flag makes sure existing files are not overwritten.
  await fs.promises.writeFile(filePath, String(text), { flag: "wx" });

  console.log("\n✓ Done!\n");
}
