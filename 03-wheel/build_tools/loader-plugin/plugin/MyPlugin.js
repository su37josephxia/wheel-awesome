//plugins/MyPlugin.js
module.exports = class MyPlugin {
    constructor(options) {
        console.log("MyPlugin constructor", options);
        this.options = options;
    }
    apply(compiler) {
        console.log('MyPlugin apply...',)

        // 注册编译完成的钩子
        compiler.hooks.done.tap("MyPlugin", (compilation) => {
            console.log("compilation done");
        });

        // 注册异步完成的钩子
        compiler.hooks.run.tapAsync("MyPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("compilation run");
                callback()
            }, 1000)
        });

        // 注册Promise钩子
        compiler.hooks.emit.tapPromise("MyPlugin", (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("compilation emit");
                    resolve();
                }, 1000)
            });
        });


        compiler.hooks.compilation.tap('HelloCompilationPlugin', (compilation) => {
            console.log('🚄 compilation')

            // Now we can tap into various hooks available through compilation
            compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
                console.log('🚗 Assets are being optimized.');
            });
        });

    }
}
