const sanitizeHtml = require("sanitize-html");
const fs = require("fs");
const _config = require("../configs/config");
const dataSet1 = require("../testData/set1");

function getIncrementalNumber() {
  let i = 0;
  return function () {
    return i++;
  };
}
const _num = getIncrementalNumber();

function getTimestamp() {
  return new Date()
    .toISOString()
    .split("T")[1]
    .split(".")[0]
    .replace(/:/g, "_");
}

function cleanHtml(htmlString, config) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

function cleanHtmlStrings(htmlStrings, config) {
  const cleanedHtmlStrings = htmlStrings.map((htmlString) => {
    return cleanHtml(htmlString, config);
  });
  return cleanedHtmlStrings;
}

function writeHtmlStringsToFile(cleanedHtmlStrings) {
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

function convertHtmlStringArrayToHtmlFile(htmlStringArray) {
  const _htmlStringArray = cleanHtmlStrings(htmlStringArray, _config);
  writeHtmlStringsToFile(_htmlStringArray);
}

convertHtmlStringArrayToHtmlFile(dataSet1);
