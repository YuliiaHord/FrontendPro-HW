"use strict";

const userNumber = Number(prompt("Please, enter your two-digit number", "10"));

const secondDigit = userNumber % 10;
const firstDigit = (userNumber - secondDigit) / 10;

if (firstDigit > secondDigit) {
    alert(`In ${userNumber}, ${firstDigit} is bigger than ${secondDigit}`);
} else if (firstDigit === secondDigit) {
    alert(`In ${userNumber}, ${firstDigit} and ${secondDigit} are equal!`);
} else {
    alert(`In ${userNumber}, ${secondDigit} is bigger than ${firstDigit}`);
}