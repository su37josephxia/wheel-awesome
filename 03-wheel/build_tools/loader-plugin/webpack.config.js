const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleMainfestPlugin = require("./plugins/ModuleMainfestPlugin");
module.exports = (env, args) => {
    return {
        profile: true,
        mode: "development", // 环境模式
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['./loaders/style-loader.js']
                }, {
                    test: /\.less$/,
                    use: [
                        './loaders/style-loader.js',
                        './loaders/less-loader.js']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                templateContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Webpack App</title>
</head>
<body>
    <div id="app" />
    <h1>Webpack App</h1>
</body>
</html>
      `,
            }),

            new ModuleMainfestPlugin({
                outputDir: './dist',
                fileName: 'manifest.json'
            })
        ],
    };
};