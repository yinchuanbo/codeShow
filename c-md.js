const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
let userName = "YinHao";
try {
  userName = execSync("git config user.name", { encoding: "utf-8" }).trim();
} catch (err) {
  console.error("Error getting Git user name:", err);
}

function time() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const timezoneOffset = currentDate.getTimezoneOffset();
  const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneMinutes = Math.abs(timezoneOffset % 60);
  const timezoneSign = timezoneOffset < 0 ? "+" : "-";
  const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${String(
    timezoneHours
  ).padStart(2, "0")}:${String(timezoneMinutes).padStart(2, "0")}`;
  return isoDateString;
}

const fileContent =
  '---\ntitle: ""\ndate: ' +
  time() +
  '\ntype: "' +
  "pc" +
  '"' +
  '\ncreate: "' +
  userName +
  '"' +
  "\n---\n\n" +
  "```html\n\n```\n\n" +
  "```css\n\n```\n\n" +
  "```js\n\n```";

const timestamp = new Date().getTime();
const filePath = path.join(__dirname, "md", `${timestamp}.md`);

fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    console.error("Error creating file:", err);
  } else {
    console.log(`File ${filePath} created successfully.`);
  }
});
