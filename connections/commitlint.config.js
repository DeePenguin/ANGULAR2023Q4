/* eslint-disable */
const configuration = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-angular'],
  rules: {
    'header-max-length': [2, 'always', 120],
  },
}

module.exports = configuration
