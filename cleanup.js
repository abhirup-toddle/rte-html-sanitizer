const sanitizeHtml = require("sanitize-html");
const fs = require("fs");
const newConfig = require("./generatedFiles/newConfig");
const dataSet2 = require("./testData/dataSet2");
const {
  cleanHtml,
  writeHtmlFile,
  getIncrementalNumber,
  getTimestamp,
} = require("./cleanHtml2");

const _num = getIncrementalNumber();

// function writeHtmlFiles(dataSet, config) {
//   dataSet.forEach((htmlString) => {
//     const cleanedHtml = cleanHtml(htmlString, config);
//     const fileName = `cleanedUp-${_num()}.html`;
//     console.log(fileName);
//     writeHtmlFile(cleanedHtml, fileName);
//   });
// }

//create a function that will take in an array of html strings and return an array of cleaned html strings
function cleanHtmlStrings(htmlStrings, config) {
  const cleanedHtmlStrings = htmlStrings.map((htmlString) => {
    return cleanHtml(htmlString, config);
  });
  return cleanedHtmlStrings;
}

function writeHtmlStringsToFile(cleanedHtmlStrings) {
  // Format the array as a JavaScript array assignment
  const fileName = `output-${getTimestamp()}.js`;
  const jsContent = `export const strings = ${JSON.stringify(
    cleanedHtmlStrings,
    null,
    2
  )};`;

  fs.writeFile(fileName, jsContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`Array written to ${fileName}`);
    }
  });
}

//write a function to write the cleaned html strings array to a file
// function writeHtmlStringsToFile(cleanedHtmlStrings) {
//   // cleanedHtmlStrings.forEach((cleanedHtmlString) => {
//   fs.writeFile(
//     `cleanedhtmlStringArray2.json`,
//     JSON.stringify(cleanedHtmlStrings, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//       } else {
//         console.log("Config written to sanitizerConfig.json");
//       }
//     }
//   );
//   // });
// }
// function writeHtmlStringsToFile(cleanedHtmlStrings) {
//   // cleanedHtmlStrings.forEach((cleanedHtmlString) => {
//   fs.writeFile(
//     `cleanedhtmlStringArray2.json`,
//     JSON.stringify(cleanedHtmlStrings, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//       } else {
//         console.log("Config written to sanitizerConfig.json");
//       }
//     }
//   );
//   // });
// }

function convertHtmlStringArrayToHtmlFile(htmlStringArray) {
  const _htmlStringArray = cleanHtmlStrings(htmlStringArray, newConfig);
  // console.log(_htmlStringArray.length);
  writeHtmlStringsToFile(_htmlStringArray);
}

convertHtmlStringArrayToHtmlFile(dataSet2);

// // writeHtmlFile(cleanedHtml);
// const firstTwo = dataSet2.slice(0, 2);
// writeHtmlFiles(dataSet2, newConfig);
