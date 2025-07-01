// This is our main function
function genOutput(num) {
    var output = num.toString();
    var numberLength = output.length;

    var removeNumber = false;
    if (num % 3 == 0) { removeNumber = true; output += "Fizz" }
    if (num % 5 == 0) { removeNumber = true; output += "Buzz" }
    if (removeNumber) { output = output.slice(numberLength) }
    return output;
}

function fizzbuzz() {

    for (var i = 1; i <= 100; i++) {
        console.log(genOutput(i));
    }

}

// Now, we run the main function:
fizzbuzz();

