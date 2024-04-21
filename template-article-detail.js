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
    <link rel="icon" sizes="any" mask href="../assets/images/ico6.svg" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <link rel="stylesheet" href="../assets/css/articles.css">
</head>
<body>
  <div class="article__wrapper">
    <div class="article__wrapper_header">
      <h1>${pageMeta.title || this.defaultMeta.title}</h1>
      <span class="articles__home_time">${
        pageMeta.date || this.defaultMeta.date
      } · YinHao</span>
    </div>
    ${md.render(pageContent)} 
  </div>
  <div class="article__wrapper_footer">
    <a class="article__wrapper_footer-left" href="/articles/${
      pageMeta.prev < 10 ? "0" + pageMeta.prev : pageMeta.prev
    }.html" style="display: ${!pageMeta.prev ? "none" : ""}" >←</a>
    <a class="article__wrapper_footer-right" href="/articles/${
      pageMeta.next < 10 ? "0" + pageMeta.next : pageMeta.next
    }.html" style="display: ${!pageMeta.next ? "none" : ""}">→</a>
  </div>
  <a class="article__wrapper_index" href="/articles/"><svg t="1713705390419" class="icon" viewBox="0 0 1195 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" width="48" height="48"><path d="M896.366826 1024h-99.596314a99.596314 99.596314 0 0 1-99.596314-99.596314v-348.587099h-199.192628v348.587099a99.596314 99.596314 0 0 1-99.596314 99.596314H298.788942a149.394471 149.394471 0 0 1-149.394471-149.394471v-348.587099a49.798157 49.798157 0 0 1 99.596314 0v348.587099a49.798157 49.798157 0 0 0 49.798157 49.798157h99.596314v-348.587099a99.596314 99.596314 0 0 1 99.596314-99.596314h199.192628a99.596314 99.596314 0 0 1 99.596314 99.596314v348.587099h99.596314a49.798157 49.798157 0 0 0 49.798157-49.798157v-348.587099a49.798157 49.798157 0 0 1 99.596314 0v348.587099a149.394471 149.394471 0 0 1-149.394471 149.394471zM1187.188062 403.514964a49.798157 49.798157 0 0 0-14.441465-68.721457L706.137866 32.020713a199.192628 199.192628 0 0 0-216.621983 0L22.907152 334.793507A49.798157 49.798157 0 0 0 76.689162 418.454411l466.608731-302.772794a99.596314 99.596314 0 0 1 108.559982 0l466.608731 302.772794a49.798157 49.798157 0 0 0 68.721456-14.441465z" fill="#333333" p-id="4299"></path></svg></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>
  <script>hljs.highlightAll();</script>
</body>
</html>
    `;
  },
};