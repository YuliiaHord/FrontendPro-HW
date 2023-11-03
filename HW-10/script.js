"use strict";

function removeElement(array, item) {
    return array.filter((element) => {
        if(Array.isArray(element) && Array.isArray(item)){
            let arrayString = JSON.stringify(element);
            if(arrayString === JSON.stringify(item)){
                return;
            }
        }
        return element !== item;
    });
}



