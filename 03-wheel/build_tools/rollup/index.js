const path = require('path')
const rollup = require('./lib/rollup')
const entry = path.resolve(__dirname, './src/case01/main.js')
rollup(entry, './bundle.js')