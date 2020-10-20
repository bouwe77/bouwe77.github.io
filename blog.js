import inquirer from "inquirer";
import { createSlug } from "./utils";

const message = `
Create a new blog post
======================
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
    .then((answers) => {
      if (answers.type === "Blog post") askBlogQuestions(answers);
      else {
        console.log(answers);
        //TODO Create page
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
    console.log(generalAnswers, answers);
  });
}
