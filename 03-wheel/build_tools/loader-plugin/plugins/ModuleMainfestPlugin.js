const fs = require('fs');
class ModuleMainfestPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.done.tap('ModuleMainfestPlugin', (stats) => {
            const outpPutDir = this.options.outputDir || './dist';
            const fileName = this.options.fileName || 'manifest.json';

            const modulesPaths = stats.compilation.modules.map(v => v.resource)

            const mainfest = {
                modules: modulesPaths
            }

            const mainfestPath = `${outpPutDir}/${fileName}`
            fs.writeFileSync(mainfestPath, JSON.stringify(mainfest, null, 2))
            console.log('Module mainfest has been generated!')
        })
    }

}
module.exports = ModuleMainfestPlugin;