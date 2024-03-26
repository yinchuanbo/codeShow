const fs = require("fs");
const { spawn } = require("child_process");
const { exec } = require("child_process");

const mdFolder = "./md";
const appScript = "app.js";
const docsFolder = "./docs";

fs.watch(mdFolder, (eventType, filename) => {
  if (filename && filename.endsWith(".md")) {
    console.log(`File ${filename} has been ${eventType}`);
    const appProcess = spawn("node", [appScript]);
    appProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    appProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    appProcess.on("close", (code) => {
      console.log(`app.js process exited with code ${code}`);
    });
  }
  // if (eventType === 'rename' && filename && filename.endsWith('.md')) {
  //   const htmlFilename = filename.replace('.md', '.html');
  //   const htmlFilePath = `${docsFolder}/${htmlFilename}`;
  //   try {
  //     fs.unlinkSync(htmlFilePath);
  //     console.log(`Deleted ${htmlFilePath}`);
  //   } catch (error) {
  //     console.error(`Error deleting ${htmlFilePath}:`, error);
  //   }
  // }
});

try {
  exec("node doc.js")
  console.log("Server listening on port 5656")
} catch (error) {
  console.log(error)
}
