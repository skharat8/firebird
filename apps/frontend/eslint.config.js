import tseslint from "typescript-eslint";
import reactConfig from "@repo/eslint-config/react";

export default tseslint.config(reactConfig, {
  settings: {
    "import/resolver": {
      alias: {
        extensions: [".ts", ".tsx"],
        map: [
          ["", "./public"],
          ["@", "./src"],
          ["@images", "./src/assets/images"],
          ["@fonts", "./src/assets/fonts"],
        ],
      },
    },
  },
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // Enforce unidirectional codebase
          // e.g. src/features is not allowed to imports from src/pages
          {
            target: ["./src/features", "./src/layouts"],
            from: "./src/pages",
          },
          {
            target: [
              "./src/components",
              "./src/contexts",
              "./src/data",
              "./src/hooks",
              "./src/schemas",
              "./src/services",
              "./src/utils",
            ],
            from: ["./src/features", "./src/pages", "./src/layouts"],
          },
        ],
      },
    ],
  },
});
