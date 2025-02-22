import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

import pluginTurbo from "eslint-plugin-turbo";
import pluginImport from "eslint-plugin-import";
import "eslint-plugin-only-warn";

/* A shared ESLint configuration for the repository */
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      "import/resolver": {
        typescript: createTypeScriptImportResolver,
        node: true,
      },
    },

    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
  },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      turbo: pluginTurbo,
      import: pluginImport,
    },
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      ...pluginImport.flatConfigs.typescript.rules,
      "turbo/no-undeclared-env-vars": "warn",

      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/extensions": [
        "error",
        "always",
        { pattern: { ts: "never", tsx: "never" }, ignorePackages: true },
      ],

      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],

      // Allow custom values as Promise rejection reasons
      "@typescript-eslint/prefer-promise-reject-errors": "off",

      // Disable ForOfStatement rule, since that disallows for of loops.
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement",
      ],

      // Allow underscore in front of variables
      "no-underscore-dangle": "off",

      // Ignore unused variables with an underscore in front
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
);
