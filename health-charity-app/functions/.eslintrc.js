module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "require-jsdoc": 0, // 禁用JSDoc检查，简化代码
    "indent": ["error", 2],
  },
};
