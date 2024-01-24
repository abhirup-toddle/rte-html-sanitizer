const config = {
  allowedTags: [],
  selfClosing: [],
  allowedAttributes: {},
  allowedStyles: {},
};

const currentExample = {
  p: ["class", "dir", "data-sessionid", "style"],
  span: ["style", "class"],
  a: ["href", "title", "class", "rel"],
  strong: ["class", "style"],
  em: ["class", "style"],
  img: ["src", "height", "width", "alt", "data-latex", "style"],
  ul: ["class"],
  li: ["value", "class", "dir", "style"],
  ol: ["class"],
};

const desiredExample = {
  p: ["class", "dir", "data-sessionid", "style"],
  span: ["style", "class"],
  a: ["href", "title", "class", "rel"],
  strong: ["class", "style"],
  em: ["class", "style"],
  img: ["src", "height", "width", "alt", "data-latex", "style"],
  ul: ["class"],
  li: ["value", "class", "dir", "style"],
  ol: ["class"],
};
