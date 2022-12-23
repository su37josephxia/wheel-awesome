const Bundle = require('./bundle')

function rollup(entry, outputFileName) {
    const bundle = new Bundle({ entry })

    bundle.build(outputFileName)
}

module.exports = rollup