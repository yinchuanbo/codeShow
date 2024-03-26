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

let listHTML = `<ul class="home__list">`;

filesList = filesList.sort((a, b) => Number(a) - Number(b));

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

  let title, date, type;

  const titleMatch = h2Content.match(/title:\s*"([^"]+)"/);
  const dateMatch = h2Content.match(/date:\s*([^\s]+)/);
  const typeMatch = h2Content.match(/type:\s*([^\s]+)/);
  title = titleMatch ? titleMatch[1] : null;
  date = dateMatch ? dateMatch[1] : null;
  type = typeMatch ? typeMatch[1] : null;
  const templateContent = fs.readFileSync("./template-editor.html", "utf-8");
  const compiledHtml = ejs.render(templateContent, {
    title: (title || "").trim(),
    type: (type || "").trim(),
    cssContent: (cssContent || "").trim(),
    jsContent: (jsContent || "").trim(),
    htmlContent: (htmlContent || "").trim(),
  });

  fs.writeFileSync(`./docs/${file}.html`, compiledHtml);
  let str = `style="display: none"`;
  if (i < 6) {
    str = "";
  }
  listHTML += `<li onclick="location.href='/${file}.html'" ${str}><div class="li__cover"><img src="assets/images/${file}.png" /></div><a href="javascript:;">${title}</a><span>${newDate(date)}</span></li>`;
}

function newDate(dateString = "") {
  const date = new Date(dateString);
  const localDate = date.toLocaleString();
  return localDate;
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
