"use strict";

const userNumber = Number(prompt("Please, enter your number", "0"));

const lastDigit = userNumber % 10;

if (lastDigit % 2 === 0) {
    alert(`Your number ${userNumber} is even, its last digit is ${lastDigit}!`);
} else {
    alert(`Your number ${userNumber} is odd, its last digit is ${lastDigit}!`);
}
