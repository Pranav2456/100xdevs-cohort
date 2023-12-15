// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

function counter(count = 0) {
  // Increment the counter
  count++;

  // Log the current count to the console
  console.log(count);

  // Schedule the next increment after 1000 milliseconds (1 second)
  setTimeout(() => {
    counter(count);
  }, 1000);
}

// Start the counter
counter();
