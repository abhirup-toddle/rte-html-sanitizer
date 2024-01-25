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

module.exports = baseConfig;
