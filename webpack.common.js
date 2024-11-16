const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/scripts/gamecontroller.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: path.resolve(__dirname, "src", "template.html"),
    }),
    new NodePolyfillPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/assets", "favicon.png"),
    }),

    // Only enable Bundle Analyzer in development
    process.env.NODE_ENV !== "production" ? new BundleAnalyzerPlugin() : null,

    // Extract CSS into separate files with a content hash for better caching
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ].filter(Boolean), // Filters out null values (BundleAnalyzerPlugin in production)

  output: {
    filename: "[name].[contenthash].bundle.js", // Add contenthash for cache busting
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the output directory before each build
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          "css-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader", // Loads HTML files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/i,
        type: "asset/resource", // Handles images, fonts, etc.
        generator: {
          filename: "assets/[name][ext]", // Keeps assets in a specific folder
        },
      },
    ],
  },

  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: require.resolve("url"),
    },
  },

  optimization: {
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Removes console.log in production
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all", // Automatically splits chunks (e.g., vendor code)
      maxInitialRequests: 5, // Maximum number of initial chunks
      minSize: 30000, // Minimum chunk size for splitting
    },
    runtimeChunk: "single", // Extracts Webpack runtime into a separate chunk for better caching
  },
};
