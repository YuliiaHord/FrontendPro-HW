"use strict";

function createLi(){
    return document.createElement("li");
}

function createImg(imageURL){
    const image = document.createElement("img");
    image.src = imageURL;
    image.style.maxWidth  = "200px";
    image.style.width  = "100%";
    image.style.height  = "300px";
    image.classList.add("mb-5");
    return image;
}
function createHeading(text){
    const h2 = document.createElement("h2");
    h2.textContent = text;
    h2.classList.add("fs-1","pb-3","text-warning");
    return h2;
}
function createDescription(text){
    const p = document.createElement("p");
    p.textContent = text;
    p.classList.add("fs-4", "pb-5", "w-50", "mx-auto", "fw-medium");
    return p;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const container = document.createElement("div");
container.classList.add("container-fluid", "d-flex", "flex-column", "align-items-center", "text-center", "justify-content-center","bg-dark", "text-light");
container.style.minHeight = "100vh";
document.body.insertAdjacentElement("afterbegin", container);


const header = document.createElement("header");
header.className = "p-5";
container.append(header);
const h1 = document.createElement("h1");
h1.textContent = "Ваш Аркан сьогодні:";
h1.classList.add("fs-2", "fw-500");
header.append(h1);


const main = document.createElement("main");
container.append(main);


const list = document.createElement("ul");
list.style.listStyleType = "none";
main.append(list);

const randomNumber = getRandomInt(0, 8);
const cards = [
    {
        "name": "Дурень",
        "description": "Сьогодні вам слід бути відкритими для нових можливостей та пригод. Будьте готові до неочікуваних змін, і не бійтеся ризикувати."
    },
    {
        "name": "Маг",
        "description": "Ви маєте неймовірний потенціал та творчість сьогодні. Зосередьте свої сили на власних здібностях та використайте їх для досягнення мети."
    },
    {
        "name": "Жриця",
        "description": "Сьогодні вам важливо вірити в свою інтуїцію та взаємодіяти з внутрішньою мудрістю. Дозвольте собі слухати внутрішній голос."
    },
    {
        "name": "Імператриця",
        "description": "Це час родючості та творчості. Сьогодні ви можете навколити себе красою та насолодою, втілюючи жіночу енергію."
    },
    {
        "name": "Ієрофант",
        "description": "Дня сьогоднішнього позначено духовним розвитком та вчителюванням. Шукайте мудрості та напрямку в традиціях та вірі."
    },
    {
        "name": "Закохані",
        "description": "Кохання та взаємодія грають ключову роль. Сьогодні ви можете очікувати романтичні моменти та важливі вирішення відносин."
    },
    {
        "name": "Колісниця",
        "description": "Ваш шлях визначається змінами та переміщеннями. Будьте готові до швидких подій та взаємодій з долею."
    },
    {
        "name": "Сила",
        "description": "Сьогодні важливо знайти баланс та внутрішню силу. Підкорюйте труднощі з мудрістю та рішучістю."
    },
    {
        "name": "Колесо Фортуни",
        "description": "День наповнений змінами та випробуваннями. Будьте готові до впливу долі та визначальних моментів."
    }
];
for(let i = 0; i < 9; i++){
    const li = createLi();
    list.append(li);
    const img = createImg(`./images/${i+1}.jpg`);
    li.append(createHeading(cards[i].name));
    li.append(img);
    li.append(createDescription(cards[i].description));
    if(i!==randomNumber){
        li.hidden = true;
    }
}

