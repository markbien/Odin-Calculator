// Global variables
const answerDisplay = document.querySelector(".answer");
const resultDisplay = document.querySelector(".result");
const numberButtons = document.querySelectorAll("button.number");
const operationButtons = document.querySelectorAll("button.operations");
const allClear = document.querySelector(".ac");
const invertButton = document.querySelector('.invert');
const percentButton = document.querySelector('.percent')

const calculator = {
  firstNum: undefined,
  currentOperation: undefined,
  add: function (x, y) {
    return x + y;
  },
  subtract: function (x, y) {
    return x - y;
  },
  multiply: function (x, y) {
    return x * y;
  },
  divide: function (x, y) {
    if (y === 0) {
      calculator.disableButtons();
      return "Cannot divide by zero";
    }
    return x / y;
  },
  compute: function (x, y) {
    switch (this.currentOperation) {
      case "+":
        return this.add(x, y);
      case "-":
        return this.subtract(x, y);
      case "*":
        return this.multiply(x, y);
      case "/":
        return this.divide(x, y);
      default:
        break;
    }
  },
  append: function (digit) {
    const answerDisplayCurrentText = answerDisplay.textContent;
    if (answerDisplayCurrentText.length === 15) return;
    if (answerDisplayCurrentText.includes(".") && digit === ".") return;

    let newText = answerDisplayCurrentText.concat(digit);
    if (newText.length > 1 && newText[0] === "0") {
      newText = newText.slice(1);
    }
    answerDisplay.textContent = newText;
  },
  backspace: function(){
    let str = answerDisplay.textContent;
    if (str.length > 1) answerDisplay.textContent = str.slice(0, -1);
    else answerDisplay.textContent = 0;
  },
  updateResultDisplay: function (answer) {
    if (answer.toString().includes('.')) {
      resultDisplay.textContent = answer.toFixed(2);
    }else {
      resultDisplay.textContent = answer;
    }    
  },
  clearDisplay: function () {
    answerDisplay.textContent = "0";
  },
  reset: function () {
    this.firstNum = undefined;
    this.currentOperation = undefined;
    resultDisplay.textContent = 0;
  },
  getValue: function () {
    return Number(answerDisplay.textContent);
  },
  disableButtons: function(){
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
      if (button.textContent !== 'AC') {
        button.disabled = true;
      }
    });
  },
  enableButtons: function(){
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
      if (button.textContent !== 'AC') {
        button.disabled = false;
      }
    });
  },
  equals: function(){
    if (this.firstNum && this.currentOperation) {
      this.firstNum = this.compute(
        this.firstNum,
        this.getValue()
      );
      this.updateResultDisplay(this.firstNum);
      this.disableButtons();
      this.clearDisplay();
    } else return;
  },
  operate: function(currentOperationClicked){
    if (!calculator.firstNum) {
      calculator.firstNum = calculator.getValue();
      calculator.currentOperation = currentOperationClicked;
    } else {
      calculator.firstNum = calculator.compute(
        calculator.firstNum,
        calculator.getValue()
      );
      calculator.currentOperation = currentOperationClicked;
      calculator.updateResultDisplay(calculator.firstNum);
    }
  },
  invert: function() {
    let currentNum = Number(answerDisplay.textContent);
    if (currentNum !== 0) {
      currentNum *= -1;
    }
    answerDisplay.textContent = currentNum;
  },
  percentage: function(){
    let currentNum = Number(answerDisplay.textContent);
    currentNum /= 100;
    answerDisplay.textContent = currentNum;
  },
};

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.append(button.textContent);
  });
});

allClear.addEventListener("click", function () {
  calculator.reset();
  calculator.clearDisplay();
  calculator.enableButtons();
});

operationButtons.forEach((button) =>
  button.addEventListener("click", function () {
    const currentOperationClicked = this.textContent;
    if (currentOperationClicked === "=") {
      calculator.equals();
    } else {
      calculator.operate(currentOperationClicked);
    }
    calculator.clearDisplay();
  })
);

invertButton.addEventListener('click', function(){
  calculator.invert();
});

percentButton.addEventListener("click", function(){
  calculator.percentage();
});


let shiftIsPressed = false; // If shift is pressed
window.addEventListener('keydown', function(e){  
  const buttonCode = e.code; // Gets the 'word' for the current button
  const currentNum = document.querySelector(`button[data-key=${buttonCode}]`); // gets the current num pressed

  if ((buttonCode === 'Equal' || buttonCode === 'Enter') && !shiftIsPressed) {
    calculator.equals(); // Run this when = or Enter is pressed AND shiftIsPressed is false
  } 
  
  if (buttonCode === 'Backspace') {
    calculator.backspace();
  }

  if (buttonCode === 'ShiftLeft' || buttonCode === 'ShiftRight'){
    shiftIsPressed = true;
  }

  const operations = ['+','-','*','/']
  if (shiftIsPressed === true) {
    const isValidOperation = operations.find(operation => {
      return operation === e.key;
    });

    if (isValidOperation) {
      calculator.operate(isValidOperation);
      calculator.clearDisplay();
    }
  }

  if (buttonCode === "Minus" || buttonCode === 'Slash') {
    calculator.operate(e.key);
    calculator.clearDisplay();
  }

  if (buttonCode === 'KeyC') {
    calculator.reset();
    calculator.clearDisplay();
    calculator.enableButtons();
  }
  
  if (!currentNum) return;
  if (shiftIsPressed === false) calculator.append(currentNum.textContent);
});

window.addEventListener('keyup', function(e){
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftIsPressed = false;
  }  
});