"use strict";


fetch('./invalid-emails.json')
    .then(res => res.json())
    .then(data => console.log(checkEmails(pattern, data)));

const pattern = /^[a-z0-9][a-z0-9._]+@([a-z]+\.)+[a-z]{2,}$/ig;

function checkEmails(pattern, data) {
    for (const el of data) {
        if (pattern.test(el)) {
            return true;
        }
    }
    return false;
}
