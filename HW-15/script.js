"use strict";

function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

function Apartment(){
    this.residents = [];
}

const apartmentMethod = {
    addResident: function (person) {
        this.residents.push(person);
    },
}

Apartment.prototype = Object.assign(Apartment.prototype, apartmentMethod);

function House(maxApartments) {
    this.maxApartments = maxApartments;
    this.apartments = [];
}

const houseMethod = {
    addApartment: function (apartment){
        if(this.apartments.length < this.maxApartments){
            this.apartments.push(apartment);
        } else {
            console.log("You have exceeded the available number of apartments in this area.")
        }
    },
}

House.prototype = Object.assign(House.prototype, houseMethod);

const resident1 = new Person("Ivan", "male");
const resident2 = new Person("Anna", "female");
const resident3 = new Person("Ruslan", "male");
const resident4 = new Person("Olha", "female");

const apartment1 = new Apartment();
const apartment2 = new Apartment();
const apartment3 = new Apartment();
const apartment4 = new Apartment();

apartment1.addResident(resident1);
apartment2.addResident(resident2);
apartment3.addResident(resident3);
apartment4.addResident(resident4);

const house157A = new House(3);
house157A.addApartment(apartment1);
house157A.addApartment(apartment2);
house157A.addApartment(apartment3);

/*house157A.addApartment(apartment4);*/
