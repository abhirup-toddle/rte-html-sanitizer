const sanitizeHtml = require("sanitize-html");
const config = require("./configs/config");

//this is the function that needs to be run on each html string
//this will return a cleaned html string
function cleanHtml(htmlString) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

// console.log(cleanHtml(htmlString));
