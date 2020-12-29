module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 'no-console': 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-unsafe-finally': 'warn',
    // 'no-unused-vars': 'warn'
  },
};
