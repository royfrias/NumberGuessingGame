const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//async func declaration
async function guessNumber() {
  console.log("Let's play a game where I guess the your number !");
  // setting the range for guess using an await ask()
  // we then reassign it to max and convert to a number using the number method
  let max = await ask(`Please set the high range: `);
  max = Number(max);

  // making sure the high range is a valid number & making sure is greater than 1
  // if not it will log the invalid message
  if (isNaN(max) || max <= 1) {
    console.log(`Please enter a valid number greater then 1.`);
    process.exit();
  }

  // we prompt the user to enter the secret number
  // we then reassign it and convert it to a number using the number method
  let secretNumber = await ask("Please enter a secret number between 1 and 100. I will try to guess it! ");
  secretNumber = Number(secretNumber);
  console.log(secretNumber);

  let min = 1;
  let numberOfTries = 0;
  let guessedCorrectly = false;

  // we are checking if secretNumber is not a number and also making sure that
  // the secretNumber picked falls between 1 and the max 
  if (isNaN(secretNumber) || secretNumber < 1 || secretNumber > max) {
    console.log(`Please enter a valid number between 1 and ${max}`);
    process.exit();
  }

  // we loop through the game until we guess correctly
  while (!guessedCorrectly) {
    // we are calculating the midpoint of the current ranges
    let guess = Math.floor((min + max) / 2);
    numberOfTries++;
    let response = await ask(`Is it... ${guess}? (Y/N): `);

    // here we are confirming that the user guessed correctly
    if (response.toLowerCase() === "y" || response.toLowerCase() === "yes") {
      guessedCorrectly = true;
      console.log(`Your number was ${guess}`);
      console.log(`I guessed it in ${numberOfTries} tries!`);
    } else if ( response.toLowerCase() === "n" || feedback.toLowerCase() === "no") {// if guess is incorrect!
      let higherOrLower = await ask(`Is it higher (H) or lower (L)?`); //prompts user if guess is higher or lower
      if (higherOrLower.toLowerCase() === "h") {  // here we are checking for cheating and making sure the guess is >= to the secretNumber we then update the min to guess + 1
        if (guess >= secretNumber) {
          console.log( "Cheat detected! The guess was lower than or equal to the guess");
          process.exit();
        }
        min = guess + 1;
      } else if (higherOrLower.toLowerCase() === "l") {  // here we are checking for cheating and making sure the guess is <= to the secretNumber we then update the max to guess - 1
        if (guess <= secretNumber) {
          console.log("Cheat detected! The guess was higher than or equal to the guess");
          process.exit();
        }
        max = guess - 1;
      } else {
        // if the user input is wrong we prompt the user to enter a valid response
        console.log("Invalid input, Please enter 'H' for higher or 'L' for lower.");
      }
    } else {
      // if the user initial response is wrong we prompt the user to enter a valid response
      console.log("Invalid input, Please enter 'Y' for yes or 'N' for no.");
    }
    // here we are checking if the range is wrong we then ask the user to try again.
    if (min > max) {
      console.log(`There is an error with the input. Please try again!`);
      process.exit();
    }
  }
  readlineInterface.close();
}
guessNumber();

