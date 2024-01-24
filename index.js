const sanitizeHtml = require("sanitize-html");
const cheerio = require("cheerio");
const fs = require("fs");
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

// function extractTagsAndAttributesFromArray(htmlArray) {
//   const result = {};

//   htmlArray.forEach((htmlString) => {
//     const $ = cheerio.load(htmlString);

//     $("*").each(function () {
//       const tagName = $(this).get(0).tagName;

//       if (!result[tagName]) {
//         result[tagName] = new Set();
//       }

//       const attributes = $(this).attr();
//       for (let attr in attributes) {
//         result[tagName].add(attr);
//       }
//     });
//   });

//   // Convert Sets to Arrays
//   for (let tag in result) {
//     result[tag] = Array.from(result[tag]);
//   }

//   return result;
// }

// const output = extractTagsAndAttributes(htmlArray);
// const output = extractTagsAndAttributesFromArray([
//   Object.values(testHtmlStrings)[Object.values(testHtmlStrings).length - 1],
// ]);
// const tagsAndAttributes = Object.entries(output)
//   .filter(([tag, attrs]) => {
//     return attrs.length > 0;
//   })
//   .reduce((acc, [tag, attrs]) => {
//     acc[tag] = attrs;
//     return acc;
//   }, {});

// console.log(tagsAndAttributes);

// function generateSanitizerConfig(htmlString) {
//   const $ = cheerio.load(htmlString);
//   const config = {
//     allowedTags: [],
//     selfClosing: ["img", "br"],
//     allowedAttributes: {},
//     allowedStyles: {},
//   };

//   $("*").each(function () {
//     const tagName = $(this).get(0).tagName;

//     // Add tag to allowedTags if not already present
//     if (!config.allowedTags.includes(tagName)) {
//       config.allowedTags.push(tagName);
//     }

//     // Process attributes
//     const attributes = $(this).attr();
//     for (let attr in attributes) {
//       if (!config.allowedAttributes[tagName]) {
//         config.allowedAttributes[tagName] = [];
//       }
//       if (!config.allowedAttributes[tagName].includes(attr)) {
//         config.allowedAttributes[tagName].push(attr);
//       }

//       // Process styles if the attribute is 'style'
//       if (attr === "style") {
//         const styleString = attributes[attr];
//         if (!config.allowedStyles[tagName]) {
//           config.allowedStyles[tagName] = {};
//         }

//         styleString.split(";").forEach((style) => {
//           const [key, _] = style.split(":");
//           if (key && !config.allowedStyles[tagName][key.trim()]) {
//             config.allowedStyles[tagName][key.trim()] = true;
//           }
//         });
//       }
//     }
//   });

//   // Finalize allowedStyles by converting true to arrays
//   for (let tag in config.allowedStyles) {
//     config.allowedStyles[tag] = Object.keys(config.allowedStyles[tag]);
//   }

//   return config;
// }

// Example usage
// const htmlString = `...`; // Your HTML string here
const lastString =
  Object.values(testHtmlStrings)[Object.values(testHtmlStrings).length - 1];
// const sanitizerConfig = generateSanitizerConfig(lastString);
// console.log(sanitizerConfig);

function generateSanitizerConfig(htmlString, baseConfig) {
  const $ = cheerio.load(htmlString);

  $("*").each(function () {
    const tagName = $(this).get(0).tagName;

    // Add tag to allowedTags if not already present and if it's in the baseConfig
    if (baseConfig.allowedTags.includes(tagName)) {
      const attributes = $(this).attr();
      for (let attr in attributes) {
        if (
          baseConfig.allowedAttributes[tagName] &&
          !baseConfig.allowedAttributes[tagName].includes(attr)
        ) {
          baseConfig.allowedAttributes[tagName].push(attr);
        }

        // Process styles if the attribute is 'style' and the tag is in allowedStyles
        if (attr === "style" && baseConfig.allowedStyles[tagName]) {
          const styleString = attributes[attr];
          styleString.split(";").forEach((style) => {
            const [key, value] = style.split(":");
            if (key && value) {
              const trimmedKey = key.trim();
              if (!baseConfig.allowedStyles[tagName][trimmedKey]) {
                baseConfig.allowedStyles[tagName][trimmedKey] = [/^.*$/]; // Allow all values for this style
              }
            }
          });
        }
      }
    }
  });

  return baseConfig;
}

// Example usage
// const htmlString = `...`; // Your HTML string here

const baseConfig = {
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
    p: { "text-align": [/.*/], color: [/^blue$/] },
    div: { "text-align": [/^justify$/] },
    span: {
      "font-size": [/^\d+\.?\d*(?:px|rem|em|%)$/],
      "text-decoration": [/^underline$/],
    },
    img: { "vertical-align": [/.*/], height: [/.*/], width: [/.*/] },
  },
};

const updatedConfig = generateSanitizerConfig(lastString, baseConfig);
// console.log(updatedConfig);
// Write the updated configuration to a file
fs.writeFile(
  "sanitizerConfig.json",
  JSON.stringify(updatedConfig, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Config written to sanitizerConfig.json");
    }
  }
);
