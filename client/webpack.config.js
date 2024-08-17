const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',
      install: './client/src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './client/dist'),
    },
    plugins: [
      // HTML Webpack Plugin to generate the HTML file
      new HtmlWebpackPlugin({
        template: './client/index.html',
        title: 'J.A.T.E.'
      }),
      // Inject Workbox Service Worker
      new InjectManifest({
        swSrc: './client/src-sw.js', // Path to your service worker file
        swDest: 'service-worker.js', // Output path for the generated service worker
      }),
      // Generate a manifest file for PWA
      new WebpackPwaManifest({
        name: 'Nikos Text Editor',
        short_name: 'Text Editor',
        description: 'A text editor with offline capabilities',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./client/src/images/logo.png'), 
            sizes: [192, 512], 
            destination: path.join('images', 'icons')
          }
        ]
      })
      
    ],

    module: {
      rules: [
        // Babel loader for JS files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // CSS loader for CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        // File loader for images
        {
          test: /\.(png|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'dist/images', // Path where images will be output
                name: '[name].[ext]'
              }
            }
          ]
        }
      ],
    },
  };
};
