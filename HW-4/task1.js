"use strict";

const numFirst = Number(prompt("Please, enter your first number", "0"));
const numSecond = Number(prompt("Please, enter your second number", "0"));

if (numFirst===numSecond) {
    alert("Numbers are equal!");
} else {
    const biggestNum = (numFirst > numSecond) ? numFirst : numSecond;
    const smallestNum = (numFirst < numSecond) ? numFirst : numSecond;
    alert(`${biggestNum} is bigger than ${smallestNum}!`);
}

