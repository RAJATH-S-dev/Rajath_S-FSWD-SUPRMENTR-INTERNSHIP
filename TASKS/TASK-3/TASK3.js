console.log("Number Analyzer");

const input = readline("Enter a number:");
const num1 = Number(input);


if (isNaN(num1)) {
  console.log("Invalid input! Please enter a valid number.");
} else {
  if (num1 % 2 === 0) {
    console.log("The number is even");
  } else {
    console.log("Odd number");
  }

  console.log("=================");

  for (let i = 1; i <= num1; i++) {
    console.log(`${i}`);
  }

  console.log("=================");

  const square = (n) => n * n;
  console.log(`${square(num1)}`);
}
