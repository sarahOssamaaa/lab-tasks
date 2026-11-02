let currentInput = "0";
let previousInput = "";
let operator = null;
let resetScreen = false;

const display = document.getElementById("display");
const clearBtn = document.getElementById("clearBtn");

function updateDisplay() {
  display.textContent = currentInput;
  clearBtn.textContent = currentInput !== "0" || previousInput !== "" ? "C" : "AC";
}

function appendDigit(digit) {
  if (currentInput === "0" || resetScreen) {
    currentInput = digit;
    resetScreen = false;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

function appendDecimal() {
  if (resetScreen) {
    currentInput = "0.";
    resetScreen = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator !== null && !resetScreen) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  resetScreen = true;
}

function calculate() {
  if (operator === null || resetScreen) return;

  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  resetScreen = true;
  updateDisplay();
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  resetScreen = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== "0" && currentInput !== "Error") {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

function percentage() {
  if (currentInput !== "Error") {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }
}