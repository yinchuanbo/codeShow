const jsCompile = document.querySelector("#jsCompile");

jsCompile.onclick = async () => {
  const jsonInput = document.getElementById("jsonInput").value.trim();
  document.getElementById("jsonViewer").innerHTML = "";
  if (!jsonInput) {
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
    var result = await Terser.minify(jsonInput, options);
    document.getElementById("jsonViewer").textContent = result.code;
  } catch (error) {
    alert("存在压缩错误，请检查代码");
  }
};
