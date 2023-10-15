"use strict";

alert("Welcome to calculator!");
const userChoice = prompt("What action you want to do? \n\nAdd, Diff, Mult, Div, Sqrt, Sin, Cos", "Add");

let operandFirst = 0;
let operandSecond = 0;

const isTwoOperands = userChoice === "Add" || userChoice === "Diff" || userChoice === "Mult" || userChoice === "Div";
const isOneOperand = userChoice === "Sin" || userChoice === "Cos" || userChoice === "Sqrt";

if (isTwoOperands) {
     operandFirst = prompt("Enter first number", "0");
     operandSecond = prompt("Enter second number", "0");
} else if (isOneOperand) {
    operandFirst = prompt("Enter your number");
} else {
    alert("Goodbye, see you later");
}

if (operandFirst === null || operandSecond === null) {
    alert("Goodbye, see you later");
} else if (operandFirst === "" || operandSecond === ""){
    alert("This is bad digit, goodbye");
} else if ((!Number(operandFirst) && Number(operandFirst)!==0) || (!Number(operandSecond) && Number(operandSecond)!==0)){
    alert("This is bad digit, goodbye");
} else {
    if (userChoice === "Add") {
        const sum = Number(operandFirst) + Number(operandSecond);
        alert(`The sum of ${operandFirst} and ${operandSecond} is ${sum}`);
        alert ("Goodbye, see you later.");
    } else if( userChoice === "Diff") {
        const diff = operandFirst - operandSecond;
        alert(`The diff of ${operandFirst} and ${operandSecond} is ${diff}`);
        alert ("Goodbye, see you later.");
    } else if (userChoice === "Mult") {
        const mult = operandFirst * operandSecond;
        alert(`The mult of ${operandFirst} and ${operandSecond} is ${mult}`);
        alert ("Goodbye, see you later.");
    } else if (userChoice === "Div") {
        const div = operandFirst / operandSecond;
        alert(`The division of ${operandFirst} and ${operandSecond} is ${div}`);
        alert ("Goodbye, see you later.");
    } else if (userChoice === "Sqrt") {
        const sqrt = Math.sqrt(operandFirst);
        alert(`The square root of ${operandFirst} is ${sqrt}`);
        alert ("Goodbye, see you later.");
    } else if (userChoice === "Sin") {
        const sin = Math.sin(operandFirst);
        alert(`The sinus of ${operandFirst} is ${sin}`);
        alert ("Goodbye, see you later.");
    } else if (userChoice === "Cos") {
        const cos = Math.cos(operandFirst);
        alert(`The cosinus of ${operandFirst} is ${cos}`);
        alert ("Goodbye, see you later.");
    }
}

