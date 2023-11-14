class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    showInfo() {
        console.log(`This person name is ${this.name}. The age is ${this.age}.`);
    }
}

class Car {
    constructor(brand, model, year, vin) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.vin = vin;
        this.owner = null;
    }
    addOwner(person){
        if(person instanceof Person){
            if(person.age > 18){
                this.owner = person;
            } else {
                console.log("You are not yet of legal age!")
            }
        }
    }
    showInfo() {
        console.log(`This car has such brand: ${this.brand}, such model: ${this.model}, such year of production: ${this.year}, such VIN:${this.vin}. Owner: `);
            if(this.owner){
                this.owner.showInfo();
            } else {
                console.log("It has no owner.");
            }
    }
}

const person1 = new Person("Andrii", 21);
const person2 = new Person("Anna", 16);
const person3 = new Person("Toma", 32);

const car1 = new Car('Toyota', 'Camry', 1990,  'ABC123456789');
const car2 = new Car('Ford', 'Mustang', 2000, 'DEF987654321');
const car3 = new Car('Honda', 'Civic', 1980, 'GHI567890123');

car1.addOwner(person1);
car1.showInfo();
car2.addOwner(person2);
car2.showInfo();





