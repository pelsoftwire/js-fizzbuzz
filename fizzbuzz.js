const readline = require("readline");

// This is our main function

// arguments in a dict for efficiency reasons
function genOutput(num, args) {
    var output = [];

    // --- RULES ---
    if (num % 3 === 0 && args[3]) { output.push("Fizz"); }
    if (num % 5 === 0 && args[5]) { output.push("Buzz"); }
    if (num % 7 === 0 && args[7]) { output.push("Bang"); }
    if (num % 11 === 0 && args[11]) { output = ["Bong"]; } // need to add the number back for removeNumber logic
    if (num % 13 === 0 && args[13]) {
        let i = output.findIndex(function (x) { return x[0].toLocaleLowerCase() == "b"; })
        if (i === -1) {
            output.unshift("Fezz");
        } else {
            output.splice(i,0, "Fezz");
        }
    }
    if (num % 17 === 0 && args[17]) {
        output.reverse();
    }

    // --- OUTPUT ---
    if (output.length === 0) {
        return num.toString();
    } else {
        return output.join("");
    }

}

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fizzbuzz() {

    var commandLineArgs = process.argv.slice(2);
    var commandLineDict = {
        3: false,
        5: false,
        7: false,
        11: false,
        13: false,
        17: false
    }
    commandLineArgs.forEach(function (arg) {
        if (arg === "all") {
            Object.keys(commandLineDict).forEach(function (key) {
                commandLineDict[key] = true;
            });
            // cant break out of for loop. I think this is fine, since a forEach is readable and the number of arguments should be low. I also still want to catch unrecognized arguments
        } else if (commandLineDict.hasOwnProperty(arg)) {
            commandLineDict[arg] = true;
        } else {
            console.error("Unrecognized argument " + arg);
            process.exit();
        }
    })

    reader.question("Please enter a number >> ", function(x) {
        for (var i = 1; i <= x; i++) {
            console.log(genOutput(i, commandLineDict));
        };
        reader.close();
    });

}

// Now, we run the main function:
fizzbuzz();

