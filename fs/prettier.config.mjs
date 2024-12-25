/**
 * Prettier configuration
 * https://prettier.io/docs/en/configuration.html
 * prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs
 */

/** @type {import("prettier").Config} */
const config = {
  semi: false,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 140,
  tabWidth: 4,
  jsxSingleQuote: false,
  arrowParens: "always",
  endOfLine: "auto",
};

export default config;
