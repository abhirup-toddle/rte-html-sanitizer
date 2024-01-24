const sanitizeHtml = require("sanitize-html");
const cheerio = require("cheerio");
// import { stringsToTest } from "./testHtmlStrings";
const testHtmlStrings = require("./testHtmlStrings.js");

function cleanHtml(htmlString) {
  const config = {
    allowedTags: [
      "a",
      "ol",
      "ul",
      "li",
      "em",
      "div",
      "span",
      "strong",
      "p",
      "img",
      "b",
    ],
    selfClosing: ["br", "img"],
    allowedAttributes: {
      p: ["style", "class"],
      a: ["rel", "href", "target"],
      div: ["style"],
      span: ["style"],
      img: [
        "data-*",
        "src",
        "style",
        "alt",
        "class",
        "height",
        "width",
        "vertical-align",
        "display",
      ],
    },
    allowedStyles: {
      p: {
        "text-align": [/.*/],
        color: [/^blue$/],
      },
      div: {
        "text-align": [/^justify$/],
      },
      span: {
        "font-size": [/^\d+\.?\d*(?:px|rem|em|%)$/],
        "text-decoration": [/^underline$/],
      },
      img: {
        "vertical-align": [/.*/],
        height: [/.*/],
        width: [/.*/],
      },
    },
  };

  // Use sanitize-html to clean the HTML
  const cleanedHtml = sanitizeHtml(htmlString, config);

  return cleanedHtml;
}

// function extractTagsAndAttributes(htmlArray) {
//   const result = {};

//   htmlArray.forEach((htmlString) => {
//     const $ = cheerio.load(htmlString);

//     $("*").each(function () {
//       const tagName = $(this).get(0).tagName;
//       const attributes = $(this).attr();

//       if (!result[tagName]) {
//         result[tagName] = {};
//       }

//       for (let attr in attributes) {
//         if (attr === "style") {
//           if (!result[tagName][attr]) {
//             result[tagName][attr] = {};
//           }

//           const styleString = attributes[attr];
//           styleString.split(";").forEach((style) => {
//             const [key, value] = style.split(":");
//             if (key && value) {
//               result[tagName][attr][key.trim()] = true;
//             }
//           });
//         } else {
//           result[tagName][attr] = true;
//         }
//       }
//     });
//   });

//   return result;
// }

function extractTagsAndAttributesFromArray(htmlArray) {
  const result = {};

  htmlArray.forEach((htmlString) => {
    const $ = cheerio.load(htmlString);

    $("*").each(function () {
      const tagName = $(this).get(0).tagName;

      if (!result[tagName]) {
        result[tagName] = new Set();
      }

      const attributes = $(this).attr();
      for (let attr in attributes) {
        result[tagName].add(attr);
      }
    });
  });

  // Convert Sets to Arrays
  for (let tag in result) {
    result[tag] = Array.from(result[tag]);
  }

  return result;
}
// Example usage
const htmlArray = [
  `<p class="tde-paragraph" dir="ltr" style="text-align: center">
     <strong
         class="tde-text-bold"
         style="
           background-color: rgb(0, 0, 0);
           color: rgb(0, 0, 0);
           font-family: Arial, sans-serif;
           font-weight: 700;
           font-size: 13pt;
           text-decoration: none;
           white-space: pre-wrap;
         "
         >FIRST IMPRESSIONS: Start Strong!</strong
       >
   </p>`,
];

// const output = extractTagsAndAttributes(htmlArray);
const output = extractTagsAndAttributesFromArray([
  Object.values(testHtmlStrings)[Object.values(testHtmlStrings).length - 1],
]);
const tagsAndAttributes = Object.entries(output)
  .filter(([tag, attrs]) => {
    return attrs.length > 0;
  })
  .reduce((acc, [tag, attrs]) => {
    acc[tag] = attrs;
    return acc;
  }, {});

console.log(tagsAndAttributes);
// console.log(output);

// Example usage:
// const htmlString = `<p class=\"tde-paragraph\" style=\"text-align: center;
// background-color: transparent;
// color: red;
// font-family: Georgia, serif;\"
// ><img src=\"https://cloud.toddleapp.com/thumber/fit-in/1080x1080/https://cloud.toddleapp.com/eu-west-1/p/_oaXnWM/content/rt/uploads/YYpe9DmMuz/HUK7yXdNz.png\" height=\"96\" width=\"931\" alt=\"18924_3.png\" style=\"display: inline;\"></p>
// <p class=\"tde-paragraph\" dir=\"ltr\">
// <h3 class=\"tde-heading-h3\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"background-color: transparent; color: rgb(32, 33, 34); font-family: Georgia, serif; font-weight: 400; font-size: 20pt; text-decoration: none; white-space: pre-wrap;\">Oil spill near Black Sea as storm sinks three  ships</span></h3>
// </p>
// `;

// const cleanedHtml = cleanHtml(htmlString);
// console.log(cleanedHtml);
// console.log(Object.values(testHtmlStrings)[0].length);
