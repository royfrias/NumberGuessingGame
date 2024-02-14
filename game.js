// Instructions for Guessing Game
/*
1. Player 1 thinks of a number and enters the number
2. Player 2 guesses a number 
3. Player 1 will respond (it is "higher", "lower", or "correct")
4. repeat 2 & 3 until Player 2 guesses correctly
5. repeat 1-4 with Player 1 guessing
*/

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


async function guessNumber(){
  console.log("Let's play a game where I guess the Computer's number !")
  let secretNumber = await ask("Please enter a secret number: ");
  secretNumber = Number(secretNumber);
  // console.log(`You entered: ${secretNumber}`);

  let min = 1;
  let max = 100;
  let guess; 
  let numberOfTries = 1;
  let answer = Math.floor(Math.random() * (max - min + 1)) + min;
  answer = Number(answer)
  console.log(typeof answer);


  while (answer !== secretNumber) {
    guess = Math.floor((min + max) / 2);
    let feedback = await ask(`Is it ... ${guess}? (Y/N)`);


    
    if (feedback.toLowerCase() === "y") {
      console.log(`Your number was ${guess}`);
      break;
    } else if (feedback.toLowerCase() === "n") {
      let guide = await ask("Is it higher (H) or lower (L)? ");
      if (guide.toLowerCase() === "h") {
        min = guess + 1;
      } else if (guide.toLowerCase() === "l") {
        max = guess - 1;
      } else {
        console.log("Please enter 'H' for higher or 'L' for lower.");
      }
    } else {
      console.log("Please enter 'Y' for yes or 'N' for no.");
    }
    numberOfTries++;
  }

  console.log(`Number of tries: ${numberOfTries}`);
  process.exit(); 
}

guessNumber();

