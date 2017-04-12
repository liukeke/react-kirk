var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.config.dev");
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false/*删除版权信息*/
    },
    compress: {
        warnings: false
    }
});
/*将切换到生成环境*/
var processReact = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
    }
});
config.plugins.push(uglifyJsPlugin,processReact);
module.exports = config;





