module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    webextensions: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
    }],

    // Import rules
    'import/extensions': ['error', 'always', {
      ignorePackages: true,
      pattern: {
        ts: 'never',
      },
    }],
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type'
      ],
      'newlines-between': 'always',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true
      }
    }],

    // General ESLint rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],

    // Chrome extension specific rules
    'no-restricted-globals': ['error', 'event'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name=\'chrome\'][callee.property.name=/^(app|bluetooth|usb)$/]',
        message: 'Chrome APIs requiring specific permissions should be used carefully'
      }
    ]
  },
  overrides: [
    {
      // Background script specific rules
      files: ['**/background.ts'],
      rules: {
        'no-console': 'off', // Allow console in background scripts
      }
    },
    {
      // Content script specific rules
      files: ['**/content.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'warn',
      }
    }
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.eslintrc.cjs'
  ]
};
