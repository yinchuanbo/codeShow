const jsCompile = document.querySelector("#jsCompile");

jsCompile.onclick = async () => {
  const jsonInput = document.getElementById("jsonInput").value.trim();
  document.getElementById("jsonViewer").innerHTML = "";
  if (!jsonInput) {
    return;
  }
  let res;
  //去除注释
  res = jsonInput.replace(/\/\*((.|\n|\t)*?)\*\//g, "");
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
  document.getElementById("jsonViewer").textContent = res;
};
