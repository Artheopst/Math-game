var nb1 = document.querySelector('.nb1');
var nb2 = document.querySelector('.nb2');
var op = document.querySelector('.op');
var Message = document.querySelector('.Message');
var score = document.querySelector('.score span');
var link = document.querySelector('.link');
var section = document.querySelector('section');
var compteur = 0;
var startTime;
var totalTime = 0;
var elapsedTime = 0;
var timerStarted = false; // Track whether the timer has started

// Function to generate random numbers and update the display
function generateRandomNumbers() {
  var random1 = Math.floor(Math.random() * 11); // Generates numbers between 0 and 10
  var random2 = Math.floor(Math.random() * 11); // Generates numbers between 0 and 10
  var operation = getRandomOperation();

  // Adjust numbers for division to ensure integer results
  if (operation === '/') {
      while (random2 === 0) {
          random2 = Math.floor(Math.random() * 11);
      }
      random1 = random2 * Math.floor(Math.random() * 11); // Ensures random1 is a multiple of random2
  }

  nb1.innerHTML = random1;
  nb2.innerHTML = random2;
  op.innerHTML = operation;
  startTime = new Date(); // Starts the timer for the current question
  return [random1, random2, operation];
}

// Function to randomly select an operation
function getRandomOperation() {
  var operations = ['+', '-', '*', '/'];
  return operations[Math.floor(Math.random() * operations.length)];
}

// Function to calculate the correct result based on the operation
function calculateResult(num1, num2, operation) {
  switch (operation) {
      case '+':
          return num1 + num2;
      case '-':
          return num1 - num2;
      case '*':
          return num1 * num2;
      case '/':
          return Math.floor(num1 / num2);
  }
}

// Initialize random numbers at the start
var [random1, random2] = generateRandomNumbers();

// Function to handle form submission
function verifier(event) {
    event.preventDefault();
    var res = parseInt(document.querySelector('.res').value, 10);
    var correctResult = calculateResult(random1, random2, op.innerHTML);
    var currentTime = new Date();
    var timeTaken = (currentTime - startTime) / 1000; // Time taken for the current question in seconds

    if (res === correctResult) {
        totalTime += timeTaken; // Add the time taken for the current question to the total time

        Message.style.background = "green";
        Message.innerHTML = "Correct.";
        compteur++;
        score.innerHTML = compteur;
        [random1, random2] = generateRandomNumbers();
        document.querySelector('.res').value = ''; // Clear the input field
    } else {
        Message.style.background = "red";
        Message.innerHTML = `You lost. Score: ${compteur}, Total Time: ${totalTime.toFixed(2)} seconds.`;
        section.innerHTML = "";
        score.innerHTML = `<span>${compteur}</span></br> Score`;
        link.style.display = "block";
    }
}

document.getElementById('gameForm').addEventListener('submit', verifier);

document.querySelector('.res').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verifier(event);
    }
});
