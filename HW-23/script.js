"use strict";

const smilesArr = [{"happy": "1F600"}, {"sad": "1F62D"}, {"laugh": "1F923"}, {"angry": "1F621"}, {"clawn": "1F921"}];

class ReactionContainer {

    constructor(reactionsArr) {
        this._reactionsArr = reactionsArr;
    }

    #createEl({type, attributes, text}) {
        const el = document.createElement(type);
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }
        if (text) el.textContent = text;
        return el;
    }

    createContainer() {

        const form = this.#createEl({type: "form", attributes: {action: "#", class: "page__form"}});
        document.querySelector("main").append(form);

        const formItemsFragment = document.createDocumentFragment();

        this._reactionsArr.forEach((el, index) => {
            let keys = Object.keys(this._reactionsArr[index]);
            const reactionName = keys[0];
            const reaction = String.fromCodePoint(parseInt(this._reactionsArr[index][keys[0]], 16));

            const div = this.#createEl({type: "div", attributes: {class: "page__form-item"}});

            const label = this.#createEl({
                type: "label",
                attributes: {"for": [reactionName], class: "page__form-item", style: "opacity: 0"},
                textContent: "0",
            });
            div.append(label);

            document.addEventListener("click", function (event) {
                if (event.target.tagName === 'LABEL') {
                    event.preventDefault();
                } else if (event.target.id === label.getAttribute("for")) {
                    let counter = Number(label.textContent);
                    label.textContent = String(++counter);
                    label.style.opacity = "1";
                    event.target.parentElement.style.background = "#283655";
                    event.target.parentElement.style.borderRadius = "50px";
                }
            });

            const input = this.#createEl({
                type: "input",
                attributes: {type: "button", value: [reaction], id: [reactionName]},
            });

            div.append(input);
            formItemsFragment.append(div);
        })

        form.append(formItemsFragment);
    }

    addNewReactions(data) {
        if (!Array.isArray(data) && typeof data === "object") {
            this._reactionsArr.push(data);
        } else if (Array.isArray(data)) {
            data.forEach((el) => {
                this._reactionsArr.push(el);
            })
        }
    }

}

const form = new ReactionContainer(smilesArr);
form.addNewReactions({"lovely": "1F970"});
form.addNewReactions({"thumb up": "1F44D"});
form.addNewReactions({"slay": "1F485 "});

form.createContainer();

