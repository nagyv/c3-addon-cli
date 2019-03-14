const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: './src/plugin.js',
  output: {
    filename: 'plugin.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin([
      { from: 'src', to: path.resolve(__dirname, 'dist') },
    ]),
    new ZipPlugin({
      // OPTIONAL: defaults to the Webpack output path (above)
      // can be relative (to Webpack output path) or absolute
      path: __dirname,
 
      // OPTIONAL: defaults to the Webpack output filename (above) or,
      // if not present, the basename of the path
      filename: '<%= name %>',
 
      // OPTIONAL: defaults to 'zip'
      // the file extension to use instead of 'zip'
      extension: 'c3addon',
    }),    
  ],
};