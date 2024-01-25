const input1 = `<p data-sessionid="" class="tde-paragraph" dir="ltr" style="text-align: center">
  <strong
      class="tde-text-bold"
      style="
        background-color: rgb(0, 0, 0);
        color: rgb(0, 0, 0);
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 13pt;
        text-decoration: none;
        white-space: pre-wrap;
      "
      >FIRST IMPRESSIONS: Start Strong!</strong
    >
</p>`;

const output1 = {
  p: {
    class: true,
    dir: true,
    style: true,
  },
  strong: {
    class: true,
    style: {
      "background-color": true,
      color: true,
      "font-family": true,
      "font-weight": true,
      "font-size": true,
      "text-decoration": true,
      "white-space": true,
    },
  },
};

const output = {
  allowedTopLevelTags: ["p", "ol"],
  allowedAttributes: {
    p: ["class", "dir", "style", "data-*"],
    ol: ["class", "dir", "style", "data-*"],
    strong: ["class", "style"],
  },
  allowedStyles: {
    p: ["text-align"],
    strong: [
      "background-color",
      "color",
      "font-family",
      "font-weight",
      "font-size",
      "text-decoration",
      "white-space",
    ],
  },
  allowedDataAttributes: {
    p: ["sessionid"],
    ol: ["sessionid"],
  },
};
