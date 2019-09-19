function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}

function updateDisplay(value) {
    if (display.value == 'Ready...') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function setResultToDisplay(res) {
    display.value = res;
}

let display = document.querySelector('input');
display.value = 0;

let firstInputFinal = false;
let secondInputFinal = false;
let firstInput = '', secondInput = '', firstOperand, secondOperand, currentOperator;

const calculatorKeys = document.querySelector('.calculator-keys');
const numKeys = calculatorKeys.querySelectorAll('.number');
const operators = calculatorKeys.querySelectorAll('.operator');
const clear = calculatorKeys.querySelector('.clear');
const equal_sign = calculatorKeys.querySelector('.equal-sign');


numKeys.forEach(key => {
    key.addEventListener('click', () => {
        let value = key.value;
        if (firstInputFinal) {
            //dealing with second operand
            secondInput += value;
        } else {
            //dealing with first operand
            firstInput += value;
        }
        updateDisplay(value);
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        let value = operator.value;
        if (firstInputFinal) {
            secondOperand = Number(secondInput);
            secondInput = '';
            if (value == '/' && secondOperand == 0) {
                let message = document.querySelector('.message');
                message.innerHTML = 'OOPS! Cannot divide by 0! Press AC to continue';
                return;
            }
            let res = operate(currentOperator, firstOperand, secondOperand);
            setResultToDisplay(res);
            firstInput = res;
            firstOperand = Number(firstInput);
            updateDisplay(value);
            firstInputFinal = true;
            secondInputFinal = true;
        } else {
            firstOperand = Number(firstInput);
            firstInput = '';
            firstInputFinal = true;
            updateDisplay(value);
        }
        currentOperator = value;
    });
});

clear.addEventListener('click',() => {
    let message = document.querySelector('.message');
    message.innerHTML = '';
    display.value = 'Ready...';
    firstInput = '';
    secondInput = '';
    firstInputFinal = false;
    firstOperand = 0;
    secondOperand = 0;
});

equal_sign.addEventListener('click',() => {
    secondOperand = Number(secondInput);
    secondInput = '';
    if (currentOperator == '/' && secondOperand == 0) {
        let message = document.querySelector('.message');
        message.innerHTML = 'OOPS! Cannot divide by 0! Press AC to continue';
        return;
    }
    let res = operate(currentOperator, firstOperand, secondOperand);
    setResultToDisplay(res);
    firstInput = res;
    firstInputFinal = false;
});



const buttons = document.querySelectorAll('button');
const buttonsArray = Array.from(buttons);

document.addEventListener('keyup',e => {
    let res;
    if (e.key == 'Enter') {
        res = buttonsArray.filter(button => {
            return button.value == '=';
        });
    } else {
        res = buttonsArray.filter(button => {
            return button.value == e.key;
        });
    }
   
    
    if (res) {
        res[0].click();
    }
});

