"use strict";

let isTrue = true;

alert("Welcome to calculator!");

do{
    const userChoice = prompt("What action do you want to perform? \n\nAdd, Diff, Mult, Div, Sqrt, Sin, Cos", "Add");

    if(!userChoice && userChoice!==null) {
        alert("I don't recognize your operation. Please choose correct one: Add, Diff, Mult, Div, Sqrt, Sin or Cos");
        continue;
    } else if (userChoice === null) {
        break;
    }

    const normalizedCase = userChoice.toLowerCase();
    let operandFirst;
    let operandSecond;

    switch (normalizedCase){
        case "add":
        case "diff":
        case "mult":
        case "div":

            do {
                 operandFirst = prompt("Enter your first number", "0");
                 if (operandFirst === null) {
                    isTrue = false;
                    break;
                } else if (operandFirst === "" || (!parseFloat(operandFirst) && parseFloat(operandFirst) !== 0)) {
                     alert("This is an invalid digit. Please enter correct one.");
                 }
            } while (operandFirst === "" || (!parseFloat(operandFirst) && parseFloat(operandFirst) !== 0))
            if(!isTrue) break;
            operandFirst = parseFloat(operandFirst);

            do {
                operandSecond = prompt("Enter your second number", "0");
                if (operandSecond === null) {
                    isTrue = false;
                    break;
                } else if (operandSecond === "" || (!parseFloat(operandSecond) && parseFloat(operandSecond) !== 0)){
                    alert("This is an invalid digit. Please enter correct one.");
                }
            } while (operandSecond === "" || (!parseFloat(operandSecond) && parseFloat(operandSecond) !== 0))
            if(!isTrue) break;
            operandSecond = parseFloat(operandSecond);

            switch (normalizedCase){
                case "add": alert(`The sum of ${operandFirst} and ${operandSecond} is ${operandFirst + operandSecond}`); break;
                case "diff": alert(`The diff of ${operandFirst} and ${operandSecond} is ${operandFirst-operandSecond}`); break;
                case "mult": alert(`The mult of ${operandFirst} and ${operandSecond} is ${operandFirst*operandSecond}`); break;
                case "div": alert(`The div of ${operandFirst} and ${operandSecond} is ${operandFirst/operandSecond}`); break;
            }
            break;

        case "sqrt":
        case "sin":
        case "cos":

            do {
                operandFirst = prompt("Enter your number", "0");
                if (operandFirst === null) {
                    isTrue = false;
                    break;
                } else if (operandFirst === "" || (!parseFloat(operandFirst) && parseFloat(operandFirst) !== 0)){
                    alert("This is an invalid digit. Please enter correct one.");
                }
            } while (operandFirst === "" || (!parseFloat(operandFirst) && parseFloat(operandFirst) !== 0))
            if(!isTrue) break;
            operandFirst = parseFloat(operandFirst);

            switch (normalizedCase) {
                case "sqrt":
                    (operandFirst >= 0) ? alert(`The root of ${operandFirst} is ${Math.sqrt(operandFirst)}`) : alert("The number must be non-negative");
                    break;
                case "sin": alert(`The sin of ${operandFirst} is ${Math.sin(operandFirst)}`); break;
                case "cos": alert(`The cos of ${operandFirst} is ${Math.cos(operandFirst)}`); break;
            }
            break;

        default:
            alert("I don't recognize your operation. Please choose correct one: Add, Diff, Mult, Div, Sqrt, Sin or Cos"); continue;
    }

    if(isTrue){
        let isContinue = true;
        isContinue = confirm("Do you want to continue?");
        if(!isContinue){
            isTrue = false;
        }
    }

} while(isTrue)

alert("Goodbye, see you later!");
