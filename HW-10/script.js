"use strict";

function removeElement(array, item) {
    for (let i = 0; i < array.length; i++){
        if(Array.isArray(array[i]) && Array.isArray(item)) {
            let arrayString = "";
            arrayString = String(array[i].sort());
            if(arrayString === String(item.sort())){
                array.splice(i, 1);
                i--;
                continue;
            }
        }
        if(array[i] === item) {
            array.splice(i, 1);
            i--;
        }
    }
    return array;
}

