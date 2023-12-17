class ShopSystem {
    #categories = {};
    #mainRow;
    #categoryCol;
    #goodsCol;
    #infoCol;

    #createCol() {
        const colContainer = document.createElement("div");
        colContainer.className = "col";
        document.querySelector(".row").append(colContainer);
        return colContainer;
    }

    #createList(data, categoryName = null) {
        const list = document.createElement("ul");
        list.classList.add("list-group");
        const listItemFragment = document.createDocumentFragment();
        for (const key in data) {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.style.cursor = "pointer";
            listItem.textContent = key;
            if (categoryName === null) {
                listItem.setAttribute(`data-category`, key);
            } else {
                listItem.setAttribute(`data-category`, categoryName);
                listItem.setAttribute(`data-goods`, key);
            }
            listItemFragment.append(listItem);
        }
        list.append(listItemFragment);
        return list;
    }

    createCategories() {
        this.#categoryCol.textContent = "";
        this.#categoryCol.append(this.#createList(this.#categories));
    }

    createGoods(categoryName) {
        this.#goodsCol.textContent = "";
        this.#goodsCol.append(this.#createList(this.#categories[categoryName].getGoods(), categoryName));
    }

    createInfo(category, goodsName) {
        this.#infoCol.textContent = "";
        const h3 = document.createElement("h3");
        h3.textContent = goodsName;
        h3.classList.add("fs-3");
        this.#infoCol.append(h3);
        const goodsInfo = this.#categories[category].getGoods()[goodsName].getInfo();
        const textFragment = document.createDocumentFragment();
        for (const key in goodsInfo) {
            const p = document.createElement("p");
            p.textContent = `${key}: ${goodsInfo[key]}`;
            textFragment.append(p);
        }
        this.#infoCol.append(textFragment);
        const btn = document.createElement("button");
        btn.setAttribute("type", "submit");
        btn.setAttribute("id", "purchase");
        btn.classList.add("btn", "btn-dark");
        btn.textContent = "Buy";
        this.#infoCol.append(btn);
        btn.addEventListener("click", (event) => {
            if (event.target.getAttribute("id") === "purchase") {
                const notification = document.createElement("div");
                notification.classList.add("alert", "alert-success", "mt-5");
                notification.textContent = "Thank you! Your order has been successfully accepted!"
                this.#mainRow.append(notification);
                setTimeout(() => {
                    this.#mainRow.remove();
                    this.launchShop();
                }, 2500);

            }
        })
    }

    launchShop() {
        this.#mainRow = document.createElement('div');
        this.#mainRow.classList.add("row", "mt-5");
        document.querySelector(".container").append(this.#mainRow);
        this.#categoryCol = this.#createCol();
        this.createCategories();
        this.#goodsCol = this.#createCol();
        this.#infoCol = this.#createCol();
        this.#mainRow.addEventListener("click", (event) => {
            if ("goods" in event.target.dataset) {
                this.createInfo(event.target.dataset["category"], event.target.dataset["goods"]);
            } else if ("category" in event.target.dataset) {
                this.createGoods(event.target.dataset["category"]);
                this.#infoCol.textContent = "";
            }
        });

    }

    addCategory(category) {
        if (category instanceof Category) {
            this.#categories[category.name] = category;
        }
    }

}

class Category {
    #goods = {};

    constructor(name) {
        this.name = name;
    }

    addGoods(goods) {
        if (goods instanceof Goods) {
            this.#goods[goods.name] = goods;
        }
    }

    deleteGoods(goodsName) {
        delete this.#goods[goodsName];
    }

    getGoods() {
        return this.#goods;
    }
}

class Goods {
    #details = {};

    constructor(name) {
        this.name = name;
    }

    getInfo() {
        return this.#details;
    }

    addSpecificInfo(info) {
        if (typeof info === "object" && !(Array.isArray(info))) {
            this.#details = info;
        }
    }
}

const booksShop = new ShopSystem();
const goods1 = new Goods("The Great Gatsby");
const goods2 = new Goods("To Kill a Mockingbird");
goods1.addSpecificInfo({author: "F. Scott Fitzgerald", description:"A novel by F. Scott Fitzgerald...", rate: 7.8, price: "15.99"});
goods2.addSpecificInfo({author: "Harper Lee", description:"A novel by Harper Lee...", rate: 6.2, price: "8.49"});
const category1 = new Category("Novels");
category1.addGoods(goods1);
category1.addGoods(goods2);
booksShop.addCategory(category1);

const goods3 = new Goods("Dune");
const goods4 = new Goods("Ender's Game");
goods3.addSpecificInfo({description: "A science fiction novel by Frank Herbert...", author:"Frank Herbert", year: 2022, price: "18.99"});
goods4.addSpecificInfo({description: "A science fiction novel by Orson Scott Card...", author:"Orson Scott Card", year: 2022, price: "15"});
const category2 = new Category("Science Fiction");
category2.addGoods(goods3);
category2.addGoods(goods4);
booksShop.addCategory(category2);


booksShop.launchShop();