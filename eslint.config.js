const next = require('@next/eslint-plugin-next')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const prettier = require('eslint-config-prettier')
const cypress = require('eslint-plugin-cypress')
const importPlugin = require('eslint-plugin-import')
const reactPlugin = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const storybook = require('eslint-plugin-storybook')
const tailwindcss = require('eslint-plugin-tailwindcss')
const trim = require('eslint-plugin-trim')
const globals = require('globals')

const { overrides: tsPluginRecommendedRules } =
  tsPlugin.configs['eslint-recommended']
const { rules: tsPluginRules } = tsPlugin.configs.recommended
const { files: storybookFiles, rules: storybookRules } =
  storybook.configs.recommended.overrides.at(0)
const files = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}']

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // React configs
  {
    files,
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'no-alert': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: true,
          multiline: 'last',
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // React Hooks configs
  {
    files,
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  // TypeScript ESLint configs
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPluginRecommendedRules.at(0).rules,
      ...tsPluginRules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'none', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    settings: {
      'import/extensions': ['.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
  // Tailwindcss configs
  {
    files,
    plugins: { tailwindcss },
    rules: {
      ...tailwindcss.configs['recommended'].rules,
      'tailwindcss/no-custom-classname': 'error',
    },
  },
  // Next.js configs
  {
    files,
    plugins: { '@next/next': next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  // Prettier configs
  {
    files,
    plugins: { prettier },
    rules: { ...prettier.rules },
  },
  // Import configs
  {
    files,
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'error',
      'import/first': 'error',
      'import/prefer-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom,next/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@src/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    plugins: { import: importPlugin },
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  // Other configs
  {
    files,
    plugins: { trim },
    rules: {
      'trim/argument': 'error',
      'trim/class-name': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
      ],
    },
  },
  // Next.js App Router configs
  {
    files: ['layout.tsx', 'template.tsx', 'head.tsx'],
    rules: {
      'react/function-component-definition': 'off',
    },
  },
  // Cypress configs
  {
    files,
    plugins: { cypress },
    rules: { ...cypress.configs.recommended.rules },
  },
  // Storybook configs
  {
    files: storybookFiles,
    plugins: { storybook },
    rules: { ...storybookRules },
  },
  // Global configs
  {
    ignores: [
      '**/*.js',
      '**/*.json',
      'node_modules',
      'public',
      'styles',
      '.next',
      'coverage',
      'dist',
      '!**/eslint.config.js',
      '**/gql/sdk.ts',
      'src/components/ui/*.tsx',
    ],
  },
]
