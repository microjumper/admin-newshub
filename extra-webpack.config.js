const Dotenv = require('dotenv').config();
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  plugins: [
    new DotenvWebpack()
  ]
}
