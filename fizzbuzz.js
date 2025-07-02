/*

Command options

newrule [number] [word] [wipe (optional)] [before (optional)]-[letter]

creates a new rule that, if the number is divisible by [number], print [word] instead. if [wipe] is added, this rule will overwrite all previous rules (similar to 'Bong'). If [before]-[letter] is added, the added word will appear just before the first word beginning with [letter]

As many newrules as required can be stated, but none of the below rules can follow any newrules (newrules must be the final options)

----

3, 5, 7, 11, 13, 17

enables the rules for 3, 5, 7, 1, 13, 17 respectively

----

all

enables all hardcoded rules

 */

// TODO: encode current default rules in 'newrule' syntax

const readline = require("readline");

// This is our main function

// arguments in a dict for efficiency reasons
function genOutput(num, args, extraRules = {}) {
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

    // --- NEW RULES ---
    for (const [key, rule] of Object.entries(extraRules)) {
        if (num % key === 0) {
            if (rule.wipe) {
                output = [rule.word]
            } else if (rule.before) {
                // this is duplicated code
                let i = output.findIndex(function (x) { return x[0].toLocaleLowerCase() == rule.before.toLocaleLowerCase(); });
                if (i === -1) {
                    output.unshift(rule.word);
                } else {
                    output.splice(i,0, rule.word);
                }
            } else {
                output.push(rule.word);
            }
        }
    }

    // --- OUTPUT ---
    if (output.length === 0) {
        return num.toString();
    } else {
        return output.join("");
    }

}

// readline module
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fizzbuzz() {

    var commandLineArgs = process.argv.slice(2);

    // list of all rules (and valid command line arguments)
    var commandLineDict = {
        3: true,
        5: true,
        7: true,
        11: true,
        13: true,
        17: true
    }
    var ruleSpecified = false;

    var extraRules = {}

    // convert list into a dict for efficiency reasons
    var i = 0;
    while (i < commandLineArgs.length) {
        var arg = commandLineArgs[i];

        if (arg === "newrule") {
            var j = i + 1; // this iterator may be redundant
            // create a new rule.
            var divisor = 0;
            const newRule = {
                word: null,
                wipe: false,
                before: false
            }
            while (j < commandLineArgs.length) {
                var rarg = commandLineArgs[j];
                // stop if a new rule is encountered
                if (rarg === "newrule") {
                    break;
                // set wipe if encountered (otherwise leave it as false)
                } else if (rarg === "wipe") {
                    newRule.wipe = true;
                // allow assignment of 'before' only once
                } else if (rarg.includes("before")) {
                    if (newRule.before === false) {
                        var letter = rarg.split("-")[1];
                        newRule.before = letter;
                    } else {
                        console.error("'before' may only be assigned once in 'newrule'");
                        process.exit();
                    }
                // allow assignment of number for rule only once
                } else if (!isNaN(parseInt(rarg))) {
                    if (divisor === 0) {
                        divisor = parseInt(rarg);
                    } else {
                        console.error("divisor may only be assigned once in 'newrule'");
                        process.exit();
                    }
                // if none of the above, then assume it is the word. Allow assignment only once
                } else if (newRule.word === null) {
                    newRule.word = rarg;
                } else {
                    console.error("Unknown error parsing 'newrule'");
                    process.exit();
                }
                j++;
            }
            if (extraRules.hasOwnProperty(divisor)) {
                console.error("Can only assign one newrule before number");
                process.exit();
            }

            extraRules[divisor] = newRule;

            i = j-1;
        } else if (arg === "all") {
            Object.keys(commandLineDict).forEach(function (key) {
                commandLineDict[key] = true;
            });
            // cant break out of for loop. I think this is fine, since a forEach is readable and the number of arguments should be low. I also still want to catch unrecognized arguments
        } else if (commandLineDict.hasOwnProperty(arg)) {
            if (!ruleSpecified) {
                Object.keys(commandLineDict).forEach(function (key) {
                    commandLineDict[key] = false;
                })
                ruleSpecified = true;
            }
            commandLineDict[arg] = true;
        } else {
            console.error("Unrecognized argument " + arg);
            process.exit();
        }
        i++;
    }

    reader.question("Please enter a number >> ", function(x) {
        for (var i = 1; i <= x; i++) {
            console.log(genOutput(i, commandLineDict, extraRules));
        }
        reader.close();
    });

}

// Now, we run the main function:
fizzbuzz();

