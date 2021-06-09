const fs = require("fs");
const path = require('path')
const Module = require("./module");
const { default: MagicString } = require("magic-string");
class Bundle {
  constructor(options) {
    // TODO 正则部分可以消除
    // 入口文件的绝对路径
    this.entryPath = options.entry.replace(/\.js$/, "") + ".js";

    this.modules = []; // 存放着所有的模块 入口文件和依赖的模块
  }

  build(outputFileName) {
    // 从入口的绝对路径找到模块定义
    let entryModule = this.fetchModule(this.entryPath);

    // 把入口所有的语句展开 返回语句数组
    // import {name,age}
    this.statements = entryModule.expandAllStatements();

    // 生成代码
    const { code } = this.generate();

    console.log("==========output=============");
    console.log(code);
    fs.writeFileSync(outputFileName, code, "utf-8");
  }

  generate() {
    const magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      if(statement.type === "ExportNamedDeclaration") {
        source.remove(statement.start,statement.declaration.start)
      }
      magicString.addSource({
        content: source,
        separator: "\n",
      });
    });
    return { code: magicString.toString() };
  }

  /**
   * 获取模块信息
   */
  fetchModule(importee, importer) {
    // const route = importee; // 入口文件的绝对路径
    let route
    if (!importer) {
      route = importee;
    } else {
      if (path.isAbsolute(importee)) {
        route = importee;
      // } else if (importee[0] == "") {
      }else{
        // 相对路径
        route = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js$/, "") + ".js"
        );
        // console.log('route',route)
      }
    }
    if (route) {
      // 读代码
      const code = fs.readFileSync(route, "utf-8").toString();
      const module = new Module({
        code,
        path: route, // 模块的绝对路径
        bundle: this, // 上下文
      });
      return module;
    }
  }
}

module.exports = Bundle;
