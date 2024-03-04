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
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
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

//checa se o último caractere é um número. se não for um número, retorna NaN. 
function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression() {
    const evalResult = eval(expression);
    // checks if evalResult isNaN or infinite. It if is, return a space carachter ' '
    return isNaN(evalResult) || !isFinite(evalResult) 
    ? ' ' 
    : evalResult < 1 
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
    // negate the result if expression is empty or result is presente
    if (expression === '' && result !== '') {
        result = -result;
    }
    else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    }
    else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

function percentage() {
    // evaluate the expression
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
            result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result) / 100;
    }
}

function decimal(value) {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}