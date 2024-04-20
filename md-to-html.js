const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
const marked = require("marked");

const pages = "./pages";
const pageTemplate = require("./template-article-detail");
const outputPath = "./docs/articles";
const pagesMetaPath = "./fileConfig";
const pagesMeta = {};

// 1.清空dist
// for (var file of fs.readdirSync(outputPath)) {
//   fs.removeSync(path.join(outputPath, file));
// }

// 2.加载配置文件
console.log("Loading pages metadata...");
for (var pageMeta of fs.readdirSync(pagesMetaPath)) {
  const content = fs.readFileSync(path.join(pagesMetaPath, pageMeta), "utf8");
  pagesMeta[pageMeta] = content;
}

let listHTML = `<ul class="articles__list">`;

for (var page of fs.readdirSync(pages)) {
  var pageName = page.slice(0, page.lastIndexOf("."));
  var metaData = JSON.parse(pagesMeta["index.json"]);
  var pageContent = fs.readFileSync(path.join(pages, page)).toString();
  const tokens = marked.lexer(pageContent);
  let h2Content = "";
  tokens.forEach((token) => {
    if (token.type === "heading") {
      h2Content += token.text;
    }
  });
  const titleMatch = h2Content.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : null;
  metaData.title = title || metaData.title || pageName;
  pageContent = pageContent.replace(/^---[\s\S]*?---/, "");

  listHTML += `<li><a href="/articles/${pageName}.html">${metaData.title}</a></li>`;

  fs.writeFileSync(
    path.join(outputPath, pageName + ".html"),
    pageTemplate.generatePage(pageContent, {
      ...metaData,
    })
  );
}

function unescapeHtml(html) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

listHTML += `</ul>`;
const homeContent = fs.readFileSync("./template-article-home.html", "utf-8");

const homeHTML = ejs.render(homeContent, {
  content: unescapeHtml(listHTML)
});

fs.writeFileSync(`./docs/articles/index.html`, homeHTML);
