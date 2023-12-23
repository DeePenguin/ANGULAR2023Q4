const config = {
  'src/**/*.ts': files => {
    return `nx affected -t typecheck --files=${files.join(',')}`
  },
  'src/**/*.{js,ts,html,json}': [
    files => `nx format:write --files=${files.join(',')}`,
    files => `nx affected:lint --files=${files.join(',')}`,
  ],
  'src/**/*.{css,scss}': files => {
    return `nx stylelint --fix --files=${files.join(',')}`
  },
}

module.exports = config
