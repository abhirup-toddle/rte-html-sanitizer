const sanitizeHtml = require("sanitize-html");
const fs = require("fs");

function cleanHtml(htmlString, config) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

function getTimestamp() {
  return new Date()
    .toISOString()
    .split("T")[1]
    .split(".")[0]
    .replace(/:/g, "_");
}

//create an html file with the cleaned html
function writeHtmlFile(htmlString, fileName) {
  fs.writeFile(fileName, htmlString, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Cleaned HTML written to cleanedHtml.html, ", getTimestamp());
    }
  });
}

//to create a unique incremental number
function getIncrementalNumber() {
  let i = 0;
  return function () {
    return i++;
  };
}

module.exports = {
  cleanHtml,
  getTimestamp,
  writeHtmlFile,
  getIncrementalNumber,
};
