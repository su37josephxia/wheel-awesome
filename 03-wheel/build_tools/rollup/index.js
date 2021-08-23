const path = require('path')
const rollup = require('./lib/rollup')
// 入口文件的绝对路径
let entry = path.resolve(__dirname,'src/case02/main.js')
rollup(entry,'./bundle.js')