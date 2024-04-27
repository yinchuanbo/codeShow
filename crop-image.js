const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputImagePath = "./docs/assets/images/cover";

const aspectRatio = 1;

fs.readdir(inputImagePath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }
  const imgFiles = files.filter((file) => {
    const extname = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif"].includes(extname);
  });
  imgFiles.forEach((file) => {
    cropImages(`${inputImagePath}/${file}`, file);
  });
});

function cropImages(imgP, name) {
  sharp(imgP)
    .metadata()
    .then((metadata) => {
      const originalWidth = metadata.width;
      const originalHeight = metadata.height;
      let newWidth, newHeight;
      if (originalWidth / originalHeight > aspectRatio) {
        newWidth = Math.ceil(originalHeight * aspectRatio);
        newHeight = originalHeight;
      } else {
        newWidth = originalWidth;
        newHeight = Math.ceil(originalWidth / aspectRatio);
      }
      const tempPath = path.join(path.dirname(imgP), `temp_${name}`);
      return sharp(imgP)
        .resize({ width: newWidth, height: newHeight, fit: "cover" })
        .toFile(tempPath)
        .then(() => {
          fs.rename(tempPath, imgP, (err) => {
            if (err) {
              console.error("Error moving file:", err);
            } else {
              console.log("Image cropped and saved successfully:", imgP);
            }
          });
        });
    })
    .catch((err) => console.error("Error cropping image:", err));
}
