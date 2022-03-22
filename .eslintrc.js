module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [2, 'never'],
    'class-methods-use-this': 0,
    'max-len': ['warn', { code: 120 }],
  },
}
