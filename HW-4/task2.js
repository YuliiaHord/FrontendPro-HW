"use strict";

const distanceKm = Number(prompt("Please, enter your distance in km", "0"));
const distanceFoot = Number(prompt("Please, enter your distance in feet", "0"));

const footToMeters = 0.305;
const kmToMeters = 1000;

const distanceKmMeters = distanceKm * kmToMeters;
const distanceFeetMeters = distanceFoot * footToMeters;

if (distanceKmMeters < distanceFeetMeters) {
    alert(`${distanceKm}km is smaller`);
} else if (distanceKmMeters > distanceFeetMeters) {
    alert(`${distanceFoot} feet is smaller`);
} else {
    alert(`${distanceFoot} feet and ${distanceKm}km are equal`);
}
