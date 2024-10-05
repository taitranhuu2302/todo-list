import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      react: react,
      import: importPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prettier/prettier': [
        2,
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          printWidth: 80,
          bracketSpacing: true,
          jsxBracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'auto'
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['warn'],
      'no-console': 'warn',
      'import/no-unresolved': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      indent: ['error', 2],
      'jsx-quotes': ['error', 'prefer-double'],
      eqeqeq: ['error', 'always'],
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always'
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
);
