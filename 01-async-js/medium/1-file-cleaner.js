// ## File cleaner

// Read a file, remove all the extra spaces and write it back to the same file.

//For example, if the file input was

//```
//hello     world    my    name   is       raman
//```

//After the program runs, the output should be

//```
//hello world my name is raman
//```

const fs = require("fs");

function fileCleaner() {
  fs.readFile("file2.txt", "utf-8", (err, data) => {
    if (err) throw err;
    // Remove extra spaces using a regular expression
    const cleanedData = data.replace(/\s+/g, " ");
    fs.writeFile("file2.txt", cleanedData, (err) => {
      if (err) throw err;
      console.log("File cleaned");
    });
  });
}

fileCleaner();
