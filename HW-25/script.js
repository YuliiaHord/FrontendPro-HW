"use strict";

const container = document.querySelector(".carousel-inner");
const prevArr = document.querySelector(".carousel-control-prev");
const nextArr = document.querySelector(".carousel-control-next");
let counter = 1;

if (counter === 1) {
    document.querySelector(".carousel-control-prev-icon").hidden = true;
    prevArr.hidden = true;
}

nextArr.addEventListener("click", function (event) {
    if (event.target.dataset["bsSlide"] === "next") {
        if (counter <= container.children.length) {
            document.querySelector(".carousel-item").className = "carousel-item";
            container.children[counter].className = "carousel-item active";
            counter++;
            if (counter > 1) {
                document.querySelector(".carousel-control-prev-icon").hidden = false;
                prevArr.hidden = false;
            }
            if (counter === container.children.length) {
                document.querySelector(".carousel-control-next-icon").hidden = true;
                nextArr.hidden = true;
            }
        }
    }
})


prevArr.addEventListener("click", function (event) {
    if (event.target.dataset["bsSlide"] === "prev") {
        if (counter > 1) {
            counter--;
            container.children[counter].className = "carousel-item";
            container.children[counter - 1].className = "carousel-item active";
            if (counter < container.children.length) {
                document.querySelector(".carousel-control-next-icon").hidden = false;
                nextArr.hidden = false;
            }
            if (counter === 1) {
                document.querySelector(".carousel-control-prev-icon").hidden = true;
                prevArr.hidden = true;
            }
        }

    }
});