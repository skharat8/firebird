import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginQuery from "@tanstack/eslint-plugin-query";

import { fixupPluginRules } from "@eslint/compat";
import baseConfig from "./base.js";

/* A custom ESLint configuration for libraries that use React */
export default tseslint.config(
  baseConfig,
  pluginReact.configs.flat.recommended,
  pluginQuery.configs["flat/recommended"],
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ...pluginJsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    plugins: {
      react: pluginReact,
      "react-refresh": pluginReactRefresh,
      "react-hooks": fixupPluginRules(pluginReactHooks),
      "jsx-a11y": pluginJsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...pluginReactRefresh.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      "no-console": ["error", { allow: ["error"] }],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",

      // Allow JSX code in .tsx files
      "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],

      // Ignore error due to react-hook-form handleSubmit
      // Resolution based on: https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],

      "@typescript-eslint/no-floating-promises": "off",

      // Allow passing functions as props (without having to memoize)
      "react/jsx-no-bind": ["error", { allowFunctions: true }],
      // Allow prop spreading
      "react/jsx-props-no-spreading": "off",
      // defaultProps are not required when using TypeScript
      "react/require-default-props": "off",
      // Fix issue with shadcn: https://github.com/shadcn-ui/ui/issues/1013
      "react/prop-types": "off",
    },
  },
  {
    ignores: ["**/dist", "**/*.config.js"],
  },
);
