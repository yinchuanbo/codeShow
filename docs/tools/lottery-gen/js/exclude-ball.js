M.AutoInit();

const ssqRefresh = document.querySelector(".ssqRefresh");

ssqRefresh.onclick = () => {
  location.reload();
};

const dltRefresh = document.querySelector(".dltRefresh");

// dltRefresh.onclick = () => {
//   location.reload();
// };

ssqExc.onclick = () => {
  const ssqTextarea = document.querySelector("#ssq__textarea");
  const ssqTextareaVal = (ssqTextarea.value || "").trim();
  if (!ssqTextareaVal?.length) {
    M.toast({ html: "请输入双色球号码！！" });
    return;
  }
  // 如何通过换行符分割字符串
  const ssqTextareaArr = ssqTextareaVal.split("\n");
  if (ssqTextareaArr?.length) {
    let redSet = new Set();
    let blueSet = new Set();
    const allRed = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    ];
    const allBlue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    for (let i = 0; i < ssqTextareaArr.length; i++) {
      const item = ssqTextareaArr[i];
      const splitSymbol = item.includes("-") ? "-" : "+";
      const ballArrs = item.split(splitSymbol);
      if (ballArrs?.length) {
        const redBall = ballArrs[0];
        const redBallArr = redBall.split(",");
        const blueBall = ballArrs[1];
        if (blueSet.size < 15) {
          blueSet.add(parseInt(blueBall));
        }
        for (let j = 0; j < redBallArr.length; j++) {
          const item = redBallArr[j];
          if (redSet.size < 27) {
            redSet.add(parseInt(item));
          }
        }
      }
    }
    const remainRed = [...allRed].filter((item) => !redSet.has(item));
    const remainBlue = [...allBlue].filter((item) => !blueSet.has(item));
    const result = `${remainRed.join(",")} - ${remainBlue.join(",")}`;
    document.querySelector("#inputBall").value = "";
    document.querySelector("#inputBall").value = result;
  }
};

// dltExc.onclick = () => {
//   const dltTextarea = document.querySelector("#dlt__textarea");
//   const dltTextareaVal = (dltTextarea.value || "").trim();
//   if (!dltTextareaVal?.length) {
//     M.toast({ html: "请输入大乐透号码！！" });
//     return;
//   }
//   // 如何通过换行符分割字符串
//   const dltTextareaArr = dltTextareaVal.split("\n");
//   if (dltTextareaArr?.length) {
//     let redSet = new Set();
//     let blueSet = new Set();
//     const allRed = [
//       1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//       22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
//     ];
//     const allBlue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//     for (let i = 0; i < dltTextareaArr.length; i++) {
//       const item = dltTextareaArr[i];
//       const splitSymbol = item.includes("-") ? "-" : "+";
//       const ballArrs = item.split(splitSymbol);
//       if (ballArrs?.length) {
//         const redBall = ballArrs[0];
//         const redBallArr = redBall.split(",");
//         const blueBall = ballArrs[1];
//         const blueBallArr = blueBall.split(",");
//         for (let j = 0; j < redBallArr.length; j++) {
//           const item = redBallArr[j];
//           if (redSet.size < 30) {
//             redSet.add(parseInt(item));
//           }
//         }
//         for (let j = 0; j < blueBallArr.length; j++) {
//           const item = blueBallArr[j];
//           if (blueSet.size < 10) {
//             blueSet.add(parseInt(item));
//           }
//         }
//       }
//     }
//     const remainRed = [...allRed].filter((item) => !redSet.has(item));
//     const remainBlue = [...allBlue].filter((item) => !blueSet.has(item));
//     const result = `${remainRed.join(",")} - ${remainBlue.join(",")}`;
//     document.querySelector("#inputBall").value = "";
//     document.querySelector("#inputBall").value = result;
//   }
// };

// 随机生成
function generateRandomNumbers(array, numOfSelections) {
  var randomNumbers = [];
  while (randomNumbers.length < numOfSelections) {
    var randomNumber = array[Math.floor(Math.random() * array.length)];
    if (randomNumbers.indexOf(randomNumber) === -1) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}

function generateBets(numOfBets, array, numOfSelections) {
  var bets = [];
  for (var i = 0; i < numOfBets; i++) {
    var randomNumbers = generateRandomNumbers(array, numOfSelections);
    bets.push(randomNumbers);
  }
  return bets;
}

function arrAsc(a, b) {
  a = Number(a);
  b = Number(b);
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

var elem = document.querySelector(".modal");
var instance = M.Modal.getInstance(elem);

createBall.onclick = () => {
  const inputBall = document.querySelector("#inputBall");
  const inputBallVal = (inputBall.value || "").trim();
  if (!inputBallVal?.length) {
    M.toast({ html: "请输入号码！！" });
    return;
  }
  const radioDom = document.querySelector(
    'input[type="radio"][name="caizhong"]:checked'
  );
  const radioDomVal = radioDom.value;
  const selectDom = document.querySelector("#selectNum");
  const selectDomVal = selectDom.value;
  const splitSymbol = inputBallVal.includes("-") ? "-" : "+";
  const ballArrs = inputBallVal.split(splitSymbol);
  if (ballArrs?.length === 2) {
    const redBall = ballArrs[0];
    let redBallArr = redBall.split(",");
    redBallArr = redBallArr.map((item) => parseInt(item));
    const blueBall = ballArrs[1];
    let blueBallArr = blueBall.split(",");
    blueBallArr = blueBallArr.map((item) => parseInt(item));
    let ssqArr = [],
      dltHtml = "";
    if (radioDomVal == 0) {
      let RedBets = generateBets(parseInt(selectDomVal), redBallArr, 6);
      let BlueBets = generateBets(parseInt(selectDomVal), blueBallArr, 1);
      for (let i = 0; i < RedBets.length; i++) {
        const item = RedBets[i].sort(arrAsc);
        console.log("item", item);
        item.push(BlueBets[i][0]);
        ssqArr.push(item);
      }
      createCanvas(ssqArr);
    } else if (radioDomVal == 1) {
      // 大乐透
      let RedBets = generateBets(parseInt(selectDomVal), redBallArr, 5);
      let BlueBets = generateBets(parseInt(selectDomVal), blueBallArr, 2);
      for (let i = 0; i < RedBets.length; i++) {
        const itemRed = RedBets[i].sort(arrAsc);
        const itemBlue = BlueBets[i].sort(arrAsc);
        dltHtml += `<p>${itemRed.join(",")} - ${itemBlue.join(",")}</p>`;
      }
      createCanvas(dltHtml);
      // let modalHtml = `<h4>大乐透号码</h4>${dltHtml}`;
      // modalContent.innerHTML = modalHtml;
      // instance.open()
    }
  } else {
    M.toast({ html: "输入的号码格式错误" });
  }
};

const createCanvas = (arr) => {
  console.log('ffff', arr)
  const conArr = convertArray(arr);
  const ssqLocal = localStorage.getItem('shuangseqiu');
  if (!ssqLocal) {
    localStorage.setItem('shuangseqiu', conArr);
  } else {
    localStorage.setItem('shuangseqiu', `${ssqLocal}\n${conArr}`);
  }
  var canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200;
  // document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var values = arr;
  var rows = values.length;
  var cols = values[0].length;
  var cellWidth = canvas.width / cols;
  var cellHeight = canvas.height / rows;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var value = values[i][j];
      var x = j * cellWidth;
      var y = i * cellHeight;
      if (j === cols - 1) {
        ctx.fillStyle = "#4477CE";
      } else {
        ctx.fillStyle = "#DB6B97";
      }
      ctx.fillRect(x, y, cellWidth, cellHeight);
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px hack";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value.toString(), x + cellWidth / 2, y + cellHeight / 2);
    }
  }
  var dataURL = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas_image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function convertArray(arr) {
  var result = "";
  for (var i = 0; i < arr.length; i++) {
    var row = arr[i];
    var rowString = row.slice(0, row.length - 1).join(", ");
    result += rowString + " - " + row[row.length - 1] + "\n";
  }
  return result.trim();
}

clearLocl.onclick = () => {
  localStorage.clear()
}