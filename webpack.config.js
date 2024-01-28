const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log(isProduction);
  return {
    entry: {
      main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProduction ? "[name].[contenthash].min.js" : "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: `@import "./src/styles/variables";`,
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[contenthash][ext]",
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[contenthash][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({ filename: "index.[contenthash].min.css" }),
    ],
  };
};
