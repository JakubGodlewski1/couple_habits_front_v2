import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import react from "eslint-plugin-react"
import eslintConfigPrettier from "eslint-config-prettier"
import boundaries from "eslint-plugin-boundaries"
import testingLibrary from "eslint-plugin-testing-library"

/** @type {import("eslint").Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["node_modules/**/*", "android/**/*", "ios/**/*", ".*"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  //reqire imports
  {
    files: ["**/*.{js,ts}"], // Apply to all other files
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Disable the rule elsewhere
    },
  },
  {
    files: ["src/**/*.{js,ts}"], // Apply only to files in the src folder
    rules: {
      "@typescript-eslint/no-require-imports": "error", // Enable the rule here
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: { react },
    rules: {
      "react/react-in-jsx-scope": 0,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message: "Importing 'React' from 'react' is not allowed.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: { testingLibrary },
  },
  eslintConfigPrettier,
]
