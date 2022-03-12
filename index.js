// variables
const input = document.querySelector('input[type="text"]');
const numbers = document.querySelectorAll(".button.num");
const operators = document.querySelectorAll('.button.operators');
let first = 0, second = 0;
// const clearButton = document.querySelector(".clear");
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
function checkIfFloat(){
    if(!input.value.includes('.')){
        input.value += ".";
    }
}

// handles keyboard inputs
function inputUsingKeyboard(e) {
  if(e.keyCode >= 48 && e.keyCode <= 57){
      input.value += e.key;
  }
  else if(e.keyCode === 8){
    deleteLastChar();
  } else if(e.keyCode === 67){
    input.value = "";
  } else if(e.keyCode === 190){
    checkIfFloat();
  }
  console.log(e.keyCode);
}

// delets last char from the calculator
function deleteLastChar(){
    input.value = input.value.slice(0, input.value.length - 1);
}

function compute(){
    
}

// event listeners
numbers.forEach(button => button.addEventListener("click", inputUsingMouse));
operators.forEach(button => button.addEventListener('click', compute));
window.addEventListener("keydown", inputUsingKeyboard);
// clearButton.addEventListener("click", () => (input.value = ""));
// del.addEventListener("click", deleteLastChar);

