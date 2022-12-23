const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MyPlugin = require('./plugin/MyPlugin')
module.exports = (env, args) => {
  return {
    profile: true,
    mode: "development", // 环境模式
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // './loader/style-loader'

            {
              loader: './loader/style-loader?a=xx',
              options: {
                op: 'abc', // 关闭项目运行时的类型检查
              },
            },
          ],
        },

        {
          test: /\.less/,
          use: [
            {
              loader: './loader/style-loader.js',
            },
            {
              loader: path.resolve(__dirname, "loader", "less-loader"),
            },
          ],
        }
      ]
    },

    plugins: [
      new MyPlugin({ p: 'abc' }),

      new HtmlWebpackPlugin({
        templateContent: `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Webpack App</title>
    </head>
    <body>
      <h1>手写Loader</h1>
    </body>
  </html>
      `,
      }),
    ],
  };
};
