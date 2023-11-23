class SuperMath {
    operations = {
        "+": {
            "add": function (x, y) {
                return x + y;
            }
        },
        "-": {
            "subtract": function (x, y) {
                return x - y;
            }
        },
        "*": {
            "multiply": function (x, y) {
                return x * y;
            }
        },
        "/": {
            "divide": function (x, y) {
                return x / y;
            }
        },
        "%": {
            "modulo": function (x, y) {
                return x % y;
            }
        }
    }

    check(obj) {
        if (!("x" in obj) || !("y" in obj)) {
            alert("All numbers are required!");
            return;
        }
        if (!("znak" in obj)) {
            alert("There is no sign in your request.")
            return;
        }
        if (!(obj.znak in this.operations)) {
            alert("There are no such operations");
            return;
        }
        const operation = this.operations[obj.znak];
        const operationName = Object.keys(operation)[0];
        if (!(confirm(`Do you want to ${operationName} these digits?`))) {
            return this.check(this.input());
        }
        return operation[operationName](obj.x, obj.y);
    }

    input(x = null) {
        if (x === null) {
            x = parseFloat(prompt("Enter your first digit", 0));
            if (Number.isNaN(x)) {
                alert("Please add valid first digit");
                return this.input();
            }
        }
        const y = parseFloat(prompt("Enter your second digit", 0));
        if (Number.isNaN(y)) {
            alert("Please add valid second digit");
            return this.input(x);
        }
        const znak = prompt("Enter your sign (+, -, *, /, %)");
        return {"x": x, "y": y, "znak": znak};
    }
}


const myMath = new SuperMath();
const result = myMath.check(myMath.input());
if (result !== undefined) {
    alert(result);
}