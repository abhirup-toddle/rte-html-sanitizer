const sanitizeHtml = require("sanitize-html");

//config object for sanitizing html
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
    "i",
    "br",
  ],
  selfClosing: ["br", "img"],
  allowedAttributes: {
    p: ["style", "class", "dir", "data-sessionid"],
    ol: ["style", "class", "dir", "data-sessionid"],
    ul: ["style", "class", "dir", "data-sessionid"],
    li: ["value", "class", "dir", "style"],
    a: ["rel", "href", "target", "title", "class"],
    div: ["style"],
    span: ["style", "class"],
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
      "data-latex",
    ],
    i: ["class"],
    strong: ["class", "style"],
    em: ["class", "style"],
  },
  allowedStyles: {
    p: {
      "text-align": [/^.*$/],
      "padding-inline-start": [/^.*$/],
    },
    ul: {
      "padding-inline-start": [/^.*$/],
      "list-style-type": [/^.*$/],
    },
    ol: {
      "padding-inline-start": [/^.*$/],
    },
    li: {
      "padding-inline-start": [/^.*$/],
      "text-align": [/^.*$/],
    },
    div: {
      "text-align": [/^.*$/],
    },
    span: {
      "font-size": [/^(14px|16px|18px)$/],
      "text-decoration": [/^underline$/],
      "white-space": [/^pre-wrap$/],
    },
    img: {
      "vertical-align": [/^.*$/],
      height: [/^.*$/],
      width: [/^.*$/],
      display: [/^(inline|block)$/],
    },
    strong: {
      "font-size": [/^(14px|16px|18px)$/],
    },
    em: {
      "font-size": [/^(14px|16px|18px)$/],
    },
  },
  transformTags: {
    h1: "p",
    h2: "p",
    h3: "p",
    h4: "p",
    h5: "p",
    h6: "p",
  },
};

//this is the function that needs to be run on each html string
function cleanHtml(htmlString) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

// console.log(cleanHtml(htmlString));
