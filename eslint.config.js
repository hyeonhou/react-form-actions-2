import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import configPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  // JavaScript 기본 권장 설정
  js.configs.recommended,

  // React 관련 설정
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // globals.browser와 globals.node에서 공백이 있는 키들을 필터링
        ...Object.fromEntries(
          Object.entries({
            ...globals.browser,
            ...globals.node,
          }).map(([key, value]) => [key.trim(), value])
        ),
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React 권장 규칙들
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // React Hooks 규칙들
      ...reactHooks.configs.recommended.rules,

      // React Refresh 규칙
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 커스텀 규칙들
      "react/react-in-jsx-scope": "off", // React 17+ 에서는 불필요
      "react/prop-types": "off", // TypeScript 사용시 불필요하지만 현재는 JavaScript
      "react/jsx-uses-react": "off", // React 17+ 에서는 불필요
      "react/jsx-uses-vars": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 일반적인 JavaScript 규칙들
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Prettier와의 충돌 방지 (가장 마지막에 위치)
  configPrettier,
];
