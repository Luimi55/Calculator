let runningTotal = 0;
let buffer = "0";
let previousOperator;
const button = document.querySelector(".buttons");
const screen = document.querySelector(".screen");

const buttonClick = (value) => {
    isNaN(parseInt(value)) ? manageSymbol(value) : manageNumber(value);
    reload();
}

const doOperation = (intBuffer) => {
    switch(previousOperator){
        case "+": runningTotal+=intBuffer; break;
        case "-": runningTotal-=intBuffer; break;
        case "×": runningTotal*=intBuffer; break;
        case "÷": runningTotal/=intBuffer; break;
    }
}

const handleMath = (value) => {
    const intBuffer = parseInt(buffer);
    runningTotal === 0 ? runningTotal = intBuffer : doOperation(intBuffer);
    previousOperator = value;
    buffer = "0";
}

const manageSymbol = (value) => {
    switch(value){
        case "C": buffer = "0"; runningTotal = 0; break;
        case "←": 
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                let length = buffer.length;
                buffer = buffer.substr(0, length-1);
            }
            break;
        case "=": 
            if(previousOperator === null){
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
        case "+": handleMath(value); break;
    }
}

const manageNumber = (value) => {
    screen.innerText === "0" ? buffer = value : buffer += value;
}

const reload = () =>{
    screen.innerText = buffer;
}

button.addEventListener('click', (e) => {
    buttonClick(e.target.innerText)
});