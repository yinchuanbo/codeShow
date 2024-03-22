const fs = require("fs");
const ejs = require("ejs");
const marked = require("marked");
const markdownContent = fs.readFileSync("./md/01.md", "utf-8");
marked.setOptions({
  highlight: function (code, lang) {
    return code;
  },
});

const tokens = marked.lexer(markdownContent);

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
  }
});

const templateContent = fs.readFileSync('./template.html', 'utf-8');

const compiledHtml = ejs.render(templateContent, {
  cssContent,
  jsContent,
  htmlContent,
});

fs.writeFileSync("./docs/01.html", compiledHtml);
