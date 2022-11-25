const plugin = require("tailwindcss/plugin");

const custom = () => {
  return plugin(function ({ addBase, addComponents, theme }) {
    addBase({
      ul: {
        padding: "0 20px",
        margin: "0 20px",
        listStyle: "disc",
      },
      ol: {
        padding: "0 20px",
        margin: "0 20px",
        listStyle: "decimal",
      },
      li: {
        paddingTop: "5px",
      },
      blockquote: {
        borderRadius: "5px",
        padding: "15px",
        backgroundColor: theme("colors.gray[200]"),
      },
      span: {
        fontSize: theme("fontSize.md"),
      },
      a: {
        outline: "initial",
        fontSize: theme("fontSize.base"),
      },
      table: {
        fontSize: theme("fontSize.base"),
      },
      p: {
        fontSize: theme("fontSize.base"),
      },
      b: {
        fontSize: theme("fontSize.base"),
      },
      i: {
        fontSize: theme("fontSize.base"),
      },
      h1: {
        fontSize: theme("fontSize.4xl"),
      },
      h2: {
        fontSize: theme("fontSize.3xl"),
      },
      h3: {
        fontSize: theme("fontSize.2xl"),
      },
      h4: {
        fontSize: theme("fontSize.xl"),
      },
      code: {
        backgroundColor: theme("colors.gray[200]"),
        color: theme("colors.pink[600]"),
        borderRadius: "2px",
        padding: "0 2px",
      },
    });
    addComponents({
      html: {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "16px",
      },
      ".dark code": {
        backgroundColor: theme("colors.gray[800]"),
        color: theme("colors.pink[400]"),
      },
      ".dark blockquote": {
        backgroundColor: theme("colors.gray[800]"),
      },
      ".md-content": {
        a: {
          color: theme("colors.blue[500]"),
        },
        ".img-lightbox": {
          cursor: "pointer",
        },
      },
      ".dark table": {
        thead: {
          backgroundColor: theme("colors.gray[800]"),
        },
      },
      table: {
        thead: {
          backgroundColor: theme("colors.gray[200]"),
          borderRadius: "5px",
        },
        th: {
          textAlign: "left",
          padding: "5px",
        },
        "th:first-child": {
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        },
        "th:last-child": {
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
        },
        td: {
          padding: "5px",
        },
      },
      // Tailwind seems to break down when you want to apply
      // styles to child elements during an event
      ".card": {
        "&:hover": {
          "& .card-img": {
            borderColor: theme("colors.primary-blue"),
          },
        },
        "&:focus-visible": {
          "& .card-body": {
            borderColor: theme("colors.primary-blue"),
          },
        },
      },
    });
  });
};

module.exports = custom;
