const renderHtml = () => {
  const getBallData = localStorage.getItem("daletou");
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
        const splitSymbol = getBallList.includes('-') ? '-' : '+';
        const curBall = getBallList.split(splitSymbol);
        if (curBall?.length === 2) {
          const curBallRed = curBall[0].trim();
          const curBallBlue = curBall[1].trim();
          const redArrs = curBallRed.split(",");
          const blueArrs = curBallBlue.split(",");
          let redHtml = "";
          let blueHtml = "";
          if (redArrs?.length) {
            for (let j = 0; j < redArrs.length; j++) {
              const redArr = redArrs[j];
              redHtml += `<span class="isRed" data-id="${redArr}">${redArr}</span>`;
            }
          }
          if (blueArrs?.length) {
            for (let j = 0; j < blueArrs.length; j++) {
              const blueArr = blueArrs[j];
              blueHtml += `&nbsp;<span class="isBlue" data-id="${blueArr}">${blueArr}</span>`;
            }
          }
          liHtmls += `<li>${redHtml}${blueHtml}</li>`;
        }
      }
      ulDom.innerHTML = liHtmls;
    }
  }
};

const getCurDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (date < 10 ? '0' : '') + date;
  return formattedDate;
}

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
    `https://www.mxnzp.com/api/lottery/common/latest?code=cjdlt&app_id=mfop6rrgg6fvmngd&app_secret=N1BsK2hadVZHU2hQRDQvMmRtdXBPQT09`
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      if (res?.code === 1) {
        let openCode = res?.data?.openCode || "";
        const time = res?.data?.time || '';
        if (time) {
          const date = time.split(' ')[0];
          const curDate = getCurDate();
          if (date !== curDate) {
            M.toast({ html: '今天开奖，但是最新奖项还没有发布哦，耐心等待~~' })
            return;
          };
        }
        openCode = openCode.split("+");
        let openCodeRed = openCode[0].trim();
        openCodeRed = openCodeRed.split(",");
        const openCodeBlue = [
          parseInt(openCode[1].trim()),
          parseInt(openCode[2].trim()),
        ];
        for (let k = 0; k < openCodeRed.length; k++) {
          const redball = parseInt(openCodeRed[k].trim());
          const getAllRed = document.querySelectorAll(
            `.isRed[data-id="${redball}"]`
          );
          getAllRed.forEach((item) => {
            item.classList.add("isActive");
          });
        }
        for (let k = 0; k < openCodeBlue.length; k++) {
          const blueBall = openCodeBlue[k];
          const getAllBlue = document.querySelectorAll(
            `.isBlue[data-id="${blueBall}"]`
          );
          getAllBlue.forEach((item) => {
            item.classList.add("isActive");
          });
        }
      }
    });
};

if (getWeekData() == 1 || getWeekData() == 3 || getWeekData() == 6) {
  const { h, m } = getCurData();
  if ((h === 21 && m >= 35) || h > 21) {
    renderHtml();
    getLastestData();
  } else {
    M.toast({ html: '今天开奖，但是还没到时间哦~~' })
  }
} else {
  M.toast({ html: '今天不是开奖日~~' })
}
