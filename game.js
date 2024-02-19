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

  let min = 1;
  let max = 20;
  let numberOfTries = 1;
  let guess = Math.floor(Math.random() * (max - min + 1)) + min;
  let firstGuess = await ask(`Is this your number ${guess}? (Y/N)`);
  firstGuess = Number(firstGuess);
  // answer = Number(answer)
  // console.log(typeof answer);

  
  if(firstGuess !== secretNumber){
    // let guide = await ask(`Is it higher (H) or lower (L)?`);
    while (firstGuess !== secretNumber) {
      guess = Math.floor((min + max) / 2);
      let feedback = await ask(`Is it ... ${guess}? (Y/N)`);
      // console.log(` CHECKING ${feedback}`);
  
      if (feedback.toLowerCase() === "y" || feedback.toLowerCase() === "Y" || feedback.toLowerCase() === "yes") {//guess was correct
        break;
      } else if (feedback.toLowerCase() === "n" || feedback.toLowerCase() === "no" || feedback.toLowerCase() === " " || feedback.toLowerCase() === "N") {
        // guess was incorrect
          let guide = await ask(`Is it higher (H) or lower (L)?`);
          if (guide.toLowerCase() === "h") {
            min = guess + 1;
          } else if (guide.toLowerCase() === "l") {
            max = guess - 1;
          } else {
            console.log(
              "Invalid input, Please enter 'H' for higher or 'L' for lower."
            );
          }
      } else {
        console.log("Invalid input, Please enter 'Y' for yes or 'N' for no.");
      }
      numberOfTries++;
    }
    console.log(`Your number was ${guess}`);
    console.log(`You win!! It took you ${numberOfTries} tries!`);
    process.exit(); 
  }
}
guessNumber();

