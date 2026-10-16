import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["build/**", "dist/**", "coverage/**", "node_modules/**", ".npm/**", "new_page/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    settings: { react: { version: "detect" } },
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Props are not typed in JS; TypeScript will cover this later.
      "react/prop-types": "off",
      // React 18 has no `fetchPriority` prop; the lowercase HTML attribute is
      // passed through to the DOM unchanged.
      "react/no-unknown-property": ["error", { ignore: ["fetchpriority"] }],
      // Same as CRA's config.
      eqeqeq: ["warn", "smart"],
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "src/setupTests.js", "src/test/**"],
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.vitest } },
  },
  {
    files: ["*.config.js", "scripts/**"],
    languageOptions: { globals: { ...globals.node } },
  },
];
