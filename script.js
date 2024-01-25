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
x = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello world</h1>
    <div
      style="
        display: flex;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: large;
      "
    >
      hello there
    </div>
  </body>
</html>
`;

console.log(cleanHtml(x, c3));
