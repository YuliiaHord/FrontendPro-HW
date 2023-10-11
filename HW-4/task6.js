"use strict";

const userNumber = Number(prompt("Please, enter your three-digit number", "100"));

const thirdDigit = userNumber % 10;
const secondDigit = ((userNumber - thirdDigit) / 10) % 10;
const firstDigit = (userNumber - (userNumber % 100)) / 100;

const sum = firstDigit + secondDigit + thirdDigit;
const mult = firstDigit * secondDigit * thirdDigit;

const isEven = sum % 2 === 0;
const isDivisibleByFive = sum % 5 === 0;
const isMultBigger100 = mult > 100;

if (isEven) {
    alert(`The sum of ${userNumber} digits is even.`)
} else {
    alert(`The sum of ${userNumber} digits is odd.`)
}

if (isDivisibleByFive) {
    alert(`The sum of ${userNumber} digits is divisible by 5.`)
} else {
    alert(`The sum of ${userNumber} digits isn't divisible by 5.`)
}

if (isMultBigger100) {
    alert(`The product of ${userNumber} digits is bigger than to 100.`)
} else {
    alert(`The product of ${userNumber} digits is less than 100.`)
}