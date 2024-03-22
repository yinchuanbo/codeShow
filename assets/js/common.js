let previewBtn = document.querySelector("#preview"),
  livePreviewBtn = document.querySelector("#live-preview"),
  closeFs = document.querySelector(".close__fs"),
  livePreviewFrame = document.getElementById("live-preview"),
  textareaHTML = document.getElementById("htmlCode"),
  textareaCSS = document.getElementById("cssCode"),
  textareaJS = document.getElementById("cssJs"),
  codeWrapper = document.querySelector(".code__wrapper"),
  theme = "blackboard",
  codeMirrorHtml,
  codeMirrorCss,
  codeMirrorJs;

function initEditor() {
  codeMirrorHtml = CodeMirror.fromTextArea(textareaHTML, {
    lineNumbers: true,
    mode: "htmlmixed",
    theme,
    lineWrapping: true,
    indentUnit: 4,
    autoCloseTags: true,
  });
  codeMirrorCss = CodeMirror.fromTextArea(textareaCSS, {
    lineNumbers: true,
    mode: "css",
    theme,
  });
  codeMirrorJs = CodeMirror.fromTextArea(textareaJS, {
    lineNumbers: true,
    mode: "javascript",
    theme,
  });
}

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

function events() {
  previewBtn.onclick = () => {
    livePreviewBtn.classList.add("fullscreen");
    codeWrapper.classList.add("fs");
  };
  closeFs.onclick = () => {
    livePreviewBtn.classList.remove("fullscreen");
    codeWrapper.classList.remove("fs");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  initEditor();
  initializeLivePreview();
  setupLivePreviewStudio();
  events();
});
