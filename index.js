// Global variables
const answerDisplay = document.querySelector(".answer");
const resultDisplay = document.querySelector(".result");
const numberButtons = document.querySelectorAll("button.number");
const operationButtons = document.querySelectorAll("button.operations");
const allClear = document.querySelector(".ac");

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
  }
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
      if (calculator.firstNum && calculator.currentOperation) {
        calculator.firstNum = calculator.compute(
          calculator.firstNum,
          calculator.getValue()
        );
        calculator.updateResultDisplay(calculator.firstNum);
        calculator.disableButtons();
      } else return;
    } else {
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
    }
    calculator.clearDisplay();
  })
);
