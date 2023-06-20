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

// function showNumbers(e){
//   console.log(e);
// }

// document.querySelectorAll('')