"use strict";

const smilesArr = [{"happy": "1F600"}, {"sad": "1F62D"}, {"laugh": "1F923"}, {"angry": "1F621"}, {"clawn": "1F921"}];

class ReactionContainer {

    constructor(reactionsArr) {
        this._reactionsArr = reactionsArr;
    }

    createContainer() {
        function createForm() {
            const form = document.createElement("form");
            form.setAttribute("action", "#");
            form.className = "page__form";
            return form;
        }

        function createItemContainer() {
            const div = document.createElement("div");
            div.className = "page__form-item";
            return div;
        }

        function createLabel({property = "for", forValue}) {
            const label = document.createElement("label");
            label.setAttribute(property, forValue);
            label.textContent = "0";
            label.style.opacity = "0";

            document.addEventListener("click", function (event) {
                if (event.target.tagName === 'LABEL') {
                    event.preventDefault();
                } else if (event.target.id === label.getAttribute(property)) {
                    let counter = parseInt(label.textContent);
                    label.textContent = String(++counter);
                    label.style.opacity = "1";
                    event.target.parentElement.style.background = "#283655";
                    event.target.parentElement.style.borderRadius = "50px";
                }
            });
            return label;
        }

        function createInput({type = "button", value = "", id}) {
            const input = document.createElement("input");
            input.setAttribute("type", type);
            input.setAttribute("value", value);
            input.setAttribute("id", id);
            return input;
        }

        const form = createForm();
        document.querySelector("main").append(form);

        this._reactionsArr.forEach((el, index) => {
            let keys = Object.keys(this._reactionsArr[index]);
            const reactionName = keys[0];
            const reaction = String.fromCodePoint(parseInt(this._reactionsArr[index][keys[0]], 16));

            const div = createItemContainer();
            form.append(div);

            const label = createLabel({forValue: reactionName});
            div.append(label);

            const input = createInput({value: reaction, id: reactionName});
            div.append(input);
        })
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

