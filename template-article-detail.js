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
  <div class="article__wrapper_left">
    ${pageMeta.lists}
  </div>
  <div class="article__wrapper_sidebar">
    <a href="/" target="_blank"><svg t="1714001835347" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" width="48" height="48"><path d="M147.904 304.128l301.866667-179.541333a128 128 0 0 1 131.712 0.512l295.466666 178.88A128 128 0 0 1 938.666667 413.482667V810.666667a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V414.144a128 128 0 0 1 62.570667-110.016z m43.626667 73.344A42.666667 42.666667 0 0 0 170.666667 414.144V810.666667a42.666667 42.666667 0 0 0 42.666666 42.666666h597.333334a42.666667 42.666667 0 0 0 42.666666-42.666666V413.482667a42.666667 42.666667 0 0 0-20.565333-36.501334l-295.466667-178.88a42.666667 42.666667 0 0 0-43.925333-0.170666l-301.866667 179.541333z" fill="#8a919f" p-id="4299"></path><path d="M405.333333 469.333333h213.333334a42.666667 42.666667 0 1 1 0 85.333334H405.333333a42.666667 42.666667 0 1 1 0-85.333334z m0 85.333334a42.666667 42.666667 0 1 0 0-85.333334h213.333334a42.666667 42.666667 0 1 0 0 85.333334H405.333333z" fill="#8a919f" p-id="4300"></path></svg></a>
    <a href="/tools/" target="_blank"><svg t="1714002003458" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6911" width="48" height="48"><path d="M817.87 556.31h-63.58v-66.24A42.27 42.27 0 0 0 712 447.8h-84.81a42.27 42.27 0 0 0-42.27 42.27v66.24H436.57v-66.24a42.27 42.27 0 0 0-42.27-42.27h-84.83a42.27 42.27 0 0 0-42.27 42.27v66.24h-61.83A22.39 22.39 0 0 0 183 578.7a22.39 22.39 0 0 0 22.39 22.39h61.81v65.55a42.27 42.27 0 0 0 42.27 42.27h84.83a42.27 42.27 0 0 0 42.27-42.27v-65.55h148.36v65.55a42.27 42.27 0 0 0 42.27 42.27H712a42.27 42.27 0 0 0 42.27-42.27v-65.55h63.58a22.39 22.39 0 0 0 22.39-22.39 22.39 22.39 0 0 0-22.37-22.39z m-438.64 95.26h-54.69V505.14h54.69z m317.72 0h-54.69V505.14H697z" p-id="6912" fill="#8a919f"></path><path d="M823 202.58h-90.81v-63.09a71.88 71.88 0 0 0-71.88-71.88H363.19a71.88 71.88 0 0 0-71.88 71.88v63.08h-90.12A137.17 137.17 0 0 0 64 339.75v479a137.17 137.17 0 0 0 137.19 137.14H823a137.17 137.17 0 0 0 137.19-137.17v-479A137.17 137.17 0 0 0 823 202.58z m-474.36-54.1A23.52 23.52 0 0 1 372.17 125h279.16a23.52 23.52 0 0 1 23.52 23.52v54.1h-326.2z m554.23 673.31a76.76 76.76 0 0 1-76.76 76.76h-628a76.76 76.76 0 0 1-76.76-76.76V336.67a76.76 76.76 0 0 1 76.76-76.76h628a76.76 76.76 0 0 1 76.76 76.76z" p-id="6913" fill="#8a919f"></path></svg></a>
  </div>
  <div class="article__wrapper">
    <div class="article__wrapper__main">
      <div class="article__wrapper_header">
        <h1>${pageMeta.title || this.defaultMeta.title}</h1>
        <span class="articles__home_time">${
          pageMeta.date || this.defaultMeta.date
        } · YinHao</span>
      </div>
      ${md.render(pageContent)} 
    </div>
  </div>
  <div class="article__wrapper_footer">
    <a class="article__wrapper_footer-left ${
      !pageMeta.prev ? "disabled" : ""
    }" href="/articles/${
      pageMeta.prev < 10 ? "0" + pageMeta.prev : pageMeta.prev
    }.html"><svg t="1713708729970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8437" width="48" height="48"><path d="M409.272947 512.57741l403.237243 403.237243a63.349415 63.349415 0 1 1-89.622481 89.622482L274.839224 557.324726a63.349415 63.349415 0 0 1 0-89.494632L722.951633 19.717685a63.349415 63.349415 0 1 1 89.494633 89.622482L409.336872 512.57741z" p-id="8438" fill="#8a8a8a"></path></svg></a>
    <a class="article__wrapper_footer-right ${
      !pageMeta.next ? "disabled" : ""
    }" href="/articles/${
      pageMeta.next < 10 ? "0" + pageMeta.next : pageMeta.next
    }.html"><svg t="1713708697355" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8093" width="48" height="48"><path d="M855.123 517.004c0 8.245-3.167 15.51-9.503 21.823L402.999 981.47c-6.336 6.336-13.625 9.477-21.869 9.477s-15.51-3.142-21.845-9.477L311.8 933.96c-6.336-6.336-9.502-13.6-9.502-21.845 0-8.222 3.167-15.51 9.502-21.845l373.29-373.29-373.293-373.267c-6.336-6.336-9.502-13.6-9.502-21.845s3.167-15.533 9.503-21.869l47.484-47.484c6.336-6.336 13.6-9.502 21.845-9.502s15.533 3.167 21.869 9.503l442.621 442.622c6.334 6.334 9.503 13.625 9.503 21.869z" fill="#8a8a8a" p-id="8094"></path></svg></a>
  </div>
  <a class="article__wrapper_index" href="/articles/"><svg t="1713708857338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9656" width="48" height="48"><path d="M549.61981 133.022476l319.683047 203.605334A70.851048 70.851048 0 0 1 902.095238 396.361143v434.883047A70.89981 70.89981 0 0 1 831.146667 902.095238h-282.819048l0.024381-218.112h-71.826286v218.087619L192.853333 902.095238A70.89981 70.89981 0 0 1 121.904762 831.24419V390.241524c0-24.527238 12.678095-47.299048 33.54819-60.220953l318.659048-197.485714a70.972952 70.972952 0 0 1 75.50781 0.487619zM828.952381 828.952381V397.214476L511.488 195.047619 195.047619 391.119238V828.952381h211.309714v-216.551619h212.187429v216.527238L828.952381 828.952381z" p-id="9657" fill="#707070"></path></svg></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>
  <script src=""></script>
  <script>
    hljs.highlightAll();
    const dom = document.querySelector('.articles__list li.active');
    if(dom) {
      dom.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  </script>
</body>
</html>
    `;
  },
};
