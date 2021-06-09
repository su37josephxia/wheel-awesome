const Bundle = require("./bundle");

function rollup(entry, outputFileName) {
  // 打包对象
  const bundle = new Bundle({ entry });
  // 调用build方法进行编译
  bundle.build(outputFileName);
}

module.exports = rollup;
