"use strict";

const MODE_GREETING = "greeting";
const MODE_FAREWELL = "goodbye";
const MODE_INVALID_OPERATION = "invalid operation";
const MODE_INVALID_NUMBER = "invalid number";
const MODE_INVALID_SQRT = "invalid square root";
const MODE_EMPTY_HISTORY = "empty history";
const MODE_CONFIRMATION = "confirm";

let startCalculator = true;
const operationHistory = [];
const operationArray = ["add", "diff","mult","div","sqrt","sin","cos","history"];


function showNotification (typeOfNotification){
    switch (typeOfNotification){
        case MODE_GREETING:
            alert("Welcome to calculator!");
            return;
        case MODE_FAREWELL:
            alert("Goodbye, see you later!");
            return;
        case MODE_INVALID_OPERATION:
            alert(`I don't recognize your operation. Please choose correct one: Add, Diff, Mult, Div, Sqrt, Sin, Cos ${operationHistory.length ? ', History' : ``} `);
            return;
        case MODE_INVALID_NUMBER:
            alert("This is an invalid digit. Please enter correct one.");
            return;
        case MODE_INVALID_SQRT:
            alert("Number must be positive");
            return;
        case MODE_EMPTY_HISTORY:
            alert("You haven't done any operations yet");
            return;
        case MODE_CONFIRMATION:
            return confirm("Do you want to continue?");
    }
}

const sum = (x) => x[0] + x[1];
const diff = (x) => x[0] - x[1];
const mult = (x) => x[0] * x[1];
const div = (x) => x[0] / x[1];
const sqrt = (x) => {
    if (x[0] >= 0) {
        return Math.sqrt(x[0]);
    } else {
        showNotification(MODE_INVALID_SQRT);
        return null;
    }
}
const sin = (x) => Math.sin(x[0]);
const cos = (x) => Math.cos(x[0]);

function validateOperation (operation){
    if(operationArray.includes(operation.toLowerCase())) {
        return operation.toLowerCase();
    } else {
        showNotification(MODE_INVALID_OPERATION);
        return null;
    }
}

function validateNumber(operand){
    if (operand === null) {
        showNotification(MODE_FAREWELL);
        startCalculator = false;
        return null;
    }
    if (operand === "" || isNaN(parseFloat(operand))) {
        showNotification(MODE_INVALID_NUMBER);
        return;
    }
    return parseFloat(operand);
}

function getNumberByOperation(operation) {

        if(["add","diff","mult","div"].includes(operation)) {
            let operandFirst;
            do {
                operandFirst = validateNumber(prompt("Enter your first number", "0"));
                if(operandFirst===null) return null;
            } while (!Number.isInteger(operandFirst))


            let operandSecond;
            do {
                operandSecond = validateNumber(prompt("Enter your second number", "0"));
                if(operandSecond===null) return null;
            } while (!Number.isInteger(operandSecond))

            return [operandFirst, operandSecond];
        }


        if(["sqrt","sin","cos"].includes(operation)){
            let operandFirst;
            do {
                operandFirst = validateNumber(prompt("Enter your number", "0"));
                if(operandFirst===null) return null;
            } while (!Number.isInteger(operandFirst))

            return [operandFirst];
        }
    }


function doOperation(operation, operandArray) {

    function chooseOperationSymbol(operation){
        switch (operation){
            case "add": return "+";
            case "diff": return "-";
            case "mult": return "*";
            case "div": return "/";
            default: return null;
        }
    }
    function getFunction(operation){
        switch (operation){
            case "add": return sum;
            case "diff": return diff;
            case "mult": return mult;
            case "div": return div;
            case "sqrt": return sqrt;
            case "sin": return sin;
            case "cos": return cos;
        }
    }

    if(operation === "history") {
        if (operationHistory.length === 0) {
            showNotification(MODE_EMPTY_HISTORY);
            return;
        }
        let historyString = " Your operations: \n\n";
        operationHistory.forEach(function (operation, index){
            historyString += `${index+1}.  ${operation}\n`;
        })
        alert(historyString);
        return;
    }

    let result;
    const operationSymbol = chooseOperationSymbol(operation);
    result = `${operation.charAt(0).toUpperCase()+operation.slice(1)} : ${operandArray[0]} `;
    if(operationSymbol){
        result += `${operationSymbol} ${operandArray[1]} `;
    }
    result += '= ';
    const func = getFunction(operation);
    const operationResult = func(operandArray);
    if(operationResult === null) return;
    result += operationResult;
    operationHistory.push(result);
    alert(result);
}


showNotification(MODE_GREETING);

do{
    let checkedOperation;
    do {
        const userChoice = prompt(`What action do you want to perform? Add, Diff, Mult, Div, Sqrt, Sin, Cos${operationHistory.length ? ', History' : ``}`, "Add");
        if(userChoice === null) {
            showNotification(MODE_FAREWELL);
            startCalculator = false;
            break;
        }
        checkedOperation = validateOperation(userChoice);
    } while (!checkedOperation)
    if (!startCalculator) break;


    const operands = getNumberByOperation(checkedOperation);
    if(operands === null)  break;

    doOperation(checkedOperation,operands);

    if(startCalculator){
        const isContinue = showNotification(MODE_CONFIRMATION);
        if(!isContinue){
            startCalculator = false;
            showNotification(MODE_FAREWELL);
        }
    }

} while(startCalculator)

