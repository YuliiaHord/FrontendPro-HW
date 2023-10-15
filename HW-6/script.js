"use strict";
alert("Welcome to calculator!");

const userChoice = prompt("What action you want to do? \n\nAdd, Diff, Mult, Div, Sqrt, Sin, Cos", "Add");

let operandFirst;
let operandSecond;
let numOperands;
let programRun = true;

switch (userChoice) {
    case "Add":
    case "Diff":
    case "Mult":
    case "Div":
        numOperands = 2;
        break;
    case "Sqrt":
    case "Sin":
    case "Cos":
        numOperands = 1;
        break;
    case null:
        alert("Goodbye, see you later!");
        programRun = false;
        break;
    default:
        alert("Enter proper operation name!");
        programRun = false;
        break;
}

if (programRun) {
    switch (numOperands){
        case 1:
            operandFirst = prompt("Enter first number", "0");
            if ((operandFirst === null ) || (operandFirst === "")) {
                alert("Goodbye, see you later");
                programRun = false;
            } else if ((!Number(operandFirst) && Number(operandFirst)!==0)){
                alert("This is bad digit, goodbye");
                programRun = false;
            } else{
                operandFirst = Number(operandFirst);
            }
            break;
        case 2:
            operandFirst = prompt("Enter first number", "0");
            if  (operandFirst === null) {
                alert("Goodbye, see you later");
                programRun = false;
                break;
            } else if  ((!Number(operandFirst) && Number(operandFirst)!==0) || operandFirst === ""){
                alert("This is bad digit, goodbye");
                programRun = false;
                break;
            } else{
                operandFirst = Number(operandFirst);
            }
            operandSecond = prompt("Enter second number", "0");
            if (operandSecond === null ) {
                alert("Goodbye, see you later");
                programRun = false;
            } else if  ((!Number(operandSecond) && Number(operandSecond)!==0) || operandSecond === ""){
                alert("This is bad digit, goodbye");
                programRun = false;
            } else{
                operandSecond = Number(operandSecond);
            }
            break;
    }
}

if(programRun){
    switch (userChoice){
        case "Add":
            const sum = operandFirst + operandSecond;
            alert(`The sum of ${operandFirst} and ${operandSecond} is ${sum}`);
            break;
        case "Diff":
            const diff = operandFirst - operandSecond;
            alert(`The diff of ${operandFirst} and ${operandSecond} is ${diff}`);
            break;
        case "Mult":
            const mult = operandFirst * operandSecond;
            alert(`The mult of ${operandFirst} and ${operandSecond} is ${mult}`);
            break;
        case "Div":
            const div = operandFirst / operandSecond;
            alert(`The division of ${operandFirst} and ${operandSecond} is ${div}`);
            break;
        case "Sqrt":
            const sqrt = Math.sqrt(operandFirst);
            alert(`The square root of ${operandFirst} is ${sqrt}`);
            break;
        case "Sin":
            const sin = Math.sin(operandFirst);
            alert(`The sinus of ${operandFirst} is ${sin}`);
            break;
        case "Cos":
            const cos = Math.cos(operandFirst);
            alert(`The cosinus of ${operandFirst} is ${cos}`);
            break;
}}
if(programRun) alert ("Goodbye, see you later.");




