const readline = require("readline");

// This is our main function
function genOutput(num) {
    var output = [];

    if (num % 3 === 0) { output.push("Fizz"); }
    if (num % 5 === 0) { output.push("Buzz"); }
    if (num % 7 === 0) { output.push("Bang"); }
    if (num % 11 === 0) { output = ["Bong"]; } // need to add the number back for removeNumber logic
    if (num % 13 === 0) {
        let i = output.findIndex(function (x) { return x[0].toLocaleLowerCase() == "b"; })
        if (i === -1) {
            output.unshift("Fezz");
        } else {
            output.splice(i,0, "Fezz");
        }
    }
    if (num % 17 === 0) {
        output.reverse();
    }
    if (output.length === 0) {
        return num.toString();
    } else {
        return output.join("");
    }

}

function fizzbuzz() {

    for (var i = 1; i <= 255; i++) {
        console.log(genOutput(i));
    }

}

// Now, we run the main function:
fizzbuzz();

