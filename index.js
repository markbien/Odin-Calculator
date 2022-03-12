// variables
const input = document.querySelector('input[type="text"]');
const numbers = document.querySelectorAll(".button.num");
const operators = document.querySelectorAll(".button.operators");
const misc = document.querySelectorAll(".misc");
const total = document.querySelector(".total");
const answer = document.querySelector('.answer');
let first, second, operator;
const clearButton = document.querySelector(".clear");
// const del = document.querySelector(".del");

// function
function checkInput(val) {
  // return val.replace(/[^0-9]/g, "");
  return /[0-9\\.]/g.test(val);
}

// handles mouse clicks
function inputUsingMouse() {
  if (input.value.length < 15 && checkInput(this.textContent)) {
    input.value += this.textContent;
  }
}

// checks if dot is existing/if number is float
function checkIfFloat() {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
}

// handles keyboard inputs
// function inputUsingKeyboard(e) {
//   if (e.keyCode >= 48 && e.keyCode <= 57) {
//     if (input.value.length < 15) input.value += e.key;
//   } else if (e.keyCode === 8) {
//     deleteLastChar();
//   } else if (e.keyCode === 67) {
//     input.value = "";
//   } else if (e.keyCode === 190) {
//     checkIfFloat();
//   } else {
//     if (e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 191 || e.keyCode === 88) {
//         if (input.value != "") {
//             first = parseFloat(input.value);
//             input.value = "";
//             operator = e.key;
//           }
//     }

//     if(e.keyCode === 189) console.log("Hello");
//   }
//   console.log(e.keyCode);
// }

// delets last char from the calculator
function deleteLastChar() {
  input.value = input.value.slice(0, input.value.length - 1);
}

function miscFunctions() {
  if (this.textContent === ".") {
    checkIfFloat();
  } else if (this.textContent === "Del") {
    deleteLastChar();
  } else if (this.textContent === "Clear") {
    input.value = "";
  }
}

function getFirstNum() {
  if (input.value != "") {
    first = parseFloat(input.value);
    input.value = "";
    operator = this.textContent;
  }
}

function compute() {
  if (input.value != "") {
    second = parseFloat(input.value);
  }

  if (first && second) {
    let newVal;
    if (operator === "+") {
      newVal = first + second;
    } else if (operator === "-") {
      newVal = first - second;
    } else if (operator === "x") {
      newVal = first * second;
    } else {
      newVal = first / second;
    }
    input.value = "";
    answer.textContent = newVal;
  }
}

// event listeners
numbers.forEach((button) => button.addEventListener("click", inputUsingMouse));
misc.forEach((button) => button.addEventListener("click", miscFunctions));
// window.addEventListener("keydown", inputUsingKeyboard);
operators.forEach((operator) =>
  operator.addEventListener("click", getFirstNum)
);
total.addEventListener("click", compute);
clearButton.addEventListener("click", () => {
    input.value = "";
    answer.innerText = 0;
    first = undefined;
    second = undefined;
    operator = undefined;
});
// del.addEventListener("click", deleteLastChar);