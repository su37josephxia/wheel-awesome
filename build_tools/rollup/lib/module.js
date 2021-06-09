const MagicString = require("magic-string");
const path = require("path");
const { parse } = require("acorn");
const analyse = require("./ast/analyse");

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, { filename: path });
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, {
      ecmaVersion: 7,
      sourceType: "module",
    });
    this.analyse();
  }

  analyse() {
    this.imports = {}; // 存放当前模块导入
    this.exports = {}; // 存放导出

    this.ast.body.forEach((node) => {
      if (node.type === "ImportDeclaration") {
        // ex: import { a : b } from 'foo'
        let source = node.source.value;
        let specifiers = node.specifiers;
        specifiers.forEach((specifier) => {
          const name = specifier.imported.name; // a
          const localName = specifier.local.name; // b
          this.imports[localName] = { name, localName, source };
        });
        // export var name = 'abc'
        // export var age = 12
        // export {a}
        // export default home
      } else if (/^Export/.test(node.type)) {
        let declaration = node.declaration;
        if (declaration.type === "VariableDeclaration") {
          let name = declaration.declarations[0].id.name;
          this.exports[name] = {
            node,
            localName: name,
            expression: declaration,
          };
        }
      }
    });

    analyse(this.ast, this.code, this); // 找到_defines 和 _dependson

    // 查找外部依赖

    this.definitions = {}; // 找到定义语句
    this.ast.body.forEach((statement) => {
      Object.keys(statement._defines).forEach((name) => {
        console.log('===>>',name,statement)
        // 变量名对应的语句
        this.definitions[name] = statement;
      });
    });
  }

  expandAllStatements() {
    const allStatements = [];

    this.ast.body.forEach((statement) => {
      if (statement.type === "ImportDeclaration") {
        return;
      }

      let statements = this.expandStatement(statement);
      allStatements.push(...statements, statement);
    });
    return allStatements;
  }

  expandStatement(statement) {
    // statement._included = true;
    let result = [];

    // tree-sharking
    // 检查此句的外部依赖
    const dependencies = Object.keys(statement._dependsOn);
    dependencies.forEach((name) => {
      statement._included = true;
      // 查找变量声明节点
      const definition = this.define(name);
      result.push(...definition);
    });
    console.log('expand......'+statement._included,statement)
    if (!statement._included) {
     
      statement._included = true;
      result.push(statement);
    }
    console.log('result:',result)
    return result;
  }

  /**
   * 添加定义
   * @param {*} name
   * @returns
   */
  define(name) {
    if (hasOwnProperty(this.imports, name)) {
      const importData = this.imports[name];
      // 获取msg模块 exports imports
      const modul = this.bundle.fetchModule(importData.source, this.path);

      // this.exports['age'] =
      const exportData = modul.exports[importData.name];
      // console.log("exportData", exportData);

      // 低啊用msg模块的define 目的返回
      return modul.define(exportData.localName);
    } else {
      let statement = this.definitions[name];
      if (statement && !statement._included) {
        
        return this.expandStatement(statement);
      } else {
        return [];
      }
    }
  }
}
module.exports = Module;
