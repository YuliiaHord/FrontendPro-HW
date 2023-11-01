"use strict";

const key = prompt("Enter your key:", "Name").replaceAll(" ", "0");
const secret = "potato";

function createHash(key, secret){
    let result = parseInt(key, 36) * parseInt(secret,36);
    return result.toString(36);
}

if (key === "") {
    alert("You haven't entered your key");
} else {
    alert(createHash(key,secret));
}

