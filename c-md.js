const fs = require("fs");
const path = require("path");

const files = fs.readdirSync("./md");
const curName = files.length + 1;

const fileContent =
  `## ${curName}.md\n\n` +
  "```html\n\n```\n\n" +
  "```css\n\n```\n\n" +
  "```js\n\n```";

const filePath = path.join(__dirname, "md", `${curName}.md`);

fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    console.error("Error creating file:", err);
  } else {
    console.log(`File ${filePath} created successfully.`);
  }
});
