function resetPage() {
    while (document.querySelector(".container").firstElementChild) {
        document.querySelector(".container").firstElementChild.remove();
    }
    new ShopSystem(dataShop, cities).launchShop();
}

class ShopSystem {
    #form;
    #mainRow;
    #categoryCol;
    #goodsCol;
    #infoCol;
    #navRow;
    #orderCard

    constructor(data, cities) {
        this._data = data;
        this.#form = new OrderForm(cities).form;
        this.selectedCategory = null;
        this.selectedProduct = null;
        this.#navRow = this.#createEl({type: "div", attributes: {class: "row mt-5 mb-2"}});
        this.#mainRow = this.#createEl({type: "div", attributes: {class: "row mt-3 mb-5"}});
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

    #createNotification({type = "success", content = "Alert!"}) {
        return this.#createEl({type: "div", attributes: {class: `alert alert-${type} mt-5`}, text: content});
    }

    #clearContent(element) {
        if (!element && element.nodeType !== 1) return;
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    #createCol(row, className) {
        const colContainer = this.#createEl({type: "div", attributes: {class: className}});
        row.append(colContainer);
        return colContainer;
    }

    #createList(data, prefix) {
        const list = this.#createEl({type: "ul", attributes: {class: "list-group"}});
        const listItemFragment = document.createDocumentFragment();
        for (const el of data) {
            const listItem = this.#createEl({
                type: "li",
                attributes: {class: "list-group list-group-item", style: "cursor: pointer"},
                text: el
            });
            listItem.setAttribute(`data-${prefix}`, "");
            listItemFragment.append(listItem);
        }
        list.append(listItemFragment);
        return list;
    }

    createCategories() {
        this.#clearContent(this.#categoryCol);
        const categoriesName = Object.keys(this._data);
        this.#categoryCol.append(this.#createList(categoriesName, "category"));
    }

    createGoods() {
        this.#clearContent(this.#goodsCol);
        const productsTitles = this._data[this.selectedCategory].map((el) => {
            return el.name;
        })
        this.#goodsCol.append(this.#createList(productsTitles, "goods"));
    }

    createInfo() {
        this.#clearContent(this.#infoCol);

        const productTitle = this.#createEl({
            type: "h3",
            attributes: {class: "fs-3"},
            text: this._data[this.selectedCategory][this.selectedProduct].name
        });
        this.#infoCol.append(productTitle);

        const goodsInfo = this._data[this.selectedCategory][this.selectedProduct];
        const textFragment = document.createDocumentFragment();
        for (const key in goodsInfo) {
            const p = this.#createEl({type: "p", text: `${key}: ${goodsInfo[key]}`});
            textFragment.append(p);
        }
        this.#infoCol.append(textFragment);

        const purchaseBtn = this.#createEl({
            type: "button",
            attributes: {type: "submit", id: "purchase", class: "btn btn-dark"},
            text: "Buy"
        });
        this.#infoCol.append(purchaseBtn);
        purchaseBtn.addEventListener("click", (event) => {
            if (event.target.getAttribute("id") === "purchase") {
                const notification = this.#createNotification({content: "Thank you! Your order has been successfully accepted!"});
                this.#mainRow.append(notification);
                setTimeout(() => {
                    notification.remove();
                }, 1000);
                this.#form.setAttribute(`data-selectedProduct`, this.selectedProduct);
                this.#form.setAttribute(`data-selectedCategory`, this.selectedCategory);
                document.querySelector(".container").append(this.#form);
            }
        })
    }
    createOrdersList(){
        const container = this.#createEl({type: "div", attributes: {class: "orderList"}});
        const heading = this.#createEl({type: "h5", text: "Your Orders:"});
        const ordersList = this.#createEl({type: "ul", attributes: {class: "list-group d-flex flex-column-reverse"}});
        const ordersFragment = document.createDocumentFragment();

        for (const order of JSON.parse(localStorage.getItem("userOrders"))){
                const productName = dataShop[order.category][order.product].name;
                const productPrice = dataShop[order.category][order.product].price;
                const li = this.#createEl({type: "li", attributes: {class: "list-group-item d-flex justify-content-between align-items-center", id: `${order["id"]}`, style: "cursor:pointer"}});
                const product = this.#createEl({type: "span", attributes: {class: "flex-grow-1"}, text: productName});
                const time = this.#createEl({type: "span", attributes: {class: "text-secondary m-1"}, text: `${order["time"]}`});
                const price = this.#createEl({type: "span", attributes: {class: "text-secondary"}, text: `(UAH ${productPrice * order["quantity"]})`});
                const trashBtn = this.#createEl({type: "button", attributes: {type: "button", ["data-action"]: "removeOrder", class: "btn btn-secondary m-1"}});
                const i = this.#createEl({type: "i", attributes: {class: "bi bi-trash", ["data-action"]: "removeOrder"}});
                trashBtn.append(i);
                li.append(product);
                li.append(price);
                li.append(time);
                li.append(trashBtn);
                ordersFragment.append(li);
            }

        ordersList.append(ordersFragment);
        container.append(heading);
        container.append(ordersList);

        ordersList.addEventListener("click", (event) =>{

            if(event.target.dataset.action === "removeOrder"){
                const resetOrdersList = [];
                for (const order of JSON.parse(localStorage.getItem("userOrders"))){
                    if(event.target.closest("LI").getAttribute("id") !== order.id){
                        resetOrdersList.push(order);
                    }
                }
                localStorage.setItem("userOrders", JSON.stringify(resetOrdersList));
                event.target.closest("LI").remove();
            }

            if(event.target.tagName === "SPAN"){
                let selectedItem;
                for (const order of JSON.parse(localStorage.getItem("userOrders"))){
                    if (event.target.closest("LI").getAttribute("id") === order.id){
                        selectedItem = order;
                        this.#orderCard = new Card(selectedItem, "review");
                        this.#clearContent(this.#mainRow);
                        this.#mainRow.append(this.#orderCard.card);
                    }
                }
            }
        })

        return container;
    }
    createNavigation(){
        const backCol = this.#createCol(this.#mainRow, "col-1 d-none");
        const orderCol = this.#createCol(this.#mainRow, "col-2");
        const backBtn = this.#createEl({type:"button", attributes: {type: "button", class: "btn btn-dark"}});
        const backIcon = this.#createEl({type: "i", attributes: {class: "bi bi-arrow-left"}});
        const myOrderBtn = this.#createEl({type:"button", attributes: {type: "button", class: "btn btn-dark"}, text: "My orders"});

        this.#navRow.append(backCol);
        this.#navRow.append(orderCol);
        backCol.append(backBtn);
        backBtn.append(backIcon);
        orderCol.append(myOrderBtn);

        myOrderBtn.addEventListener("click", ()=>{
            if(document.querySelector(".container").children.length === 3){
                document.querySelector(".container").children[2].remove();
            }
            backCol.classList.remove("d-none");
            orderCol.classList.add("d-none");
            this.#clearContent(this.#mainRow);
            this.#form.remove();
            this.#mainRow.append(this.createOrdersList());
        })

        backBtn.addEventListener("click", ()=>{
            this.#clearContent(this.#navRow);
            this.#clearContent(this.#mainRow);
            this.launchShop();
        })
    }
    launchShop() {
        this.createNavigation();
        this.#categoryCol = this.#createCol(this.#mainRow, "col-3");
        this.createCategories();
        this.#goodsCol = this.#createCol(this.#mainRow, "col-4");
        this.#infoCol = this.#createCol(this.#mainRow, "col-4");
        document.querySelector(".container").append(this.#navRow);
        document.querySelector(".container").append(this.#mainRow);
        this.#mainRow.addEventListener("click", (event) => {
            if ("goods" in event.target.dataset) {
                if(document.querySelector(".container").children.length === 3){
                    document.querySelector(".container").children[2].remove();
                }
                this._data[this.selectedCategory].forEach((el, index) => {
                    if (el.name === event.target.textContent) {
                        this.selectedProduct = index;
                    }
                });
                event.currentTarget.querySelectorAll("[data-goods]").forEach((el) => {
                    el.classList.remove("active");
                })
                event.target.classList.add("active");
                this.createInfo();
            } else if ("category" in event.target.dataset) {
                if(document.querySelector(".container").children.length === 3){
                    document.querySelector(".container").children[2].remove();
                }
                this.selectedCategory = event.target.textContent;
                event.currentTarget.querySelectorAll("[data-category]").forEach((el) => {
                    el.classList.remove("active");
                })
                event.target.classList.add("active");
                this.createGoods();
                this.#clearContent(this.#infoCol);
            }
        });

    }

    addCategory(category) {
        this._data[category] = [];
    }

    addGoods(goods, category) {
        if (!(category in this._data)) this._data.addCategory(category);
        this._data[category].push(goods);
    }


}

class Form {
    createEl({type, attributes, text}) {
        const el = document.createElement(type);
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }
        if (text) el.textContent = text;
        return el;
    };

    createTextInput({text, id}) {
        const container = this.createEl({type: "div", attributes: {class: "mb-3"}});
        const label = this.createEl({type: "label", attributes: {for: id, class: "form-control"}, text: text});
        const input = this.createEl({
            type: "input",
            attributes: {type: "text", class: "form-control invalid", name: id, id: id}
        });
        const textInner = this.createEl({type: "div", attributes: {class: "form-text mb-2 text-danger", text: ""}});
        container.append(label);
        label.append(input);
        container.append(textInner)
        return container;
    }

    createSelectorInput({text, id}) {
        const labelCity = this.createEl({type: "label", attributes: {for: id, class: "form-control mb-3"}, text: text});
        const selectCity = this.createEl({type: "select", attributes: {id: id, class: "form-select", name: id}});
        labelCity.append(selectCity);
        return labelCity;
    }

    createRadioBox({title, textArr, name}) {
        const radioGroup = this.createEl({type: "div", attributes: {class: "mb-3"}});
        const heading = this.createEl({type: "div", text: title});
        radioGroup.append(heading);
        textArr.forEach((el, index) => {
            const container = this.createEl({type: "div", attributes: {class: "form-check"}});
            const input = this.createEl({
                type: "input",
                attributes: {type: "radio", name: name, class: "form-check-input", id: `${name}-${index}`}
            });
            if (index === 0) input.setAttribute("checked", "");
            const label = this.createEl({
                type: "label",
                attributes: {class: "form-check-label", for: `${name}-${index}`},
                text: el
            });
            container.append(input);
            container.append(label);
            radioGroup.append(container);
        });
        return radioGroup;
    }

    createNumberInput({min = 1, max, defaultValue, text}) {
        const container = this.createEl({type: "div", attributes: {class: "mb-3"}});
        const quantityLabel = this.createEl({
            type: "label",
            attributes: {class: "form-control", for: "quantity-i"},
            text: text
        });
        const quantityInput = this.createEl({
            type: "input",
            attributes: {type: "number", min: min, value: defaultValue, class: "form-control", id: "quantity-i"}
        });
        quantityLabel.append(quantityInput);
        container.append(quantityLabel);
        return container;
    }

    createTextField(text) {
        const textCommentary = this.createEl({
            type: "textarea",
            attributes: {class: "form-control mb-3", id: "commentary-i", placeholder: text}
        });
        return textCommentary;
    }

    createButton({type, className, text}) {
        const saveBtn = this.createEl({type: "button", attributes: {type: type, class: className}, text: text});
        return saveBtn;
    }
}

class OrderForm extends Form {
    constructor(cities) {
        super();
        this._cities = cities;
        this.selectedCity = this._cities[0].city;
        this.order = {};
        this.form = this.createEl({type: "form", attributes: {name: "form", class: "w-50 mx-auto"}});
        this.addGroupNames();
        this.addGroupCities();
        this.addPayments();
        this.addQuantity();
        this.addCommentary();
        this.addSaveButton();
        this.form.addEventListener("submit", (event) => {
            if (this.form["firstname"].classList.contains("invalid")) {
                this.form["firstname"].focus();
                event.preventDefault();
            } else if (this.form["lastname"].classList.contains("invalid")) {
                this.form["lastname"].focus();
                event.preventDefault();
            } else {
                event.preventDefault();
                this.submitData();
                this.form.remove();
                const orderCard = new Card(this.order, "confirmation");
                document.querySelector(".container").append(orderCard.card);
            }
        })
    }

    submitData() {
        function uuidv4() {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
        function addToLocalStorage(order){
            if(!(localStorage.hasOwnProperty("userOrders"))){
                localStorage.setItem("userOrders", JSON.stringify([]));
            }
            const userOrdersArr = JSON.parse(localStorage.getItem("userOrders"));
            userOrdersArr.push(order);
            localStorage.setItem('userOrders', JSON.stringify(userOrdersArr));
        }
        const firstName = "First Name";
        const lastName = "Last Name";
        this.order.id = uuidv4();
        this.order.category = document.forms["form"].dataset["selectedcategory"];
        this.order.product = document.forms["form"].dataset["selectedproduct"];
        this.order.quantity = document.getElementById("quantity-i").value;
        this.order.price = dataShop[this.order.category][this.order.product].price*this.order.quantity;
        this.order.date = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
        this.order.time = new Date().toLocaleTimeString('en-GB', { hour12: false });


        this.order[firstName] = this.form["firstname"].value;
        this.order[lastName] = this.form["lastname"].value;
        this.order.city = document.getElementById("city").value;
        this.order.department = document.getElementById("department").value;
        this.order.commentary = document.getElementById("commentary-i").value;

        addToLocalStorage(this.order);
    }

    addGroupNames() {
        function validateName(text) {
            const regex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ' ]+$/;
            return regex.test(text);
        }

        const groupNames = this.createEl({type: "div", attributes: {class: "form-group names"}});
        const firstName = this.createTextInput({text: "Enter your first name", id: "firstname"});
        const lastName = this.createTextInput({text: "Enter your last name", id: "lastname"});
        groupNames.append(firstName);
        groupNames.append(lastName);
        this.form.append(groupNames);

        groupNames.addEventListener("focusout", (event) => {
            if (event.target.value === "") {
                event.target.parentElement.nextSibling.textContent = "You should fill this field!";
                event.target.classList.add("invalid");
            } else if (validateName(event.target.value) === false) {
                event.target.parentElement.nextSibling.textContent = "You name should contain only letters!";
                event.target.classList.add("invalid");
            } else {
                event.target.classList.remove("invalid");
                event.target.classList.add("valid");
            }
        });
        groupNames.addEventListener("focusin", (event) => {
            event.target.classList.remove("valid");
            event.target.parentElement.nextSibling.textContent = "";
        });
    }

    addGroupCities() {
        const groupCities = this.createEl({type: "div", attributes: {class: "form-group cities"}});

        const cityLabel = this.createSelectorInput({id: "city", text: "Choose your city:"});
        const cityFragment = document.createDocumentFragment();
        this._cities.forEach((el) => {
            const option = this.createEl({type: "option", attributes: {value: `${el.city}`}, text: `${el.city}`});
            cityFragment.append(option);
        })
        cityLabel.firstElementChild.append(cityFragment);

        const departmentLabel = this.createSelectorInput({id: "department", text: "Choose your department:"});
        this.updateDepartments(departmentLabel);

        cityLabel.addEventListener("change", (event) => {
            if (event.target.id === "city") {
                this.selectedCity = event.target.value;
                this.updateDepartments(departmentLabel);
            }

        })

        groupCities.append(cityLabel);
        groupCities.append(departmentLabel);
        this.form.append(groupCities);
    }

    updateDepartments(departmentLabel) {
        if (departmentLabel.firstElementChild) {
            departmentLabel.firstElementChild.remove();
            const select = this.createEl({
                type: "select",
                attributes: {id: "department", class: "form-select", name: "department"}
            });
            departmentLabel.append(select);
        }

        const departmentFragment = document.createDocumentFragment();
        const limit = Math.floor(Math.random() * (70 - 5 + 1)) + 5;
        for (let i = 1; i < limit; i++) {
            const option = this.createEl({
                type: "option",
                attributes: {value: `Nova Poshta №${i} ${this.selectedCity} UKRAINE`},
                text: `Nova Poshta №${i} ${this.selectedCity} UKRAINE`
            });
            departmentFragment.append(option);
        }
        departmentLabel.firstElementChild.append(departmentFragment);
    }

    addPayments() {
        const radio = this.createRadioBox({
            title: "Choose yor payment method: ",
            textArr: ["Online", "Cash"],
            name: "payments"
        });
        this.form.append(radio);
    }

    addQuantity() {
        const quantity = this.createNumberInput({text: "Quantity:", min: 1, defaultValue: 1});
        this.form.append(quantity);
    }

    addCommentary() {
        this.form.append(this.createTextField("Leave a comment"));
    }

    addSaveButton() {
        const saveBtn = this.createButton({type: "submit", className: "btn btn-dark", text: "Save"});
        this.form.append(saveBtn);
    }

}


class Card {
    constructor(order, type) {
        this.order = order;
        this.type = type;
        this.card = Card.createEl({type: "div", attributes: {class: "card"}});
        this.card.append(this.createTitle("Your Order:"));
        this.card.append(this.createBody(this.order, this.type));
    }

    static createEl({type, attributes, text}) {
        const el = document.createElement(type);
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }
        if (text) el.textContent = text;
        return el;
    }

    createTitle(text){
        return Card.createEl({type: "h5", attributes: {class: "card-header"}, text: text});
    }

    createBody(order){
        function createProductTitle(){
            const productName = dataShop[order.category][order.product].name
            return Card.createEl({type: "h5", attributes: {class: "card-title"}, text: `${productName}`});
        }
        function createConfirmBtn(){
            const confirmBtn = Card.createEl({ type: "button", attributes: {type: "submit", class: "btn btn-dark"}, text: "Confirm"});
            confirmBtn.addEventListener("click", () => {
                resetPage();
            })
            return confirmBtn;
        }
        function createCardInfo(){
            for (const key in order) {
                if(key === "product") continue;
                if(key === "category") continue;
                if(key === "time") continue;

                const cardText = Card.createEl({type: "p", attributes: {class: "card-text"}, text: `${key}: ${order[key]}`});
                cardBody.append(cardText);
            }
        }

        const cardBody = Card.createEl({type: "div", attributes: {class: "card-body"}});
        if(this.type === "confirmation"){
            cardBody.append(createProductTitle());
            createCardInfo();
            cardBody.append(createConfirmBtn());
        } else if (this.type === "review"){
            cardBody.append(createProductTitle());
            createCardInfo();
        }
        return cardBody;
    }
}

new ShopSystem(dataShop, cities).launchShop();

