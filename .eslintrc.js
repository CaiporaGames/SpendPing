// .eslintrc.js
module.exports = {
  root: true,
  extends: ["@react-native", "plugin:prettier/recommended"],
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }]
  }
};
