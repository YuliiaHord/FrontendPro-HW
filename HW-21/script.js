"use strict";

const table = document.createElement("table");
document.body.insertAdjacentElement("afterbegin", table);
table.style.border = "1px solid black";
table.style.margin = "0 auto";

function createTr() {
    return document.createElement("tr");
}

function createTh(data) {
    const th = document.createElement("th");
    th.style.border = "1px solid black";
    th.style.width = "20px";
    th.textContent = data;
    return th;
}

function createTd(data) {
    const td = document.createElement("td");
    td.style.border = "1px solid black";
    td.style.width = "20px";
    td.style.textAlign = "center";
    td.textContent = data;
    return td;
}

const trHead = createTr();
table.append(trHead);
trHead.append(createTh(""));

for (let i = 1; i <= 10; i++) {
    trHead.append(createTh(String(i)));
}

for (let i = 1; i < trHead.children.length; i++) {
    const tr = createTr();
    table.append(tr);
    tr.append(createTd(i));
    for (let j = 1; j < trHead.children.length; j++) {
        tr.append(createTd(i * j));
    }
}
