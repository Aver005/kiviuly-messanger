import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
),
{
    plugins:
    {
        react,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions:
    {
        ecmaVersion: 2021,
        sourceType: "module",
    },

    rules:
    {
        curly: ["error", "multi"],
        indent: ["error", 4],
        quotes: ["error", "double"],
        "no-unused-vars": "warn",
        semi: ["error", "never"],
        "brace-style": ["error", "allman"],
        "sort-imports": ["error", 
        {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
            "allowSeparatedGroups": false
        }]
    },
}, includeIgnoreFile(gitignorePath)];