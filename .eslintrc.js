module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import-helpers'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always', allowUnderscorePrefix: true },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'spacing-in-parens': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^@shared\\//',
          'module',
          '/^@\\//',
          '/^@root\\//',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    // Asegura que las interfaces tengan prefijo 'I'
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' },
    ],
    // Asegura que los tipos tengan prefijo 'T'
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        prefix: ['T'], // Añadir prefijo 'T' para tipos
      },
    ],
    // Asegura que las funciones y métodos tengan tipo de retorno explícito
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: false }, // No permite omitir el tipo de retorno
    ],
    // Asegura que se use 'camelCase' para la nomenclatura
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'], // Usar camelCase para variables y funciones
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'], // Permitir UPPER_CASE para constantes
      },
      {
        selector: 'function',
        format: ['camelCase'], // Usar camelCase para funciones
      },
    ],
  },
};
