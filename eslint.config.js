import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([
  {
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['*.jsx', '*.tsx'],
    plugins: ['react'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    settings: {
      next: {
        rootDir: './',
      },
    },
  },
]);
