const tabs = document.querySelectorAll(".container-tabs .tabs-item");
const contents = document.querySelectorAll(
  ".container-contents .contents-item"
);

function clearTabsActive() {
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    tab.classList.remove("active");
  }
}
function clearContentsActive() {
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    content.classList.remove("active");
  }
}

for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];
  tab.onclick = () => {
    clearTabsActive();
    clearContentsActive();
    tab.classList.add("active");
    contents[i].classList.add("active");
  };
}

const cssCompress = document.getElementById("css-compress");

cssCompress.oninput = (event) => {
  const val = event.target.value.trim();
  if (!val) {
    document.getElementById("css-compress-output").textContent = "";
    return;
  }
  let res;
  //去除注释
  res = val.replace(/\/\*((.|\n|\t)*?)\*\//g, "");
  //除去首尾空格
  res = res.replace(/(\s)*{\s*/g, "{").replace(/(\s)*}\s*/g, "}");
  //去除样式间空格
  res = res.replace(/(\s)*;\s*/g, ";");
  //去除样式名称后面空格
  res = res.replace(/:(\s)*/g, ":");
  //去除换行符
  res = res.replace(/(\n|\t)+/g, "");
  //去除末尾分号
  res = res.replace(/;}/g, "}");
  document.getElementById("css-compress-output").textContent = res;
};

const htmlCompress = document.getElementById("html-compress");

htmlCompress.oninput = (event) => {
  const val = event.target.value.trim();
  if (!val) {
    document.getElementById("html-compress-output").textContent = "";
    return;
  }
  var rep = /\n+/g;
  var repone = /<!--.*?-->/gi;
  var reptwo = /\/\*.*?\*\//gi;
  var reptree = /[ ]+</gi;
  var sourceZero = val.replace(rep, "");
  var sourceOne = sourceZero.replace(repone, "");
  var sourceTwo = sourceOne.replace(reptwo, "");
  var sourceTree = sourceTwo.replace(reptree, "<");
  document.getElementById("html-compress-output").textContent = sourceTree;
};

const jsCompress = document.getElementById("js-compress");

jsCompress.oninput = async (event) => {
  const val = event.target.value.trim();
  if (!val) {
    document.getElementById("js-compress-output").textContent = "";
    return;
  }
  const options = {
    compress: {
      // dead_code: true,
      // drop_console: true,
    },
    mangle: true,
    output: {
      comments: false,
    },
  };
  try {
    var result = await Terser.minify(val, options);
    document.getElementById("js-compress-output").textContent = result.code;
  } catch (error) {
    document.getElementById("js-compress-output").textContent = "";
  }
};

const scssCompress = document.getElementById("scss-compress");

scssCompress.oninput = async (event) => {
  const val = event.target.value.trim();
  if (!val) {
    document.getElementById("scss-compress-output").textContent = "";
    return;
  }
  Sass.compile(val, function (result) {
    if (result.status === 0) {
      document.getElementById("scss-compress-output").textContent = result.text;
    } else {
      document.getElementById("scss-compress-output").textContent = "Error";
    }
  });
};


const jsonCompress = document.getElementById("json-compress");

jsonCompress.oninput = async (event) => {
  const val = event.target.value.trim();
  if (!val) {
    document.getElementById("json-compress-output").textContent = "";
    return;
  }
  try {
    const jsonObj = JSON.parse(val);
    document.getElementById("json-compress-output").innerHTML = "";
    buildTree(jsonObj, document.getElementById("json-compress-output"), "root");
  } catch (e) {
    console.log('e', e)
    document.getElementById("json-compress-output").innerHTML =
      '<p style="color: red;">Invalid JSON</p>';
  }
};

function buildTree(obj, parentElement, key) {
  const item = document.createElement("div");
  parentElement.appendChild(item);
  if (typeof obj === "object" && obj !== null) {
    console.log(111)
    let typeString = Array.isArray(obj) ? "[]" : "{}";
    const keySpan = document.createElement("span");
    keySpan.className = "key collapsible";
    keySpan.innerHTML = `${key}<i class="typeString">${typeString}</i>: `;
    item.appendChild(keySpan);

    const childContainer = document.createElement("div");
    childContainer.className =
      "hidden " + (Array.isArray(obj) ? "array" : "object");
    item.appendChild(childContainer);

    for (const childKey in obj) {
      buildTree(obj[childKey], childContainer, childKey);
    }

    keySpan.onclick = function (event) {
      event.stopPropagation();
      const childDiv = this.parentElement.querySelector(".hidden");
      if (childDiv.style.display === "block") {
        childDiv.style.display = "none";
        this.classList.remove("collapsed");
      } else {
        childDiv.style.display = "block";
        this.classList.add("collapsed");
      }
    };
  } else {
    console.log(222)
    item.innerHTML =
      '<span class="key">' +
      key +
      ": </span>" +
      '<span class="' +
      getType(obj) +
      '">' +
      obj +
      "</span>";
  }
}

function getType(value) {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "object";
  return "unknown";
}

const doc = new Mergely("#compare", );
doc.once("updated", () => {
  doc.lhs("the quick red fox\njumped over the hairy dog");
  doc.rhs("the quick brown fox\njumped over the lazy dog");
  // Scroll to first change on next update
  doc.once("updated", () => {
    doc.scrollToDiff("next");
  });
});
