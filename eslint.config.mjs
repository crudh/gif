import eslintConfigPrettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import reactCompiler from "eslint-plugin-react-compiler";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [
  eslint.configs.recommended,
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  reactCompiler.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
