import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          singleQuote: false,
          tabWidth: 2,
          useTabs: false,
          trailingComma: "all",
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "auto",
        },
      ],
    },
  },
]);
