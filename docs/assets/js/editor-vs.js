const tabItem = document.querySelectorAll(".codes_tabs_item");
const contentItem = document.querySelectorAll(".codes_contents_item");

let editorHTML,
  editorCSS,
  editorJS,
  iframeDocument,
  iframeWrapper,
  styleContent,
  scriptContent,
  livePreviewBtn = document.querySelector("#live-preview");

const htmlcode = document.getElementById("htmlcode");
const csscode = document.getElementById("csscode");
const jscode = document.getElementById("jscode");

require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@^0.21.2/min/vs" },
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

function clearTabActive() {
  for (let i = 0; i < tabItem.length; i++) {
    const element = tabItem[i];
    element.classList.remove("active");
  }
  for (let i = 0; i < contentItem.length; i++) {
    const element = contentItem[i];
    element.classList.remove("active");
  }
}

function vsCodeObj(value = "", language = "") {
  return {
    value,
    language,
    automaticLayout: true,
    theme: "vs-dark",
    fontSize: 18,
    fontFamily: "hack, SF Mono",
    scrollbar: {
      vertical: "hidden",
      horizontal: "hidden",
    },
    lineNumbers: true,
    lineHeight: 30,
  };
}

function loadCode() {
  let html = editorHTML.getValue();
  let css = editorCSS.getValue();
  let js = editorJS.getValue();
  if (html) {
    iframeWrapper.innerHTML = html;
  }
  if (css) {
    Sass.compile(css, function (result) {
      if (result.status === 0) {
        styleContent.innerHTML = result.text;
      } else {
        styleContent.innerHTML = css;
      }
    });
  }
  if (js) {
    scriptContent.innerHTML = js;
  }
}

let jsTimer = null;

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  livePreviewBtn.onload = () => {
    iframeDocument =
      livePreviewBtn.contentDocument || livePreviewBtn.contentWindow.document;
    iframeWrapper = iframeDocument.getElementById("iframe__wrapper");
    styleContent = iframeDocument.getElementById("live-preview-style");
    scriptContent = iframeDocument.getElementById("script__preview");
    require(["vs/editor/editor.main"], function () {
      editorHTML = monaco.editor.create(
        htmlcode,
        vsCodeObj(
          document.getElementById("htmlcode-ta").innerText.trim(),
          "html"
        )
      );
      editorCSS = monaco.editor.create(
        csscode,
        vsCodeObj(
          document.getElementById("csscode-ta").innerText.trim(),
          "scss"
        )
      );
      editorJS = monaco.editor.create(
        jscode,
        vsCodeObj(
          document.getElementById("jscode-ta").innerText.trim(),
          "javascript"
        )
      );
      loadCode();
      editorHTML.onDidChangeModelContent(function () {
        iframeWrapper.innerHTML = editorHTML.getValue();
        // iframeDocument.location.reload();
      });
      editorCSS.onDidChangeModelContent(function () {
        let val = editorCSS.getValue();
        Sass.compile(val, function (result) {
          if (result.status === 0) {
            styleContent.innerHTML = result.text;
          } else {
            styleContent.innerHTML = val;
          }
          //   iframeDocument.location.reload();
        });
      });
      editorJS.onDidChangeModelContent(function () {
        clearTimeout(jsTimer);
        jsTimer = null;
        jsTimer = setTimeout(() => {
          //   scriptContent.innerHTML = editorJS.getValue();
          const scriptPreview =
            iframeDocument.querySelector("#script__preview");
          if (scriptPreview) {
            scriptPreview.remove();
          }
          scriptContent = document.createElement("script");
          scriptContent.id = "script__preview";
          scriptContent.textContent = editorJS.getValue();
          iframeDocument.querySelector("body").appendChild(scriptContent);
        }, 3000);
      });

      const CopyCode = document.querySelector(".Copy__code");
      CopyCode.onclick = () => {
        const codesTabsTtem = document.querySelector(".codes_tabs_item.active");
        let text = (codesTabsTtem.innerText || "").toLowerCase();
        let content = "";
        if (text === "html") {
          content = editorHTML.getValue();
        } else if (text === "css") {
          content = editorCSS.getValue();
        } else if (text === "javascript") {
          content = editorJS.getValue();
        }
        copyToClipboard(content);
      };
    });
  };
  tabItem.forEach((item, index) => {
    item.onclick = () => {
      clearTabActive();
      item.classList.add("active");
      contentItem[index].classList.add("active");
    };
  });
  const codeFullscreen = document.querySelector(".code_fullscreen");
  const codeWrapper = document.querySelector(".vs__code_wrapper-main");
  codeFullscreen.onclick = () => {
    codeWrapper.classList.toggle("fullscreen");
  };
});
