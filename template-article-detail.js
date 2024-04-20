var md = require("markdown-it")();
module.exports = {
  generatePage: function (pageContent, pageMeta) {
    return `<!DOCTYPE html>
<html lang="${pageMeta.lang || this.defaultMeta.lang}">
  <head>
    <title>${pageMeta.title || this.defaultMeta.title}</title>
    <meta charset="${pageMeta.charset || this.defaultMeta.charset}">
    <meta name="description" content="${
      pageMeta.description || this.defaultMeta.description
    }">
    <meta name="keywords" content="${
      pageMeta.keywords || this.defaultMeta.keywords
    }">
    <meta name="author" content="${pageMeta.author || this.defaultMeta.author}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <link rel="stylesheet" href="../assets/css/articles.css">
</head>
<body>
  <div class="article__wrapper">
    <div class="article__wrapper_header">
      <h1>${pageMeta.title || this.defaultMeta.title}</h1>
    </div>
  ${md.render(pageContent)}</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>
  <script>hljs.highlightAll();</script>
</body>
</html>
    `;
  },
};
