//## Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

const fs = require("fs");

function readFile() {
  fs.readFile("file.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

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

readFile();
counter();

// Note when I ran this together, what I noticed was that the counter function was called first,
// and then the readFile function was called. This is because the readFile function is asychronous,
// and the counter function is synchronous.So, basically there was an interruption.
