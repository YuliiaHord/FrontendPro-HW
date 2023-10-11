"use strict";

const numFirst = Number(prompt("Please, enter your first number", "0"));
const numSecond = Number(prompt("Please, enter your second number", "0"));

if (numFirst % numSecond === 0) {
    alert(`${numSecond} є дільником ${numFirst}`);
} else {
    alert(`${numSecond} не є дільником ${numFirst}`);
}

if (numSecond % numFirst === 0) {
    alert(`${numFirst} є дільником ${numSecond}`);
} else {
    alert(`${numFirst} не є дільником ${numSecond}`);
}