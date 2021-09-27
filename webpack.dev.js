// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const loader = require('sass-loader');

// Webpack config
module.exports = {
  // By setting the mode parameter to either development, production or none,
  // you can enable webpack's built-in optimizations that correspond to each environment.
  mode: 'development',
  // Entry point for application, where webpack starts to build its dependency graph
  // Below we set the property to an object
  // Each key value pair represents the point where to start the application bundling process.
  // Key = name of entry point , value = entry point file
  entry: {
    index: path.resolve(__dirname, 'src/client/index.js')
  },
  // The output property tells webpack where to emit the bundles it creates
  // and how to name these files.
  output: {
    // Directory of bundle
    path: path.resolve(__dirname, 'dist'),
    // File output
    // Specify [name] inside square brackets, tells webpack to use the key in the entry point as the name for the output file
    file: '[name].js'
  },
  // The devServer object , uses webpack with a development server that provides live reloading.
  // This should be used for development only.
  // This set of options is picked up by webpack-dev-server and
  // can be used to change its behavior in various ways.
  devServer: {
    // Server port
    port: 8000,
    // The static object allows us to configure options for serving static files from directory
    // (by default 'public' directory).
    static: {
      directory: path.resolve(__dirname, 'dist'),
      // The devMiddleWare object, this handles webpack assets on the server
      devMiddleware: {
        // If true, the option will instruct the module to write files
        // to the configured location on disk as specified in your webpack config file
        // Writes to the output directory
        writeToDisk: true,
      }
    },

  },
  // These options determine how the different types of modules within a project will be treated.
  module: {
    // Define the rules for how the different modules will be treated
    rules: [
      {
        // The test property identifies which file or files should be transformed.
        test: /.js$/,
        // The use property indicates which loader should be used to do the transforming.
        use: [
          'babel-loader'
        ],
      }, 
      {
        test: /.scss$/,
        // sass-loader convert the scss to css
        // css-loader reads the content of css file and returns its content 
        // MiniCssExtract-loader takes the css and injects it into the css file specified by the plugin instance
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  // Plugin configurations.
  plugins: [
    // Create an instance of the plugin
    // By default, this plugin will remove all files inside webpack's output.path directory
    // as well as all unused webpack assets after every successful rebuild.
    new CleanWebpackPlugin(),
    // This plugin that simplifies creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      // Specify which bundle to include or hook up to the html page
      // The string represents the chunk name which is specified as the key in the entry object
      chunks: 'index',
      // Specify [name] inside square brackets, tells webpack to use the key in the entry point as the name for the output file
      filename: '[name].js',
      // Html file to sue as template
      template: path.resolve(__dirname, 'src/client/[name].html'),
    }),
    // This plugin extracts CSS into separate files. 
    // Below we pass in an object with the filename property specifying the file to extarct the css into
    new MiniCssExtractPlugin({
      filename: '[name].js'
    }),
  ]
};