const readline = require("readline");

let AlienNum = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
};

function alienNumberToDecimal(alienNum) {
    let total = 0;
    let explanation = [];

    let s = alienNum.toUpperCase();
    let i = 0;

    while (i < s.length) {
        let current = AlienNum[s[i]];
        let next = AlienNum[s[i + 1]];

        // Subtractive case (like CR = 900)
        if (next && current < next) {
            total += next - current;
            explanation.push(`${s[i]}${s[i + 1]} = ${next - current}`);
            i += 2;
        } else {
            // Count repeated identical characters (like A A A)
            let count = 1;
            while (i + count < s.length && s[i] === s[i + count]) {
                count++;
            }

            if (count > 1) {
                let repeatedStr = s.slice(i, i + count);
                total += current * count;
                explanation.push(`${repeatedStr} = ${current * count}`);
                i += count;
            } else {
                total += current;
                explanation.push(`${s[i]} = ${current}`);
                i++;
            }
        }
    }

    return {
        total,
        explanation
    };
}
// Test cases
console.log("Test Cases for Alien Number to Decimal Converter");
console.log(alienNumberToDecimal("AAA"));
console.log(alienNumberToDecimal("LBAAA"));
console.log(alienNumberToDecimal("RCRZCAB"));

// Interactive prompt for user input
console.log("\nEnter an alien number to convert it to decimal.\n");
console.log("Type 'end' to exit.\n");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askInput() {
    rl.question("Enter alien number (e.g., AAA, LBAAA, RCRZCAB): ", (s) => {
        if (s.trim().toLowerCase() === "end") {
            console.log("Exiting program. Goodbye!");
            rl.close();
            return;
        }

        let result = alienNumberToDecimal(s);

        console.log(`\nInput: s = "${s.toUpperCase()}"`);
        console.log(`Output: ${result.total}`);
        console.log("Explanation: " + result.explanation.join(', ') + ".\n");

        askInput(); // 🔁 Repeat
    });
}

askInput();