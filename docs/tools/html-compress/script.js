const jsCompile = document.querySelector("#jsCompile");

jsCompile.onclick = async () => {
  const jsonInput = document.getElementById("jsonInput").value.trim();
  document.getElementById("jsonViewer").innerHTML = "";
  if (!jsonInput) {
    return;
  }
  let res;
  var rep = /\n+/g;
  var repone = /<!--.*?-->/gi;
  var reptwo = /\/\*.*?\*\//gi;
  var reptree = /[ ]+</gi;
  var sourceZero = jsonInput.replace(rep, "");
  var sourceOne = sourceZero.replace(repone, "");
  var sourceTwo = sourceOne.replace(reptwo, "");
  var sourceTree = sourceTwo.replace(reptree, "<");
  document.getElementById("jsonViewer").textContent = sourceTree;
};
