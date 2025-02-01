import eslintConfigPrettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import reactCompiler from "eslint-plugin-react-compiler";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [
  {
    rules: {
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": 0,
    },
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  reactCompiler.configs.recommended,
  eslintConfigPrettier,
];

export default config;
