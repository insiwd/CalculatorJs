const inputBox = document.getElementById("input");
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// define the expression + result variables
let expression = '';
let result = '';

// event handler for buttons
function buttonClick(event) {
    // get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // switch case
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backSpace();
            break;
        // add result 
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== '') {
                startFromResult(value);
            }
            else if (expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
    }

    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);
function addValue(value) {
    // add value to expression
    expression += value;
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
}

function backSpace() {
    expression = expression.slice(0, -1);
}