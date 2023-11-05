"use strict";

function cumulateSum(){
    let result = 0;
    return function (value){
        return result+=value;
    }
}
const sum = cumulateSum();
