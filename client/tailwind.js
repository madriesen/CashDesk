module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: true,
  theme: {
    extend: {
      colors: {
        black: "#1F1F1F",
        white: "#E2E2E2",
        primary: "#1FBBC2",
        secondary: "#9F4513",
        modal: "rgba(0, 0, 0, 0.5)"
      },
      spacing: {
        modal: "650px"
      }
    }
  },
  variants: {},
  plugins: []
};
