const fs = require('fs');
const { spawn } = require('child_process');
const { exec } = require('child_process');

const mdFolder = './md';
const appScript = 'app.js';

exec('node doc.js');

fs.watch(mdFolder, (eventType, filename) => {
  if (filename && filename.endsWith('.md')) {
    console.log(`File ${filename} has been ${eventType}`);
    const appProcess = spawn('node', [appScript]);
    appProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    appProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    appProcess.on('close', (code) => {
      console.log(`app.js process exited with code ${code}`);
    });
  }
});
