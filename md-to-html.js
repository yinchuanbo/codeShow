const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
const marked = require("marked");
const pages = "./pages";
const pageTemplate = require("./template-article-detail");
const outputPath = "./docs/articles";
const pagesMetaPath = "./fileConfig";
const pagesMeta = {};

// 创建一个新的 marked 渲染器
const renderer = new marked.Renderer();

// 自定义渲染器来处理 iframe 标签
renderer.html = function (html) {
  // 如果是 iframe 标签，直接返回，保持原样
  if (html.slice(0, 6) === "<iframe") {
    return html;
  }
  // 其他情况使用默认渲染方式
  return marked.Renderer.prototype.html.call(this, html);
};

// 1.清空dist
// for (var file of fs.readdirSync(outputPath)) {
//   fs.removeSync(path.join(outputPath, file));
// }

let allHTML = null;

// 2.加载配置文件
console.log("Loading pages metadata...");
for (var pageMeta of fs.readdirSync(pagesMetaPath)) {
  const content = fs.readFileSync(path.join(pagesMetaPath, pageMeta), "utf8");
  pagesMeta[pageMeta] = content;
}

let allPages = fs.readdirSync(pages);
const allLens = Object.keys(allPages).length;

allPages.sort((a, b) => {
  // 提取文件名中的数字部分并转换为整数
  const numA = parseInt(a.match(/\d+/)[0]);
  const numB = parseInt(b.match(/\d+/)[0]);
  // 数字比较
  return numA - numB;
});

function getHTML(name = "") {
  let curI = 0;
  let listHTML = `<ul class="articles__list">`;
  let listHTML2 = "";
  for (var page of allPages) {
    curI++;
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
    const dateMatch = h2Content.match(/date:\s*([^\s]+)/);
    const title = titleMatch ? titleMatch[1] : null;
    let date = dateMatch ? dateMatch[1] : null;
    date = newDate(date);
    metaData.title = title || metaData.title || pageName;
    pageContent = pageContent.replace(/^---[\s\S]*?---/, "");

    listHTML2 += `<div class="card" onclick="location.href='/articles/${pageName}.html'">${metaData.title}</div>`;
    listHTML += `<li class="${pageName === name ? "active" : ""}">
    <a href="/articles/${pageName}.html">
      ${metaData.title}
    </a>
  </li>`;
  }
  listHTML += `</ul>`;
  return {
    list1: unescapeHtml(listHTML),
    list2: unescapeHtml(listHTML2),
  };
}

function getHTML2(name = "") {
  let lock = false;
  let _idx = 0;
  let html = `<ul class="articles__list">`;
  for (var page of allPages) {
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
    const dateMatch = h2Content.match(/date:\s*([^\s]+)/);
    const title = titleMatch ? titleMatch[1] : null;
    let date = dateMatch ? dateMatch[1] : null;
    date = newDate(date);
    metaData.title = title || metaData.title || pageName;
    pageContent = pageContent.replace(/^---[\s\S]*?---/, "");
    if (pageName === name) {
      lock = true;
    }
    if (lock) {
      if (_idx >= 1 && _idx <= 10) {
        html += `<li class="${pageName === name ? "active" : ""}">
          <a href="/articles/${pageName}.html">
            ${metaData.title}
          </a>
        </li>`;
      }
      _idx++;
    }
  }

  html += `</ul>`;
  return html;
}

for (var page of allPages) {
  var pageName = page.slice(0, page.lastIndexOf("."));
  var metaData = JSON.parse(pagesMeta["index.json"]);
  var pageContent = fs.readFileSync(path.join(pages, page)).toString();
  const tokens = marked.lexer(pageContent, { renderer: renderer });
  let h2Content = "";
  tokens.forEach((token) => {
    if (token.type === "heading") {
      h2Content += token.text;
    }
  });
  const titleMatch = h2Content.match(/title:\s*"([^"]+)"/);
  const dateMatch = h2Content.match(/date:\s*([^\s]+)/);
  const title = titleMatch ? titleMatch[1] : null;
  let date = dateMatch ? dateMatch[1] : null;
  metaData.title = title || metaData.title || pageName;
  pageContent = pageContent.replace(/^---[\s\S]*?---/, "");

  if (!allHTML) {
    allHTML = getHTML()["list2"];
  }

  fs.writeFileSync(
    path.join(outputPath, pageName + ".html"),
    pageTemplate.generatePage(pageContent, {
      ...metaData,
      date: !date
        ? "2023-09-11T21:55:45+08:00"
        : newDate(date.split("+")[0] + "+08:00"),
      prev: Number(pageName) <= 1 ? 0 : Number(pageName) - 1,
      next: Number(pageName) >= allLens ? 0 : Number(pageName) + 1,
      lists: getHTML2(pageName),
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

const homeContent = fs.readFileSync("./template-article-home.html", "utf-8");

const homeHTML = ejs.render(homeContent, {
  content: unescapeHtml(allHTML),
});

fs.writeFileSync(`./docs/articles/index.html`, homeHTML);
