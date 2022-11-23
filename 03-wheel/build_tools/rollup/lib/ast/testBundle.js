const Bundle = require('./bundle')
const path = require('path')
const bundle = new Bundle({
    entry: path.resolve(__dirname, '../../src/case01/index.js')
})
bundle.build()