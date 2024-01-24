const sanitizeHtml = require("sanitize-html");

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

// Example usage:
const htmlString = `<p class=\"tde-paragraph\" style=\"text-align: center; 
background-color: transparent; 
color: red; 
font-family: Georgia, serif;\"
><img src=\"https://cloud.toddleapp.com/thumber/fit-in/1080x1080/https://cloud.toddleapp.com/eu-west-1/p/_oaXnWM/content/rt/uploads/YYpe9DmMuz/HUK7yXdNz.png\" height=\"96\" width=\"931\" alt=\"18924_3.png\" style=\"display: inline;\"></p>
<p class=\"tde-paragraph\" dir=\"ltr\">
<h3 class=\"tde-heading-h3\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"background-color: transparent; color: rgb(32, 33, 34); font-family: Georgia, serif; font-weight: 400; font-size: 20pt; text-decoration: none; white-space: pre-wrap;\">Oil spill near Black Sea as storm sinks three  ships</span></h3>
</p>
`;
const cleanedHtml = cleanHtml(htmlString);
console.log(cleanedHtml);
