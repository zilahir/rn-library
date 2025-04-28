module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "@react-native-community",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    jsdoc: {
      mode: "typescript",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/extensions": [".ts", ".tsx"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "react-native/no-inline-styles": ["error"],
    indent: "off",
    "no-console": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "unicorn/no-null": 0,
    "unicorn/no-array-for-each": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/filename-case": [
      "error",
      {
        case: "camelCase",
        ignore: [
          "^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)*\\.tsx$",
          "^[a-z]+(?:[A-Z][a-z0-9]+)*\\.test\\.ts$",
          "^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)*\\.test\\.ts$",
        ],
      },
    ],
    "jsdoc/tag-lines": 0,
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@app/**",
            group: "external",
            position: "after",
          },
        ],
        distinctGroup: false,
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        exceptions: ["TextField"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-max-props-per-line": [
      1,
      {
        maximum: 2,
        when: "multiline",
      },
    ],
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "react/jsx-props-no-spreading": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "unicorn/filename-case": 0,
      },
    },
  ],
};
