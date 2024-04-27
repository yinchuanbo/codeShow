const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const marked = require("marked");
const folderPath = "./md";

const mdFilePaths = [];
let filesList = [];

function traverseFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const newName = file.replace(/\.md$/, "");
    filesList.push(newName);
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && path.extname(filePath) === ".md") {
      mdFilePaths.push(filePath);
    } else if (stats.isDirectory()) {
      traverseFolder(filePath);
    }
  });
}

traverseFolder(folderPath);

const docPath = "./docs";

try {
  const docsFiles = fs.readdirSync(docPath);
  for (let i = 0; i < docsFiles.length; i++) {
    const docsFile = docsFiles[i];
    const filePath = path.join(docPath, docsFile);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && path.extname(docsFile) === ".html") {
      fs.unlinkSync(filePath);
    }
  }
} catch (err) {
  console.error("Error deleting files:", err);
}

let listHTML = `<ul class="home__list">`;

filesList = filesList.sort((a, b) => Number(a) - Number(b));

let getRandomColor = function () {
  return (
    "#" +
    (function (color) {
      return (color += "0123456789abcdef"[Math.floor(Math.random() * 16)]) &&
        color.length == 6
        ? color
        : arguments.callee(color);
    })("")
  );
};

for (let i = filesList.length - 1; i >= 0; i--) {
  const file = filesList[i];
  const markdownContent = fs.readFileSync(`./md/${file}.md`, "utf-8");
  marked.setOptions({
    highlight: function (code, lang) {
      return code;
    },
  });
  const tokens = marked.lexer(markdownContent);
  let h2Content = "";
  let jsContent = "";
  let cssContent = "";
  let htmlContent = "";
  tokens.forEach((token) => {
    if (token.type === "code") {
      if (token.lang === "js") {
        jsContent += token.text + "\n";
      } else if (token.lang === "css") {
        cssContent += token.text + "\n";
      } else if (token.lang === "html") {
        htmlContent += token.text + "\n";
      }
    } else if (token.type === "heading") {
      h2Content += token.text;
    }
  });

  let title, date, type, creator;

  const titleMatch = h2Content.match(/title:\s*"([^"]+)"/);
  const dateMatch = h2Content.match(/date:\s*([^\s]+)/);
  const typeMatch = h2Content.match(/type:\s*([^\s]+)/);
  const creatorMatch = h2Content.match(/creator:\s*([^\s]+)/);
  title = titleMatch ? titleMatch[1] : null;
  date = dateMatch ? dateMatch[1] : null;
  type = typeMatch ? typeMatch[1] : null;
  creator = creatorMatch ? creatorMatch[1] : null;
  const templateContent = fs.readFileSync("./template-editor.html", "utf-8");
  const compiledHtml = ejs.render(templateContent, {
    title: (title || "").trim(),
    type: (type || "").trim(),
    cssContent: (cssContent || "").trim(),
    jsContent: (jsContent || "").trim(),
    htmlContent: (htmlContent || "").trim(),
  });

  let params = `doc-${file}`;
  fs.writeFileSync(`./docs/${params}.html`, compiledHtml);
  let str = `style="display: none"`;
  if (i < 9) {
    str = "";
  }
  creator = (creator || "").trim();
  creator = creator.replace(/^"|"$/g, "");
  creator ||= "YinHao";

  const creatorDom = !creator
    ? ""
    : '<i class="creatorName">' +
      creator +
      "</i>";

  const isMobile =
    type && type.includes("mobile")
      ? '<img src="assets/images/mobile-2.svg" />'
      : "";

  listHTML += `
    <li onclick="location.href='/${params}.html'" ${str}>
      <div class="li__cover">
        <img src="assets/images/cover/${file}.png" />
        <div class="support-dev">
          <img src="assets/images/pc-2.svg" />
          ${isMobile}
        </div>
      </div>
      <a href="javascript:;">${title}</a>
      <span>${newDate(date)}</span>
      ${creatorDom}
    </li>`;
}

function newDate(dateString = "") {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
}

function unescapeHtml(html) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

listHTML += `</ul>`;

const homeContent = fs.readFileSync("./template-home.html", "utf-8");

const homeHTML = ejs.render(homeContent, {
  content: unescapeHtml(listHTML),
  len: filesList?.length ?? 0,
});

fs.writeFileSync(`./docs/index.html`, homeHTML);
