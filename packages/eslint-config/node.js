import tseslint from "typescript-eslint";
import baseConfig from "./base.js";

/* A custom ESLint configuration for Node applications */
export default tseslint.config(baseConfig, {
  rules: {
    "no-console": "off",
  },
});
