var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// bundle dependencies in separate vendor bundle
//var vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
//    return el.indexOf('font') === -1; // exclude font packages from vendor bundle
//});

/*
 * Default webpack configuration for development
 */
var config = {
    devtool: 'eval-source-map',
    cache: true,
    entry: {
        main: path.join(__dirname, "scripts", "HelloWorld2.tsx")//,
        //main: path.join(__dirname, "scripts", "app.js")//,
  //      vendor: vendorPackages
    },
    output: {
        path: path.join(__dirname, "wwwroot", "js"),        //Note: For ASP.NET Core we need to put the output in wwwroot/js
        //in production mode make files have a .min.js ending - stops gulp's min:js concating them
        filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
        sourceMapFilename: '[file].map'
    },
   // resolve: {
   //     modulesDirectories: ['node_modules']
   // },
 //   plugins: [
 //       new webpack.OldWatchingPlugin(),  //needed to make watch work. see http://stackoverflow.com/a/29292578/1434764
 //       new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js")
 //   ],
 //   resolveLoader: {
 //       'fallback': path.join(__dirname, 'node_modules')
 //   },
    /*
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react']
            }
        }]
    }*/
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2016&presets[]=es2015&presets[]=react!ts-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2016', 'es2015', 'react']
                }
            }
        ]

      //  preLoaders: [
      //      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //      { test: /\.js$/, loader: "source-map-loader" }
      //  ]
    }

}

module.exports = config;
