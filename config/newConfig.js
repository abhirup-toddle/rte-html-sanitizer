const newConfig = {
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
  ],
  selfClosing: ["br", "img"],
  allowedAttributes: {
    p: ["style", "class", "dir", "data-sessionid"],
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
      "text-align": [{}],
      "padding-inline-start": [{}],
    },
    div: {
      "text-align": [{}],
    },
    span: {
      "font-size": [{}],
      "text-decoration": [{}],
      "white-space": [{}],
    },
    img: {
      "vertical-align": [{}],
      height: [{}],
      width: [{}],
      display: [{}],
    },
    strong: {
      "font-size": [{}],
    },
    em: {
      "font-size": [{}],
    },
  },
};
module.exports = newConfig;
