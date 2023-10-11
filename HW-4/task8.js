"use strict";

const userNumber = Number(prompt("Please, enter your six-digit number", "100000"));
const sixthDigit = userNumber % 10;
const fifthDigit = ((userNumber % 100) - sixthDigit) / 10;
const fourthDigit = ((userNumber % 1000) - (userNumber % 100)) / 100 ;
const thirdDigit = ((userNumber % 10_000) - (userNumber % 1000)) / 1000 ;
const secondDigit = ((userNumber % 100_000) - (userNumber % 10_000)) / 10_000 ;
const firstDigit = ((userNumber % 1_000_000) - (userNumber % 100_000)) / 100_000 ;

const isMirror = firstDigit === sixthDigit && secondDigit === fifthDigit && thirdDigit === fourthDigit;

if (isMirror) {
    alert(`${userNumber} is a mirror number!`);
} else {
    alert(`${userNumber} isn't a mirror number!`)
}