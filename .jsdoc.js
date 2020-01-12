module.exports = {
  plugins: [
    'node_modules/jsdoc-vuejs',
    'plugins/markdown',
  ],
  source: {
    include: [
      'src',
    ],
    recurseDepth: 10,
    exclude: [
      'node_modules'
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
    recurse: true,        // Same as using -r or --recurse
  },
};
