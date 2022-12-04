module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  extends: ["eslint:recommended", "@vue/typescript/recommended", "prettier", "plugin:storybook/recommended"],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020
  },
  rules: {
    "prettier/prettier": ["error", {
      endOfLine: "auto"
    }]
  },
  overrides: [{
    files: ["vue.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  }]
};