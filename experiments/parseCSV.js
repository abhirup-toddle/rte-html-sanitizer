const fs = require("fs");
const Papa = require("papaparse");
const getSanitizedHtmlStringArray = require("../experiments/cleanup");

// const csvFilePath =
//   "/Users/abhirup/Downloads/html-sanitizer/testData/dataset2.csv";
const csvFilePath =
  "/Users/abhirup/Downloads/html-sanitizer/testData/dataset3.csv";

// Read the CSV file
const csvFile = fs.readFileSync(csvFilePath, "utf8");

// Parse the CSV file
Papa.parse(csvFile, {
  header: true, // Assumes the first row of the CSV file contains column headers
  complete: function (results) {
    // Extract 'value' from each row
    const values = results.data
      .map((row) => {
        //filter files that have a data-latex property
        if (row?.value?.includes("data-latex")) {
          // return row.value;
          const cleanedString = row?.value
            ?.replace(/\"/g, "")
            ?.replace(/\\/g, "");
          return cleanedString;
        }
      })
      .filter((row) => Boolean(row))
      .slice(10, 100);
    console.log("values: ", values.length);
    getSanitizedHtmlStringArray(values);
  },
});

// function parseCSV(csvFilePath) {
//   // Read the CSV file
//   const csvFile = fs.readFileSync(csvFilePath, "utf8");

//   // // Parse the CSV file
//   Papa.parse(csvFile, {
//     header: true, // Assumes the first row of the CSV file contains column headers
//     complete: function (results) {
//       // Extract 'value' from each row
//       const values = results.data
//         .map((row) => {
//           const cleanedString = row?.value
//             ?.replace(/\"/g, "")
//             ?.replace(/\\/g, "");
//           return cleanedString;
//         })
//         .slice(10, 100);
//       console.log("values: ", values.length);
//       getSanitizedHtmlStringArray(values);
//     },
//   });
// }
