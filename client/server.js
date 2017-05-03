const webpack = require('webpack'),
      WebpackDevServer = require('webpack-dev-server')
;

var config = require('./webpack.config.js');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:9292/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: 'dist',
  historyApiFallback: true,
  proxy: {
    "/api/**": {
          target: "http://vocab-v2.herokuapp.com/api/",
          changeOrigin: true,
          pathRewrite: {
              "^/api": ""
          }
      }
  }
});
server.listen(9292);