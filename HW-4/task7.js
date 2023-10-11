"use strict";

const userNumber = Number(prompt("Please, enter your three-digit number", "100"));
const thirdDigit = userNumber % 10;
const secondDigit = ((userNumber - thirdDigit) / 10) % 10;
const firstDigit = (userNumber - (userNumber % 100)) / 100;

const isAllIdentical = firstDigit === secondDigit && secondDigit === thirdDigit;
const isAnyIdentical = firstDigit === secondDigit || firstDigit === thirdDigit || secondDigit === thirdDigit;

if (isAllIdentical) {
    alert(`All digits in ${userNumber} are equal!`);
} else if (isAnyIdentical) {
    alert(`In ${userNumber} occur identical digits!`);
} else {
    alert(`All digits in ${userNumber} aren't equal!`);
}
