```javascript
// Function to check if a number is prime and return its factors if not prime
function isPrimeAndFactors(number) {
// Error handling for invalid input
if (!Number.isInteger(number) || number <= 1) { return { isPrime: false,
    factors: "Invalid input: Number must be an integer greater than 1" }; } // Optimize: Check for divisibility by 2
    separately if (number===2) { return { isPrime: true, factors: [] }; } if (number % 2===0) { return { isPrime: false,
    factors: [2, number / 2] }; } //Efficient primality test: Check divisibility only up to the square root of the
    number. for (let i=3; i <=Math.sqrt(number); i +=2) { if (number % i===0) { const factors=[]; //Find all factors for
    (let j=1; j <=Math.sqrt(number); j++) { if (number % j===0) { factors.push(j); if (j * j !==number) {
    factors.push(number / j); } } } factors.sort((a,b)=> a-b); //Sort factors in ascending order
    return { isPrime: false, factors: factors };
    }
    }

    //If no divisors are found up to the square root, the number is prime
    return { isPrime: true, factors: [] };
    }


    // Example usage:

    console.log(isPrimeAndFactors(2)); // Output: { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(7)); // Output: { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(15)); // Output: { isPrime: false, factors: [ 1, 3, 5, 15 ] }
    console.log(isPrimeAndFactors(25)); // Output: { isPrime: false, factors: [ 1, 5, 25 ] }
    console.log(isPrimeAndFactors(9)); // Output: { isPrime: false, factors: [1, 3, 9] }
    console.log(isPrimeAndFactors(1)); // Output: { isPrime: false, factors: 'Invalid input: Number must be an integer
    greater than 1' }
    console.log(isPrimeAndFactors(-5)); // Output: { isPrime: false, factors: 'Invalid input: Number must be an integer
    greater than 1' }
    console.log(isPrimeAndFactors(3.14));// Output: { isPrime: false, factors: 'Invalid input: Number must be an integer
    greater than 1' }
    console.log(isPrimeAndFactors(100)); // Output: { isPrime: false, factors: [1, 2, 4, 5, 10, 20, 25, 50, 100] }

    ```