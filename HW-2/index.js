"use strict";

const num1 = prompt("Please, enter your first number");
const num2 = prompt("Please, enter your second number");

alert( `Calculations are finished!\n 
Sum: ${num1} + ${num2} = ${+num1 + +num2} 
Diff: ${num1} - ${num2} = ${num1 - num2}
Mult: ${num1} * ${num2} = ${num1 * num2}
Div: ${num1} / ${num2} = ${num1 / num2}`);