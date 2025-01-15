import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier,
            security,
        },
        ignores: ['node_modules/', 'dist/', 'src/tests/'],
        languageOptions: {
            globals: { ...globals.node },
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                project: './tsconfig.json',
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        rules: {
            // Prettier rules
            'prettier/prettier': 'error',

            // TypeScript-specific rules
            '@typescript-eslint/no-use-before-define': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // Core rules
            'no-use-before-define': 'error',
            'no-console': 'off',
            'no-var': 'error',
            'prefer-const': 'error',

            // Custom ESLint rules
            'spaced-comment': 'off',
            'consistent-return': 'off',
            'func-names': 'off',
            'object-shorthand': 'off',
            'no-process-exit': 'off',
            'no-param-reassign': 'off',
            'no-return-await': 'off',
            'no-underscore-dangle': 'off',
            'class-methods-use-this': 'off',
            'no-undef': 'error',
            'node/no-unsupported-features/es-syntax': 'off',

            // Security rules
            'security/detect-object-injection': 'warn',
            'security/detect-eval-with-expression': 'error',
            'security/detect-buffer-noassert': 'warn',
            'security/detect-non-literal-regexp': 'error',
            'security/detect-possible-timing-attacks': 'warn',
            'security/detect-non-literal-fs-filename': 'warn',
            'security/detect-child-process': 'error',
            'security/detect-disable-mustache-escape': 'warn',
            'security/detect-no-csrf-before-method-override': 'error',
            'security/detect-unsafe-regex': 'warn',
        },
    },
];
