var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var WebpackFailPlugin = require('webpack-fail-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("css!sass") }
        ],

        preLoaders: [
            { test: /\.tsx?$/, loader: "tslint" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    tslint: {
        emitErrors: process.env.NODE_TEST,
        failOnHint: process.env.NODE_TEST,
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, "./styles")]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('dist/style.css', {
            allChunks: true
        }),
       
        new CopyWebpackPlugin([{from: '*', to: 'dist/', context: 'public'}]),
        WebpackFailPlugin
    ]
};
