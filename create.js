import inquirer from "inquirer";
import path from "path";
import { promises as fs } from "fs";

import { createSlug } from "./utils";

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
    },
  ];

  inquirer
    .prompt(generalQuestions)
    .then(async (answers) => {
      if (answers.type === "Blog post") askBlogQuestions(answers);
      else {
        console.log(answers);
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
      type: "input",
      message: "Categories:",
    },
  ];

  inquirer.prompt(blogQuestions).then((answers) => {
    const stuff = { ...generalAnswers, ...answers };
    console.log(stuff);
  });
}

async function createPage(pageData) {
  const filename = createSlug(pageData.title) + ".md";
  const text = `---
title: ${pageData.title}
---

This is a page about ${pageData.title}...
  `;

  await fs.writeFile(
    path.join(__dirname, pagesDirectory, filename),
    String(text)
  );

  console.log(" ========= P A G E    C R E A T E D    S U C C E S S F U L L Y");
}
