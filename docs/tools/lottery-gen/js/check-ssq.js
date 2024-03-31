const renderHtml = () => {
  const getBallData = localStorage.getItem("shuangseqiu");
  if (!getBallData) {
    M.toast({ html: "Please input the number!!" });
    return;
  }
  const boxDom = document.createElement("div");
  boxDom.id = "box";
  const ulDom = document.createElement("ul");
  ulDom.id = "boxUl";
  boxDom.append(ulDom);
  document.body.append(boxDom);
  if (getBallData) {
    const getBallLists = getBallData.split("\n");
    if (getBallLists?.length) {
      let liHtmls = "";
      for (let i = 0; i < getBallLists.length; i++) {
        const getBallList = getBallLists[i].trim();
        const splitSymbol = getBallList.includes("-") ? "-" : "+";
        const curBall = getBallList.split(splitSymbol);
        if (curBall?.length === 2) {
          const curBallRed = (curBall[0] + '').trim();
          const curBallBlue = curBall[1].trim();
          const redArrs = curBallRed.split(",");
          let redHtml = "";
          let blueHtml = `<span class="isBlue" data-id="${curBallBlue}">${curBallBlue}</span>`;
          if (redArrs?.length) {
            for (let j = 0; j < redArrs.length; j++) {
              const redArr = (redArrs[j] + '').trim();
              redHtml += `<span class="isRed" data-id="${redArr}">${redArr}</span>`;
            }
          }
          liHtmls += `<li>${redHtml}${blueHtml}</li>`;
        }
      }
      ulDom.innerHTML = liHtmls;
      setTimeout(() => {
        getLastestData();
      }, 100)
    }
  }
};

const getCurDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (date < 10 ? "0" : "") +
    date;
  return formattedDate;
};

const getCurData = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  return {
    h,
    m,
    s,
  };
};

const getWeekData = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const days = ["7", "1", "2", "3", "4", "5", "6"];
  const todaysDay = days[dayOfWeek];
  return todaysDay;
};

// 通过接口获取中奖号码
const getLastestData = () => {
  fetch(
    `https://www.mxnzp.com/api/lottery/common/latest?code=ssq&app_id=mfop6rrgg6fvmngd&app_secret=N1BsK2hadVZHU2hQRDQvMmRtdXBPQT09`
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      if (res?.code === 1) {
        let openCode = res?.data?.openCode || "";
        const time = res?.data?.time || "";
        const expect = res?.data?.expect || "";
        if (time) {
          const boxDom = document.querySelector('#box');
          const expectDom = document.createElement('div');
          expectDom.className = 'tags';
          expectDom.innerText = time
          boxDom.appendChild(expectDom)
        }
        openCode = openCode.split("+");
        let openCodeRed = openCode[0].trim();
        openCodeRed = openCodeRed.split(",");
        const openCodeBlue = parseInt(openCode[1].trim());
        for (let k = 0; k < openCodeRed.length; k++) {
          const redball = parseInt(openCodeRed[k].trim());
          const getAllRed = document.querySelectorAll(
            `.isRed[data-id="${redball}"]`
          );
          getAllRed.forEach((item) => {
            item.classList.add("isActive");
          });
        }
        const getAllBlue = document.querySelectorAll(
          `.isBlue[data-id="${openCodeBlue}"]`
        );
        getAllBlue.forEach((item) => {
          item.classList.add("isActive");
        });
      }
    });
};

renderHtml();

// if (getWeekData() == 2 || getWeekData() == 4 || getWeekData() == 7) {
//   const { h, m } = getCurData();
//   if ((h === 21 && m >= 35) || h > 21) {
//     renderHtml();
//     getLastestData();
//   } else {
//
//   }
// } else {
//   M.toast({ html: '今天不是开奖日~~' })
// }
