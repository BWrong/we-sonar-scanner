module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser'
  },
  ignorePatterns: [
    '.babelrc*',
    'babel.config.*',
    'vite.config.*',
    'vue.config.*',
    'rollup.config.*',
    'nuxt.config.*',
    'jest.config.*',
    'jsconfig.*',
    'postcss.config.*',
    'tailwind.config.*',
    'tsconfig.*',
    'tsdoc.*',
    'unocss.config.*',
    'vitest.config.*',
    'windi.config.*',
    '.browserslist*',
    'vetur.config.*',
    'prettier*',
    '.prettier*',
    '.editorconfig',
    '*.d.ts',
    'stylelint*',
    '.eslint*',
    '.stylelint*',
    'dist/',
    '.vscode/',
    '.git/',
    'node_modules/',
    'mock/',
    'public/'
  ],
  extends: ['@vanwei/eslint-config/typescript', '@vue/eslint-config-typescript/recommended', '@vanwei/eslint-config/vue2'],
  rules: {
    '@typescript-eslint/no-explicit-any': 1
  }
};