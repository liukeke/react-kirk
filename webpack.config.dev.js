var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var node_modules = path.resolve(__dirname, 'node_modules');
var publishTime = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() +
    new Date().getDate().toString() + new Date().getHours().toString();
var config = {
    entry: {
        /*首页*/
        index: './app/entry/index/index.js',
        /*redux*/
        redux: './app/entry/redux/index.js',
        /*ant design*/
        animation: './app/entry/animation/index.js',
        /*page*/
        page: './app/entry/page/index.js',
        /*postCss*/
        css: './app/entry/postCss/index.js'
    },

    output: {
        path: path.join(__dirname, 'build/'),
        filename: 'js/[name]_' + publishTime + '.js',
        chunkFilename: "js/[id].js",
        publicPath: ''

    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'js/vendors_' + publishTime + '.js' })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=react',
                exclude: /node_modules/,
            },
            {test: /\.(css|pcss)$/, loader: 'style-loader!css-loader!postcss-loader'},
            {test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/, loader: 'url-loader?limit=8192&name=resource/[name].[ext]'},
            {test: /\.swf$/, loader: "file?name=js/[name].[ext]"}
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.coffee','.pcss']
    }
};
module.exports = config;
var template = '<!DOCTYPE html> \n\
<html lang="en"> \n\
<head>  \n\
    <meta charset="UTF-8"> \n\
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> \n\
    <title>react-locke</title> \n\
</head> \n\
<body>  \n\
<div id="container"></div>  \n\
<script src="js/vendors.js"></script> \n\
<script src="js/key.js"></script> \n\
</body> \n\
</html> \n';

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolderRecursive("./build/js");

for (var key in config.entry) {
    var targetFile = "./build/" + key + ".html";
    var result = template.replace("key", key + "_" + publishTime);
    result = result.replace("vendors", "vendors_" + publishTime);
    fs.writeFile(targetFile, result, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
