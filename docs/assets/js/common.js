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
  codeMirrorJs,
  iframeDocument,
  iframeWrapper,
  styleContent,
  scriptContent,
  timer = null;

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

function setupLivePreviewStudio() {
  CodeMirror.on(codeMirrorHtml, "change", () => {
    let val = codeMirrorHtml.getValue();
    iframeWrapper.innerHTML = val;
  });
  CodeMirror.on(codeMirrorCss, "change", () => {
    let val = codeMirrorCss.getValue();
    styleContent.innerHTML = val;
  });
  CodeMirror.on(codeMirrorJs, "change", () => {
    clearTimeout(timer);
    timer = null;
    let val = codeMirrorJs.getValue();
    scriptContent.innerHTML = val;
    timer = setTimeout(() => {
      iframeDocument.location.reload();
      clearTimeout(timer);
      timer = null;
    }, 3000);
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
  livePreviewBtn.onload = function () {
    iframeDocument =
      livePreviewBtn.contentDocument || livePreviewBtn.contentWindow.document;
    iframeWrapper = iframeDocument.getElementById("iframe__wrapper");
    styleContent = iframeDocument.getElementById("live-preview-style");
    scriptContent = iframeDocument.getElementById("script__preview");
    let html = codeMirrorHtml.getValue();
    let css = codeMirrorCss.getValue();
    let js = codeMirrorJs.getValue();
    if (html) {
      iframeWrapper.innerHTML = html;
    }
    if (css) {
      styleContent.innerHTML = css;
    }
    if (js) {
      scriptContent.innerHTML = js;
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  initEditor();
  events();
  loadCode();
});
