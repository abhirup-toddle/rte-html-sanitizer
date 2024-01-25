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
  ],
  selfClosing: ["br", "img"],
  allowedAttributes: {
    p: ["style", "class", "dir", "data-sessionid"],
    ol: ["style", "class", "dir", "data-sessionid"],
    ul: ["style", "class", "dir", "data-sessionid"],
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
      "text-align": [/^justify$/],
    },
    div: {
      "text-align": [/^.*$/], // Allow any value for text-align
    },
    span: {
      "font-size": [/^(14px|16px|18px)$/],
      "text-decoration": [/^underline$/],
      "white-space": [/^pre-wrap$/],
    },
    img: {
      "vertical-align": [/^.*$/], // Allow any value
      height: [/^.*$/], // Allow any value
      width: [/^.*$/], // Allow any value
      display: [/^(inline|block)$/],
    },
    strong: {
      "font-size": [/^(14px|16px|18px)$/],
    },
    em: {
      "font-size": [/^(14px|16px|18px)$/],
    },
  },
};
