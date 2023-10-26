"use strict";

let startCalculator = true;
const operationsHistory = [];

alert("Welcome to calculator!");

do{
    const userChoice = prompt("What action do you want to perform? \n\nAdd, Diff, Mult, Div, Sqrt, Sin, Cos，History", "History");

    if(!userChoice && userChoice!==null) {
        alert("I don't recognize your operation. Please choose correct one: Add, Diff, Mult, Div, Sqrt, Sin, Cos or History");
        continue;
    } else if (userChoice === null) {
        break;
    }

    const normalizedCase = userChoice.toLowerCase();

    switch (normalizedCase){
        case "history":
            if (operationsHistory.length === 0){
                alert("You haven't done any operations yet");
                continue;
            }
            alert(" Your operations: \n\n" + operationsHistory.join("\n"));
            break;
        case "add":
        case "diff":
        case "mult":
        case "div": {
            let operandFirst;
            let operandSecond;

            do {
                operandFirst = prompt("Enter your first number", "0");

                if (operandFirst === null) {
                    startCalculator = false;
                    break;
                }
                if (operandFirst === "" || isNaN(parseFloat(operandFirst))) {
                    alert("This is an invalid digit. Please enter correct one.");
                    continue;
                }
                operandFirst = parseFloat(operandFirst);

            } while (!Number.isInteger(operandFirst))

            if(!startCalculator) break;

            do {
                operandSecond = prompt("Enter your second number", "0");

                if (operandSecond === null) {
                    startCalculator = false;
                    break;
                }
                if (operandSecond === "" || isNaN(parseFloat(operandSecond))) {
                    alert("This is an invalid digit. Please enter correct one.");
                    continue;
                }

                operandSecond = parseFloat(operandSecond);

            } while (!Number.isInteger(operandSecond))

            if(!startCalculator) break;

            switch (normalizedCase){
                case "add": {
                    const historyString = `${operationsHistory.length+1}. Sum : ${operandFirst} + ${operandSecond} = ${operandFirst + operandSecond}`;
                    operationsHistory.push(historyString);
                    alert(`The sum of ${operandFirst} and ${operandSecond} is ${operandFirst + operandSecond}`); break;
                    }
                case "diff": {
                    const historyString = `${operationsHistory.length+1}. Diff : ${operandFirst} - ${operandSecond} = ${operandFirst - operandSecond}`;
                    operationsHistory.push(historyString);
                    alert(`The diff of ${operandFirst} and ${operandSecond} is ${operandFirst - operandSecond}`); break;
                }
                case "mult": {
                    const historyString = `${operationsHistory.length+1}. Mult : ${operandFirst} * ${operandSecond} = ${operandFirst * operandSecond}`;
                    operationsHistory.push(historyString);
                    alert(`The mult of ${operandFirst} and ${operandSecond} is ${operandFirst*operandSecond}`); break;
                }
                case "div": {
                    const historyString = `${operationsHistory.length+1}. Div : ${operandFirst} / ${operandSecond} = ${operandFirst / operandSecond}`;
                    operationsHistory.push(historyString);
                    alert(`The div of ${operandFirst} and ${operandSecond} is ${operandFirst/operandSecond}`); break;
                }
            }
        }
            break;
        case "sqrt":
        case "sin":
        case "cos": {
            let operandFirst;
            do {
                operandFirst = prompt("Enter your first number", "0");

                if (operandFirst === null) {
                    startCalculator = false;
                    break;
                }
                if (operandFirst === "" || isNaN(parseFloat(operandFirst))) {
                    alert("This is an invalid digit. Please enter correct one.");
                    continue;
                }
                operandFirst = parseFloat(operandFirst);

            } while (!Number.isInteger(operandFirst))

            if(!startCalculator) break;

            switch (normalizedCase) {
                case "sqrt":{
                    if(operandFirst >= 0){
                        const historyString = `${operationsHistory.length+1}. Sqrt : ${operandFirst} = ${Math.sqrt(operandFirst)}`;
                        operationsHistory.push(historyString);
                        alert(`The root of ${operandFirst} is ${Math.sqrt(operandFirst)}`);
                    } else {
                        alert("The number must be non-negative");
                    }
                    break;
                }
                case "sin":{
                    const historyString = `${operationsHistory.length+1}. Sin :  ${operandFirst} = ${Math.sin(operandFirst)}`;
                    operationsHistory.push(historyString);
                    alert(`The sin of ${operandFirst} is ${Math.sin(operandFirst)}`);
                    break;
                }
                case "cos": {
                    const historyString = `${operationsHistory.length+1}. Cos :  ${operandFirst} = ${Math.cos(operandFirst)}`;
                    operationsHistory.push(historyString);
                    alert(`The cos of ${operandFirst} is ${Math.cos(operandFirst)}`);
                    break;
                }
            }
        }
            break;
        default:
            alert("I don't recognize your operation. Please choose correct one: Add, Diff, Mult, Div, Sqrt, Sin, Cos or History"); continue;
    }

    if(startCalculator){
        const isContinue = confirm("Do you want to continue?");
        if(!isContinue){
            startCalculator = false;
        }
    }

} while(startCalculator)

alert("Goodbye, see you later!");
