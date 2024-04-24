const imgs = document.querySelectorAll("img");

const htmlFun = (src = "") => {
  return `
    <div class="img__preview">
      <img src="${src}" />
      <span id="imgClose">X</span>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  imgs.forEach((ele) => {
    ele.onclick = () => {
      let imgPreview = document.querySelector(".img__preview");
      if (imgPreview) imgPreview.remove();
      document.body.insertAdjacentHTML("beforeend", htmlFun(ele.src));
      const imgClose = document.getElementById("imgClose");
      imgClose.onclick = () => {
        imgPreview = document.querySelector(".img__preview");
        imgPreview.remove();
      }
    };
  });
});
