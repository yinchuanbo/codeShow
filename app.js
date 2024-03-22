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

let h2Content = "";
let jsContent = "";
let cssContent = "";
let htmlContent = "";

tokens.forEach((token) => {
  console.log('token', token)
  if (token.type === "code") {
    if (token.lang === "js") {
      jsContent += token.text + "\n";
    } else if (token.lang === "css") {
      cssContent += token.text + "\n";
    } else if (token.lang === "html") {
      htmlContent += token.text + "\n";
    }
  } else if(token.type === "heading") {
    h2Content += token.text;
  }
});

const templateContent = fs.readFileSync('./template.html', 'utf-8');

const compiledHtml = ejs.render(templateContent, {
  h2Content,
  cssContent,
  jsContent,
  htmlContent,
});

fs.writeFileSync("./docs/01.html", compiledHtml);
