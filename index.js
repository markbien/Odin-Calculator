// global variables
const output = document.querySelector(".output");
let firstNum = 0,
  secondNum = 0;
let currentOperation = "";

// functions
const isNotExceeding_n_digits = (limit) => {
  let str = output.textContent;

  if (str.length < limit) {
    return true;
  }
  return false;
};

function dotExists(currentNumClicked) {
  const outputText = output.textContent;
  if (outputText.includes(".") && currentNumClicked === '.') {
    return true;
  }
  return false;
}

function firstDigitIsNotZero() {
  const outputText = output.textContent;
  const firstDigit = outputText.charAt(0);

  if (outputText.length > 1) {
    if (firstDigit === "0") {
      output.textContent = outputText.slice(1);
    }
  }
}

const isInputAccepted = input => {  
  if (!isNotExceeding_n_digits(13)) return false;
  if (dotExists(input)) return false;
  return true;
};

const printToOutput = (input) => {
  if (isInputAccepted(input)) {
    let currentOutput = output.textContent;
    currentOutput += `${input}`;
    output.textContent = currentOutput;
  }
};

function showNumbers() {
  const currentNumClicked = this.dataset.key;
  printToOutput(currentNumClicked);
  firstDigitIsNotZero();
}


function setOutputTextToZero() {
  output.textContent = "0";
}

function reset() {
  firstNum = 0;
  secondNum = 0;
  currentOperation = "";
}

document.querySelectorAll("button.number").forEach((btn) => {
  btn.addEventListener("click", showNumbers);
});

const ac = document.querySelector("button[data-key='ac']");
ac.addEventListener("click", function () {
  setOutputTextToZero();
  reset();
});



// function operate(a, b, operation) {
//   let total = 0;
//   a = Number(a);
//   b = Number(b);
//   switch (operation) {
//     case "+":
//       total = a + b;
//       break;
//     case "-":
//       total = a - b;
//       break;
//     case "*":
//       total = a * b;
//       break;
//     case "/":
//       if (b === 0) {
//         return "You can't divide by 0!";
//       }
//       total = a / b;
//       break;
//   }
//   return total;
// }

// function setOperation(){
//   currentOperation = this.textContent;
//   firstNum = output.textContent;
//   setOutputTextToZero();
// }

// function getTotal(){
//   secondNum = output.textContent;
//   output.textContent = operate(firstNum, secondNum, currentOperation);
// }

// const operations = document.querySelectorAll('.operations');
// operations.forEach(button => {
//   button.addEventListener('click', setOperation);
// });

// const totalButton = document.querySelector('.total');
// totalButton.addEventListener('click', getTotal);