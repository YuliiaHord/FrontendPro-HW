class Ingredient{
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }

}

class Hamburger {

    static SIZE_SMALL = new Ingredient(50,20);
    static SIZE_LARGE = new Ingredient(100,40);
    static STUFFING_CHEESE= new Ingredient(10,20);
    static STUFFING_SALAD= new Ingredient(20,5);
    static STUFFING_POTATO = new Ingredient(15,10);
    static TOPPING_MAYO = new Ingredient(20,5);
    static TOPPING_SOUCE = new Ingredient(15,0);

    constructor(size , stuffing) {
        this.ingredients = [size, stuffing];
    }
    addTopping(topping) {
        this.ingredients.push(topping);
    }

    calculateCalories() {
        let caloriesResult = 0;
        this.ingredients.forEach((ingredient) => {
            caloriesResult += ingredient.calories;
        })
        return caloriesResult;
    }

    calculatePrice() {
        let priceResult = 0;
        this.ingredients.forEach((ingredient) => {
            priceResult += ingredient.price;
        })
        return priceResult;
    }
}

const ham1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
ham1.addTopping(Hamburger.TOPPING_MAYO);
ham1.addTopping(Hamburger.TOPPING_MAYO);
console.log(ham1.calculateCalories());
console.log(ham1.calculatePrice());

const ham2 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
ham2.addTopping(Hamburger.TOPPING_SOUCE);
ham2.addTopping(Hamburger.TOPPING_MAYO);
console.log(ham2.calculateCalories());
console.log(ham2.calculatePrice());
