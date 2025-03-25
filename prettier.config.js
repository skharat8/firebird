/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
    {
      files: "./apps/frontend/src/**/*",
      options: {
        plugins: [
          "@trivago/prettier-plugin-sort-imports",
          "prettier-plugin-tailwindcss",
          "prettier-plugin-classnames",
          "prettier-plugin-merge",
        ],
        tailwindFunctions: ["clsx", "tw", "cn", "cva"], // For prettier-plugin-tailwindcss
        customFunctions: ["clsx", "tw", "cn", "cva"], // For prettier-plugin-classnames

        // Import Sorting
        importOrder: [
          "^react(.*)|@tanstack(.*)",
          "<THIRD_PARTY_MODULES>",
          "@/(.*)",
          "^[./]",
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
      },
    },
  ],
};

export default config;
