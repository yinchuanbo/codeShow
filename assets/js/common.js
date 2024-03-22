const previewBtn = document.querySelector("#preview");
const livePreviewBtn = document.querySelector("#live-preview");
const closeFs = document.querySelector(".close__fs");

const theme = "blackboard";
let codeMirrorHtml, codeMirrorCss, codeMirrorJs;

// HTML
const textareaHTML = document.getElementById("htmlCode");
codeMirrorHtml = CodeMirror.fromTextArea(textareaHTML, {
  lineNumbers: true,
  mode: "htmlmixed",
  theme,
  lineWrapping: true,
  indentUnit: 4,
  autoCloseTags: true,
});

// CSS
const textareaCSS = document.getElementById("cssCode");
codeMirrorCss = CodeMirror.fromTextArea(textareaCSS, {
  lineNumbers: true,
  mode: "css",
  theme,
});

//  JS
const textareaJS = document.getElementById("cssJs");
codeMirrorJs = CodeMirror.fromTextArea(textareaJS, {
  lineNumbers: true,
  mode: "javascript",
  theme,
});

const livePreviewFrame = document.getElementById("live-preview");

function initializeLivePreview() {
  livePreviewFrame.contentWindow.document.body.innerHTML = "";
  const styleElement = document.createElement("style");
  styleElement.setAttribute("id", "live-preview-style");
  livePreviewFrame.contentWindow.document.head.appendChild(styleElement);

  const pagedJsScript = document.createElement("script");
  pagedJsScript.src = "https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js";
  livePreviewFrame.contentWindow.document.head.appendChild(pagedJsScript);
}

function setupLivePreviewStudio() {
  CodeMirror.on(codeMirrorHtml, "change", () => {
    livePreviewFrame.contentWindow.document.body.innerHTML =
      codeMirrorHtml.getValue();
  });
  CodeMirror.on(codeMirrorCss, "change", () => {
    const styleElement =
      livePreviewFrame.contentWindow.document.getElementById(
        "live-preview-style"
      );
    styleElement.innerHTML = codeMirrorCss.getValue();
  });
  CodeMirror.on(codeMirrorJs, "change", () => {
    const scripts =
      livePreviewFrame.contentWindow.document.body.getElementsByTagName(
        "script"
      );
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      script.remove();
    }
    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = codeMirrorJs.getValue();
    livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLivePreview();
  setupLivePreviewStudio();
  const codeWrapper = document.querySelector('.code__wrapper')
  previewBtn.onclick = () => {
    livePreviewBtn.classList.add("fullscreen");
    codeWrapper.classList.add('fs');
  };
  closeFs.onclick = () => {
    livePreviewBtn.classList.remove("fullscreen");
    codeWrapper.classList.remove('fs');
  };
});
