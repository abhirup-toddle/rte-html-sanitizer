const sanitizeHtml = require("sanitize-html");
const cheerio = require("cheerio");
const fs = require("fs");
const baseConfig = require("./config/baseConfig.js");
const htmlSample = require("./testData/sampleHtml2.js");
const newConfig = require("./config/newConfig.js");
const newTestString = require("./testData/newTestString.js");

// console.log(newTestString.length);

// console.log(htmlSample.length);
const testHtmlStrings = require("./testData/testHtmlStrings.js");

function cleanHtml(htmlString, config) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

// const lastString =
//   Object.values(testHtmlStrings)[Object.values(testHtmlStrings).length - 1];

// function generateSanitizerConfig(htmlString, baseConfig) {
//   const $ = cheerio.load(htmlString);

//   $("*").each(function () {
//     const tagName = $(this).get(0).tagName;

//     // Add tag to allowedTags if not already present and if it's in the baseConfig
//     if (baseConfig.allowedTags.includes(tagName)) {
//       const attributes = $(this).attr();
//       for (let attr in attributes) {
//         if (
//           baseConfig.allowedAttributes[tagName] &&
//           !baseConfig.allowedAttributes[tagName].includes(attr)
//         ) {
//           baseConfig.allowedAttributes[tagName].push(attr);
//         }

//         // Process styles if the attribute is 'style' and the tag is in allowedStyles
//         if (attr === "style" && baseConfig.allowedStyles[tagName]) {
//           const styleString = attributes[attr];
//           styleString.split(";").forEach((style) => {
//             const [key, value] = style.split(":");
//             if (key && value) {
//               const trimmedKey = key.trim();
//               if (!baseConfig.allowedStyles[tagName][trimmedKey]) {
//                 baseConfig.allowedStyles[tagName][trimmedKey] = [/^.*$/]; // Allow all values for this style
//               }
//             }
//           });
//         }
//       }
//     }
//   });

//   return baseConfig;
// }

// const updatedConfig = generateSanitizerConfig(lastString, baseConfig);
// const updatedConfig2 = generateSanitizerConfig(htmlSample, updatedConfig);

// const cleanedHtml = cleanHtml(htmlSample, updatedConfig);
// const cleanedHtml = cleanHtml(htmlSample, newConfig);
// const cleanedHtml = cleanHtml(htmlSample, newConfig);
const cleanedHtml = cleanHtml(newTestString, newConfig);

// let x = cleanedHtml.replace(/\"/g, "");
// let x = cleanedHtml.replace(/\\&quot;/g, "");

const currTime = new Date().toISOString();
const currHumanTime = new Date().toLocaleString();
const currTimeInMinsAndSecs = new Date()
  .toISOString()
  .split("T")[1]
  .split(".")[0]
  .replace(/:/g, "_");
const currTimeStampAsVarName = currTimeInMinsAndSecs.replace(/:/g, "_");

function getTimestamp() {
  return new Date()
    .toISOString()
    .split("T")[1]
    .split(".")[0]
    .replace(/:/g, "_");
}
// fs.writeFile(
//   `sanitizerConfig-${currTimeStampAsVarName}.json`,
//   JSON.stringify(updatedConfig2, null, 2),
//   (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//     } else {
//       console.log("Config written to sanitizerConfig.json");
//     }
//   }
// );

//create an html file with the cleaned html
function writeHtmlFile(htmlString, fileName) {
  fs.writeFile(fileName, htmlString, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(
        "Cleaned HTML written to cleanedHtml.html, ",
        currTimeStampAsVarName
      );
    }
  });
}

function getIncrementalNumber() {
  let i = 0;
  return function () {
    return i++;
  };
}

// fs.writeFile(
//   `cleanedHtml-${currTimeStampAsVarName}.html`,
//   cleanedHtml,
//   (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//     } else {
//       console.log(
//         "Cleaned HTML written to cleanedHtml.html, ",
//         currTimeStampAsVarName
//       );
//     }
//   }
// );

module.exports = {
  cleanHtml,
  getTimestamp,
  writeHtmlFile,
  getIncrementalNumber,
};
