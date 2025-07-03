const genOutput = require("./fizzbuzz");

describe("genOutput with no commandline arguments", () => {

    jest.useFakeTimers();

    let commandLineArgs = {
        3: true,
        5: true,
        7: true,
        11: true,
        13: true,
        17: true
    }

    describe("'Fizz' rule", () => {
        test("'Fizz' rule works in isolation", () => {
            expect(genOutput(3, commandLineArgs, {})).toBe("Fizz");
        })

        test("'Fizz' rule works with other rules", () => {
            expect(genOutput(15, commandLineArgs, {})).toBe("FizzBuzz");
        })
    })

    describe("'Buzz' rule", () => {
        test("'Buzz' rule works in isolation", () => {
            expect(genOutput(5, commandLineArgs, {})).toBe("Buzz");
        })

        test("'Buzz' rule works with other rules", () => {
            expect(genOutput(15, commandLineArgs, {})).toBe("FizzBuzz");
        })
    })

    describe("'Bang' rule", () => {
        test("'Bang' rule works in isolation", () => {
            expect(genOutput(7, commandLineArgs, {})).toBe("Bang");
        })

        test("'Bang' rule works with other rules", () => {
            expect(genOutput(21, commandLineArgs, {})).toBe("FizzBang");
        })
    })

    describe("'Bong' rule", () => {
        test("'Bong' rule works in isolation", () => {
            expect(genOutput(11, commandLineArgs, {})).toBe("Bong");
        })

        test("'Bong' rule works with other rules, erasing rules of lower precedence", () => {
            expect(genOutput(33, commandLineArgs, {})).toBe("Bong");
        })

        test("'Bong' rule does not erase rules of higher precedence", () => {
            expect(genOutput(143, commandLineArgs, {})).toBe("FezzBong");
        })
    })

})