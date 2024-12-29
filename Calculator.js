// Select the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Temporary variable to store user input
let currentInput = '';
let currentOperator = null;
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    // Handle operators and numbers
    if (!isNaN(value) || value === '.') {
      currentInput += value;
      display.value = currentInput;
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput === '' && value === '-') {
        // Allow negative numbers
        currentInput += value;
      } else {
        currentOperator = value;
        previousInput = currentInput;
        currentInput = '';
      }
    }
  });
});

// Handle clear button
clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  currentOperator = null;
  display.value = '';
});

// Handle equals button
equalsButton.addEventListener('click', () => {
  if (currentOperator && previousInput && currentInput) {
    const result = calculate(Number(previousInput), Number(currentInput), currentOperator);
    display.value = result;
    currentInput = result;
    previousInput = '';
    currentOperator = null;
  }
});

// Calculation function
function calculate(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error';
    default:
      return 0;
  }
}
