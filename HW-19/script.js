class SuperMath {
    operations = {
        "+" : function (x,y) {
            return x + y;
        },
        "-" : function (x,y) {
            return x - y;
        },
        "*" : function (x,y) {
            return x * y;
        },
        "/" : function (x,y) {
            return x / y;
        },
        "%" : function (x,y) {
            return x % y;
        }
    }
    check(obj) {
        if(!("x" in obj) || !("y" in obj)){
            console.log("All numbers are required!");
            return;
        }
        if(!("znak" in obj)) {
            console.log("There is no sign in your request.")
            return;
        }
        if(!(obj.znak in this.operations)) {
            console.log("There are no such operations");
            return;
        }
        return this.operations[obj.znak](obj.x, obj.y);
    }
}


const myMath = new SuperMath();
console.log(myMath.check({x:2, y:3, "znak": "%"}));
console.log(myMath.check({x:4, y:2, "znak": "+"}));