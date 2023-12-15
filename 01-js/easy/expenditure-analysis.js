/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const categoryTotals = {};
  transactions.forEach((transaction) => {
    const { category, price } = transaction; // Now we don't have to use transaction extension everywhere.

    if (!categoryTotals[category]) {
      categoryTotals[category] = price;
    } else {
      categoryTotals[category] += price;
    }
  });

  const result = Object.keys(categoryTotals).map((category) => ({
    category,
    totalSpent: categoryTotals[category],
  })); // Here we convert the single object into an array of objects, on the basis of the given values.Generally follow this to convert an object into an array of objects.
  // Object.keys returns an array of keys of the object, on the basis of the keys we map the array and return the required values.
  return result;
}

module.exports = calculateTotalSpentByCategory;
