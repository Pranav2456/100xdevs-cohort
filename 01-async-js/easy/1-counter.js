// # Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second

function counter() {
  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    console.log(count);
  }, 1000);
}

counter();

// Uncomment the following lines if you want to stop the counter after a specific duration (e.g., 10 seconds)
// setTimeout(() => {
//   clearInterval(intervalId);
//   console.log('Counter stopped.');
// }, 10000);
