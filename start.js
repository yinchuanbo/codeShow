const fs = require("fs");
const spawn = require("cross-spawn");
const folderPath = "./md";

fs.watch(folderPath, (eventType, filename) => {
  if (filename && filename.endsWith(".md") && eventType === "change") {
    console.log(`${filename} has been modified. Executing command...`);
    const child = spawn("node", ["app.js"], {
      stdio: "inherit",
    });

    child.on("error", (error) => {
      console.error(`Error executing command: ${error}`);
    });

    child.on("exit", (code) => {
      console.log(`Command exited with code ${code}`);
    });
  }
});
