const sanitizeHtml = require("sanitize-html");

const RTE_config = {
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
      "text-align": [/^justify$/],
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

const test_config = {
  allowedTags: ["p"], // Specify only the 'p' tag
  allowedAttributes: {
    p: ["style"], // Allow the 'style' attribute for 'p' tags
  },
  allowedStyles: {
    p: {
      "text-decoration": [
        //allow strikethrough and underline text-decoration
        /^underline$/,
        /^strikethrough$/,
      ], // Only allow 'text-decoration: none'
      "white-space": [/^pre-wrap$/], // Only allow 'white-space: pre-wrap'
    },
  },
};

function cleanHtml(htmlString, config) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

const x = `<h1>Hello world</h1>
    <p
      style="
        white-space: pre-wrap;
        text-decoration: strikethrough;
        text-align: justify;
        display: flex;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: large;
      "
    >
      hello there
    </p>`;

console.log(cleanHtml(x, test_config));
