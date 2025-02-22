import tseslint from "typescript-eslint";
import nodeConfig from "@repo/eslint-config/node";

export default tseslint.config(nodeConfig, {});
