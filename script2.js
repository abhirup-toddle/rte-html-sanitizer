const sanitizeHtml = require("sanitize-html");
const c3 = require("./config/c3");

function cleanHtml(htmlString, config) {
  const cleanedHtml = sanitizeHtml(htmlString, config);
  return cleanedHtml;
}

let x = `<ul style="list-style-type: circle;" class="unordered">
  <li class="element">Item one</li>
  <li class="element">Item two</li>
</ul>`;
x = `<img src="example.jpg" alt="Example" class="image" style="display: block; height: 100px; width: 100px; vertical-align: middle;" data-latex="formula" />`;

console.log(cleanHtml(x, c3));
