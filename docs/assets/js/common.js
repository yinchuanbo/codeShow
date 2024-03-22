let previewBtn = document.querySelector(".fs__icon"),
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
    let val = codeMirrorHtml.getValue();
    livePreviewFrame.contentWindow.document.body.innerHTML = val;
  });
  CodeMirror.on(codeMirrorCss, "change", () => {
    const styleElement =
      livePreviewFrame.contentWindow.document.getElementById(
        "live-preview-style"
      );
    let val = codeMirrorCss.getValue();
    styleElement.innerHTML = val;
  });
  CodeMirror.on(codeMirrorJs, "change", () => {
    try {
      const scripts =
        livePreviewFrame.contentWindow.document.body.getElementsByTagName(
          "script"
        );
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        script.remove();
      }
      const scriptElement = document.createElement("script");
      let val = codeMirrorJs.getValue();
      scriptElement.innerHTML = val;
      livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
    } catch (error) {
      console.log("error", error);
    }
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
  let html = codeMirrorHtml.getValue();
  if (html) {
    livePreviewFrame.contentWindow.document.body.innerHTML = html;
  }
  let css = codeMirrorCss.getValue();
  if (css) {
    const styleElement =
      livePreviewFrame.contentWindow.document.getElementById(
        "live-preview-style"
      );
    styleElement.innerHTML = css;
  }
  try {
    let js = codeMirrorJs.getValue();
    if (js) {
      const scripts =
        livePreviewFrame.contentWindow.document.body.getElementsByTagName(
          "script"
        );
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        script.remove();
      }
      const scriptElement = document.createElement("script");
      scriptElement.innerHTML = js;
      livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
    }
  } catch (error) {
    console.log("error", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initEditor();
  initializeLivePreview();
  setupLivePreviewStudio();
  events();
  loadCode();
});
