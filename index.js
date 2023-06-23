// global variables
const output = document.querySelector(".output");

const isNum = input => {
  if (Number(input)) {
    return true;
  }
  return false;
}

const isNotExceeding_10_digits = ()=> {
  let str = output.textContent;

  if (str.length < 13) {
    return true;
  }
  return false;
};

const checkInput = (input) => {
  if (!isNum(input)) return false;
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
  printToOutput(this.dataset.key);
  firstDigitIsNotZero();
}

function firstDigitIsNotZero(){
  outputText = output.textContent;
  const firstDigit = outputText.charAt(0);

  if (firstDigit === "0") {
    output.textContent = outputText.slice(1);
  }
}

function setOutputTextToZero(){
  output.textContent = "0";
}

document.querySelectorAll('button.number').forEach(btn => {
  btn.addEventListener('click', showNumbers)
});