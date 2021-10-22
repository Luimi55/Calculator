let runningTotal = 0;
let buffer = "0";
let previousOperator;
const button = document.querySelector(".buttons");
const screen = document.querySelector(".screen");

//IF DECIDES WHAT TO DO WETHER THE CLICK BUTTON IS A NUMBER OR AN OPERATION
const buttonClick = (value) => {
  isNaN(parseInt(value)) ? manageSymbol(value) : manageNumber(value);
  reload();
};

//EXECUTES ARITHMETIC OPERATION
const doOperation = (intBuffer) => {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
};

//HANDLES WHAT TO DO WHEN CLICKED BUTTON AN ARITHMETIC OPERATION
const handleMath = (value) => {
  const intBuffer = parseInt(buffer);
  runningTotal === 0 ? (runningTotal = intBuffer) : doOperation(intBuffer);
  previousOperator = value;
  buffer = "0";
};

//HANDLES ACTIONS FOR CLICKED OPERATION BUTTONS
const manageSymbol = (value) => {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        let length = buffer.length;
        buffer = buffer.substr(0, length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      doOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "÷":
    case "×":
    case "-":
    case "+":
      handleMath(value);
      break;
  }
};

//SETS NUMBER BUFFER
const manageNumber = (value) => {
  screen.innerText === "0" ? (buffer = value) : (buffer += value);
};

//SETS SCREEN TEXT WITH THE UPDATED BUFFER
const reload = () => {
  screen.innerText = buffer;
};

//SETS CLICK EVENT LISTENER TO ALL BUTTONS AND EXECUTES HANDLER FUNCTION
button.addEventListener("click", (e) => {
  buttonClick(e.target.innerText);
});
