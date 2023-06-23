// global variables
const output = document.querySelector(".output");
let firstNum = 0, 
    secondNum = 0;


// functions
const isNotExceeding_10_digits = ()=> {
  let str = output.textContent;

  if (str.length < 13) {
    return true;
  }
  return false;
};

const checkInput = (input) => {
  if (!isNotExceeding_10_digits()) return false
  return true;
};

const printToOutput = (input) => {
  if (checkInput(input)) {
    let currentOutput = output.textContent;
    currentOutput += `${input}`;
    output.textContent = currentOutput;
  }
};

function showNumbers(){
  const currentNum = this.dataset.key;
  if (dotExists() && currentNum === '.') return;
  printToOutput(currentNum);
  firstDigitIsNotZero();
}

function firstDigitIsNotZero(){
  const outputText = output.textContent;
  const firstDigit = outputText.charAt(0);

  if (outputText.length > 1){
    if (firstDigit === "0") {
      output.textContent = outputText.slice(1);
    }    
  }
}

function setOutputTextToZero(){
  output.textContent = "0";
}

document.querySelectorAll('button.number').forEach(btn => {
  btn.addEventListener('click', showNumbers)
});

const ac = document.querySelector("button[data-key='ac']");
ac.addEventListener('click', setOutputTextToZero);

function dotExists(){
  const outputText = output.textContent;
  if (!outputText.includes('.')) {
    return false;
  }
  return true;
}