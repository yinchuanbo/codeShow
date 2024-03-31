const jsCompile = document.querySelector("#jsCompile");

jsCompile.onclick = async () => {
  const jsonInput = document.getElementById("jsonInput").value.trim();
  document.getElementById("jsonViewer").innerHTML = "";
  if (!jsonInput) {
    return;
  }
  Sass.compile(jsonInput, function (result) {
    if (result.status === 0) {
      document.getElementById("jsonViewer").textContent = result.text;
    } else {
      document.getElementById("jsonViewer").textContent = jsonInput;
    }
  });
};
