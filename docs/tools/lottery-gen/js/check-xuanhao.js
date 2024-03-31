let selectDomVal = 10;

clearTextarea.onclick = () => {
  const result = document.getElementById('result')
  result.value = ''
  result.focus()
}

create.onclick = () => {
  const radioDomVal = 0; // 0 shuangseiqu, 1 大乐透
  const numDom = document.querySelector("#randomNumber");
  let numDomVal = Number(numDom.value || 1);
  let tickets = "";

  if (radioDomVal == 0) {
    tickets = generateLotteryNumbers(numDomVal);
  } else if (radioDomVal == 1) {
    tickets = generateLottoNumbersDLT(numDomVal);
  }
  result.value = tickets;
};
// 双色球
function generateLotteryNumbers(numberOfTickets) {
  const tickets = [];
  while (tickets.length < numberOfTickets) {
    const redBalls = new Set();
    // Generate unique red balls
    while (redBalls.size < 6) {
      const number = Math.floor(Math.random() * 33) + 1;
      redBalls.add(number);
    }
    const blueBall = Math.floor(Math.random() * 16) + 1;
    const ticket = {
      redBalls: Array.from(redBalls).sort((a, b) => a - b),
      blueBall: blueBall,
    };
    // Check if the ticket is unique
    if (
      !tickets.some((existingTicket) => isSameTicket(existingTicket, ticket))
    ) {
      tickets.push(ticket);
    }
  }
  return formatLotteryNumbers(tickets);
}
function formatLotteryNumbers(tickets) {
  return tickets
    .map((ticket) => {
      const redBalls = ticket.redBalls.join(",");
      const blueBall = ticket.blueBall;
      return `${redBalls} - ${blueBall}`;
    })
    .join("\n");
}
function isSameTicket(ticket1, ticket2) {
  const sameRedBalls = ticket1.redBalls.every((ball) =>
    ticket2.redBalls.includes(ball)
  );
  const sameBlueBall = ticket1.blueBall === ticket2.blueBall;
  return sameRedBalls && sameBlueBall;
}

function generateLottoNumbersDLT(numberOfTickets) {
  const tickets = [];
  while (tickets.length < numberOfTickets) {
    const redBalls = new Set();
    // Generate unique red balls
    while (redBalls.size < 5) {
      const number = Math.floor(Math.random() * 35) + 1;
      redBalls.add(number);
    }
    const blueBalls = new Set();
    // Generate unique blue balls
    while (blueBalls.size < 2) {
      const number = Math.floor(Math.random() * 12) + 1;
      blueBalls.add(number);
    }
    const ticket = {
      redBalls: Array.from(redBalls).sort((a, b) => a - b),
      blueBalls: Array.from(blueBalls).sort((a, b) => a - b),
    };
    // Check if the ticket is unique
    if (
      !tickets.some((existingTicket) => isSameTicketDLT(existingTicket, ticket))
    ) {
      tickets.push(ticket);
    }
  }
  return formatLottoNumbersDLT(tickets);
}
// Format the "大乐透" (Lotto) lottery numbers in the desired format
function formatLottoNumbersDLT(tickets) {
  return tickets
    .map((ticket) => {
      const redBalls = ticket.redBalls.join(",");
      const blueBalls = ticket.blueBalls.join(",");
      return `${redBalls} - ${blueBalls}`;
    })
    .join("\n");
}

function isSameTicketDLT(ticket1, ticket2) {
  const sameRedBalls = ticket1.redBalls.every((ball) =>
    ticket2.redBalls.includes(ball)
  );
  const sameBlueBalls = ticket1.blueBalls.every((ball) =>
    ticket2.blueBalls.includes(ball)
  );
  return sameRedBalls && sameBlueBalls;
}

function copyTextareaValue() {
  const textarea = document.getElementById("result");
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  M.toast({ html: "复制成功" });
}

ssqExc.onclick = () => {
  const ssqTextarea = document.querySelector("#result");
  const ssqTextareaVal = (ssqTextarea.value || "").trim();
  if (!ssqTextareaVal?.length) {
    M.toast({ html: "Please input the number!!" });
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
    createBall(result);
  }
};

function createBall(inputBallVal) {
  const radioDomVal = 0;
  const value = document.querySelector('#createNumber').value
  selectDomVal = Number(value || 1);
  // const selectDomVal = 5;
  const splitSymbol = inputBallVal.includes("-") ? "-" : "+";
  const ballArrs = inputBallVal.split(splitSymbol);
  if (ballArrs?.length === 2) {
    const redBall = ballArrs[0];
    let redBallArr = redBall.split(",");
    redBallArr = redBallArr.map((item) => parseInt(item));
    const blueBall = ballArrs[1];
    let blueBallArr = blueBall.split(",");
    blueBallArr = blueBallArr.map((item) => parseInt(item));
    let ssqArr = [];
    if (radioDomVal == 0) {
      let RedBets = generateBets(parseInt(selectDomVal), redBallArr, 6);
      let BlueBets = generateBets(parseInt(selectDomVal), blueBallArr, 1);
      for (let i = 0; i < RedBets.length; i++) {
        const item = RedBets[i].sort(arrAsc);
        item.push(BlueBets[i][0]);
        ssqArr.push(item);
      }
      createCanvas(ssqArr);
    }
  }
}

const createCanvas = (arr) => {
  const conArr = convertArray(arr);
  const ssqLocal = localStorage.getItem("shuangseqiu");
  if (!ssqLocal) {
    localStorage.setItem("shuangseqiu", conArr);
  } else {
    localStorage.setItem("shuangseqiu", `${ssqLocal}\n${conArr}`);
  }
  var canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200 * (selectDomVal / 5);
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
        ctx.fillStyle = "#1d267d";
      } else {
        ctx.fillStyle = "#d21312";
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

function convertArray(arr) {
  var result = "";
  for (var i = 0; i < arr.length; i++) {
    var row = arr[i];
    var rowString = row.slice(0, row.length - 1).join(", ");
    result += rowString + " - " + row[row.length - 1] + "\n";
  }
  return result.trim();
}
