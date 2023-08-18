

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser'
  },
  extends: ['@vanwei/eslint-config/typescript', '@vue/eslint-config-typescript/recommended'],
  rules: {
    'no-multiple-empty-lines':0
  }
};