const num = 10;

let allLiNumsLens = null,
  allPagesNum = null,
  _idx = 0;

const leftBtn = document.querySelector(".home_navs_left");
const rightBtn = document.querySelector(".home_navs_right");

const imgs = document.querySelectorAll("img");

document.addEventListener("DOMContentLoaded", () => {
  const allLiNums = document.querySelectorAll(".articles__list>li");
  allLiNumsLens = allLiNums.length;
  allPagesNum = Math.ceil(allLiNumsLens / num);
  function handleShow(idx) {
    if (idx !== 0) {
      leftBtn.classList.remove("disabled");
    } else {
      leftBtn.classList.add("disabled");
    }
    if (idx !== allPagesNum - 1) {
      rightBtn.classList.remove("disabled");
    } else {
      rightBtn.classList.add("disabled");
    }

    for (let i = 0; i < allLiNumsLens; i++) {
      const element = allLiNums[i];
      if (idx * num <= i && i <= (idx + 1) * num - 1) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  }

  leftBtn.onclick = function () {
    if (_idx <= 0) {
      _idx = 0;
    }
    _idx--;
    handleShow(_idx);
  };

  rightBtn.onclick = function () {
    if (_idx >= allPagesNum - 1) {
      _idx = allPagesNum - 1;
    }
    _idx++;
    handleShow(_idx);
  };
});
