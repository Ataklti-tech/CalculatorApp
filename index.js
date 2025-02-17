// Selecting all the necessary elements
// Selecting all the numbers
const numberButtons = document.querySelectorAll(".number-btn");

// Selecting all the operators
const operatorButtons = document.querySelectorAll(".operator-btn");

// Selecting the delete button
const deleteButton = document.querySelector(".delete-btn");

// Selecting the reset button
const resetButton = document.querySelector("#reset");

// Selecting the equals button
const equalizeButton = document.querySelector("#equal");

// Selecting the decimal button
const decimalButton = document.querySelector(".decimal-btn");

// Selecting the display input box using a class
const displayBox = document.querySelector(".display");

// testing the buttons listener
numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(button.textContent);
    displayBox.value += button.textContent;
  });
});

// input elements do not have ".textContent" property instead use ".value"

// Let us implement the listening and display of the other calculator components
// Operators
operatorButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    displayBox.value += button.textContent;
  });
});

// decimal point
decimalButton.addEventListener("click", function (e) {
  e.preventDefault();
  displayBox.value += decimalButton.textContent;
});
// reset button
resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  displayBox.value = " ";
});

// delete button
deleteButton.addEventListener("click", function (e) {
  e.preventDefault();
  // displayBox.value  -= displayBox.textContent; -- mistake
  displayBox.value = displayBox.value.slice(0, -1); // Remove the last character
});

// Selecting the elements of theme changer / theme switch
const toggle_check = document.querySelector(".toggle_checkbox");
const toggle_switch = document.querySelector(".toggle_switch");

// Selecting the body
const bodyElement = document.body;

function parseExpression(expression) {
  const numbers = expression.match(/\d+(\.\d+)?/g);
  const operators = expression.match(/[+\-*/x]/g);

  // Validate the expression
  if (!numbers || !operators || numbers.length !== operators.length + 1) {
    throw new Error("Invalid expression");
  }

  // Convert numbers to floats
  const numArray = numbers.map((num) => parseFloat(num));

  // Replace 'x' with '*' for multiplication
  const operatorArray = operators.map((op) => (op === "x" ? "*" : op));

  // Use a stack to evaluate *, / first
  let stack = [numArray[0]];

  for (let i = 0; i < operatorArray.length; i++) {
    const operator = operatorArray[i];
    const nextNum = numArray[i + 1];

    if (operator === "*") {
      stack[stack.length - 1] *= nextNum; // Multiply last number in stack
    } else if (operator === "/") {
      if (nextNum === 0) throw new Error("Division by zero");
      stack[stack.length - 1] /= nextNum; // Divide last number in stack
    } else {
      stack.push(operator, nextNum); // Push +, - operators to handle later
    }
  }

  // Calculate based on operator precedence
  let result = stack[0];

  // new for loop for calculation
  for (let i = 1; i < stack.length; i += 2) {
    const operator = stack[i];
    const nextNum = stack[i + 1];

    if (operator === "+") result += nextNum;
    else if (operator === "-") result -= nextNum;
  }

  return result;
}

// Example usage in an event listener
equalizeButton.addEventListener("click", function (e) {
  e.preventDefault();

  try {
    const expression = displayBox.value; // Get the input expression
    const result = parseExpression(expression); // Evaluate the expression
    displayBox.value = result; // Display the result
  } catch (error) {
    displayBox.value = "Error!"; // Handle invalid expressions
    console.error(error.message);
  }
});

// Add keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "x"].includes(key)) {
    displayBox.value += key === "x" ? "*" : key; // Replace 'x' with '*'
  } else if (key === "Enter") {
    equalizeButton.click(); // Trigger equals button
  } else if (key === "Backspace") {
    deleteButton.click(); // Trigger delete button
  }
});

const row_3 = document.querySelector(".row_3");

// Toggling switch
let position = 0; // 0 = left, 1 = middle, 2 = right

// Set initial background color
bodyElement.style.backgroundColor = "hsl(222, 26%, 31%)";

// Creating functions for the three themes

function applyThemeOne() {
  toggle_switch.classList.add("left");
  toggle_switch.classList.remove("middle", "right");

  bodyElement.style.backgroundColor = "hsl(222, 26%, 31%)";
  displayBox.style.backgroundColor = "hsl(224, 36%, 15%)";
  row_3.style.backgroundColor = "hsl(223, 31%, 20%)";
  displayBox.style.color = "#fff";

  numberButtons.forEach((button) => {
    button.style.backgroundColor = "hsl(30, 25%, 89%)";
    button.style.color = "hsl(60, 10%, 19%)";
  });

  deleteButton.style.backgroundColor = "hsl(223, 20%, 53%)";
  resetButton.style.backgroundColor = "hsl(223, 20%, 53%)";
}

// Function to apply Theme 2 (Light Theme)
function applyThemeTwo() {
  toggle_switch.classList.add("middle");
  toggle_switch.classList.remove("left", "right");

  bodyElement.style.backgroundColor = "hsl(0, 0%, 90%)";
  displayBox.style.backgroundColor = "hsl(0, 0%, 93%)";
  row_3.style.backgroundColor = "hsl(0, 5%, 81%)";
  displayBox.style.color = "#000";

  numberButtons.forEach((button) => {
    button.style.backgroundColor = "hsl(30, 25%, 89%)";
    button.style.color = "hsl(60, 10%, 19%)";
  });

  deleteButton.style.backgroundColor = "hsl(185, 42%, 37%)";
  resetButton.style.backgroundColor = "hsl(185, 42%, 37%)";
}

// Function to apply Theme 3 (Purple Theme)
function applyThemeThree() {
  toggle_switch.classList.add("right");
  toggle_switch.classList.remove("left", "middle");

  bodyElement.style.backgroundColor = "hsl(268, 75%, 9%)";
  displayBox.style.backgroundColor = "hsl(268, 71%, 12%)";
  row_3.style.backgroundColor = "hsl(268, 71%, 12%)";
  displayBox.style.color = "#fff";

  numberButtons.forEach((button) => {
    button.style.backgroundColor = "hsl(268, 47%, 21%)";
    button.style.color = "hsl(52, 100%, 62%)";
  });

  deleteButton.style.backgroundColor = "hsl(285, 91%, 52%)";
  resetButton.style.backgroundColor = "hsl(285, 91%, 52%)";
}

toggle_switch.addEventListener("click", () => {
  position = (position + 1) % 3; // Cycle between 0, 1, and 2

  // Remove previous classes
  toggle_switch.classList.remove("middle", "right", "left");

  if (position === 0) {
    applyThemeOne();
  } else if (position === 1) {
    applyThemeTwo();
  } else if (position === 2) {
    applyThemeThree();
  }
});

// Accessing CSS variables in Javascript
const rootStyles = getComputedStyle(document.documentElement);
const themeTwo = rootStyles.getPropertyValue("--light-gray").trim();
