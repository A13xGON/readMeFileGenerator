// Author: Alejandro Gonzalez
// Date: May 21, 2024
// Project: readMe File Generator
// UTSA BootCamp 2024
// Assignment: Module #9
// File Name: index.js

const fs = require("fs");
const inquirer = require("inquirer");

const questions_to_generate = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Give a description for your project: ",
  },
  {
    type: "input",
    name: "installation",
    message: "Give instructions on how to install your application: ",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide the usage information for your project: ",
  },
  {
    type: "input",
    name: "contribution",
    message:
      "Tell your users how to contribute to your project and application: ",
  },
  {
    type: "input",
    name: "test",
    message: "Provide the testing instructions: ",
  },
  {
    type: "input",
    name: "license",
    message: "Choose the type of license that fits your project: ",
    choices: ["MIT", "GPLv3", "Apache 2.0", "BSD 3-clause", "None"],
  },
  {
    type: "input",
    name: "github",
    message: "Please enter your GitHub username: ",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email adress: ",
  },
];

function getLicenseBadge(license) {
  if (license === "None") {
    return "";
  }
  return `![License](https://img.shields.io/badge/License-${encodeURIComponent(
    license
  )}-blue.svg)`;
}

function getLicenseSection(license) {
  if (license === "None") {
    return "";
  }
  return `## License\n\nThis project is licensed under the ${license} license.`;
}

function generateReadMeFile(answers) {
  const {
    title,
    description,
    installation,
    usage,
    contribution,
    test,
    license,
    github,
    email,
  } = answers;

  const licenseBadge = getLicenseBadge(license);
  const licenseSection = getLicenseSection(license);

  return `# ${title}

${licenseBadge}

## Description 

${description}

## Table of Contents 


- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

${licenseSection}

## Contributing

${contribution}

## Tests

${test}


## Questions

If you have any questions about the repository, you can contact me directly at [${email}](mailto:${email}). You can find more of my work at [${github}](https://github.com/${github}).


`;
}

inquirer.prompt(questions_to_generate).then((answers) => {
  const readMeInformation = generateReadMeFile(answers);
  fs.writeFile("README.md", readMeInformation, (err) => {
    if (err) {
      console.error("Error writing README.md:", err);
    } else {
      console.log("README.md has been created!");
      console.log("Generated README content:\n", readMeInformation);
    }
  });
});
