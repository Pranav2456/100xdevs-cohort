/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * t1);
  });
}

function wait2(t2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * t2);
  });
}

function wait3(t3) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * t3);
  });
}

async function calculateTime(t1, t2, t3) {
  const start = Date.now();
  await Promise.all([wait1(t1), wait2(t2), wait3(t3)]);
  const end = Date.now();
  return end - start;
}

// Note: Promise.all() takes an array of promises as an argumentn and returns a single promise.
// Note: for concurrent and independent asynchronous operations,
// Promise.all is generally more efficient and can result in a
// shorter overall execution time compared to a promise chain.
module.exports = calculateTime;
