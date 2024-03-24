let previewBtn = document.querySelector(".fs__icon"),
  livePreviewBtn = document.querySelector("#live-preview"),
  closeFs = document.querySelector(".close__fs"),
  livePreviewFrame = document.getElementById("live-preview"),
  textareaHTML = document.getElementById("htmlCode"),
  textareaCSS = document.getElementById("cssCode"),
  textareaJS = document.getElementById("jsCode"),
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
  setupLivePreviewStudio();
}

function initializeLivePreview() {
  const doc = livePreviewFrame.contentWindow.document;
  doc.body.innerHTML = "";
  const styleElement = document.createElement("style");
  styleElement.setAttribute("id", "live-preview-style");
  doc.head.appendChild(styleElement);
  const pagedJsScript = document.createElement("script");
  pagedJsScript.src = "https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js";
  doc.head.appendChild(pagedJsScript);
}

function setupLivePreviewStudio() {
  const doc = livePreviewFrame.contentWindow.document;
  CodeMirror.on(codeMirrorHtml, "change", () => {
    let val = codeMirrorHtml.getValue();
    doc.body.innerHTML = val;
  });
  CodeMirror.on(codeMirrorCss, "change", () => {
    const styleElement = doc.getElementById("live-preview-style");
    let val = codeMirrorCss.getValue();
    styleElement.innerHTML = val;
  });
  CodeMirror.on(codeMirrorJs, "change", () => {
    let val = codeMirrorJs.getValue();
    const bodyDom = doc.body;
    const scriptDom = bodyDom.querySelector("#script__preview");
    scriptDom.innerHTML = val;
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

function loadCode() {
  let doc = livePreviewFrame.contentWindow.document;
  let html = codeMirrorHtml.getValue();
  if (html) {
    doc.body.innerHTML = html;
  }
  const scriptDomC = document.createElement("script");
  scriptDomC.id = "script__preview";
  doc.body.appendChild(scriptDomC);
  let css = codeMirrorCss.getValue();
  if (css) {
    const styleElement = doc.getElementById("live-preview-style");
    styleElement.innerHTML = css;
  }
  let js = codeMirrorJs.getValue();
  if (js) {
    const bodyDom = doc.body;
    const scriptDom = bodyDom.querySelector("#script__preview");
    scriptDom.innerHTML = js;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLivePreview();
  initEditor();
  events();
  loadCode();
});
