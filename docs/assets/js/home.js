const prevPage = document.querySelector("#prev__page");
const nextPage = document.querySelector("#next__page");
const lis = document.querySelectorAll(".home__list > li");
const seeAll = document.querySelector(".article__list span");
const lisLens = lis.length;
const needLens = 6;
let pageNum = 0;
let curNum = 0;
let seeStatus = false;

function calculateTotalPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

let pagesNum = calculateTotalPages(lisLens, needLens);

const changePage = () => {
  localStorage.setItem("curNum", curNum);
  if (curNum <= 0) {
    prevPage.style.display = "none";
    nextPage.style.display = "block";
  } else if (curNum >= pagesNum - 1) {
    prevPage.style.display = "block";
    nextPage.style.display = "none";
  } else {
    prevPage.style.display = "block";
    nextPage.style.display = "block";
  }
  for (let i = 0; i < lisLens; i++) {
    const element = lis[i];
    if (curNum * needLens <= i && i <= (curNum + 1) * needLens - 1) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
};

prevPage.onclick = () => {
  if (curNum <= 0) {
    curNum = 0;
  } else {
    curNum--;
  }
  changePage();
};

nextPage.onclick = () => {
  if (curNum >= pagesNum - 1) {
    curNum = pagesNum - 1;
  } else {
    curNum++;
  }
  changePage();
};

const initLiLists = () => {
  for (let i = 0; i < lisLens; i++) {
    const element = lis[i];
    if (i <= needLens - 1) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
};

const initPageChangeBtn = () => {
  curNum = Number(localStorage.getItem("curNum") ?? 0);
  changePage();
};

document.addEventListener("DOMContentLoaded", () => {
  initLiLists();
  initPageChangeBtn();
  seeAll.onclick = () => {
    seeStatus = !seeStatus;
    if (seeStatus) {
      // 查看所有
      for (let i = 0; i < lisLens; i++) {
        const element = lis[i];
        element.style.display = "block";
        prevPage.style.display = "none";
        nextPage.style.display = "none";
        seeAll.innerHTML = "查看分页文章";
      }
    } else {
      // 回收
      changePage();
      seeAll.innerHTML = "查看所有文章";
    }
  };
});
