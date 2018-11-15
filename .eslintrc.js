module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  rules: {
    'no-console': ['error', {
      allow: ['info', 'warn', 'error']
    }],
    'class-methods-use-this': 0,
    'eol-last': 0, //TODO REMOVE BEFORE FINAL, this is here as the autoformater i use removes line breaks at the end of files
    'no-unused-vars': 0 // TODO REMOVE BEFORE FINAL
  },
  plugins: ['import'],
};