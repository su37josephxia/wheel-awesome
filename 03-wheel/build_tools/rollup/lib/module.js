const MagicString = require("magic-string");
const path = require("path");
const { parse } = require("acorn");
const analyse = require("./ast/analyse");

function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * @class 分析模块
 */
class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, { filename: path });
    this.path = path;
    this.bundle = bundle;
    // Parse阶段
    this.ast = parse(code, {
      ecmaVersion: 6,
      sourceType: "module",
    });
    // Transfer
    this.analyse();
  }

  /**
   * 分析模块导入和导出
   */
  analyse() {
    // 导入语句
    this.imports = {}; // 存放当前模块导入
    // 导出语句
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
        // TODO: ExportDefaultDeclaration or ExportNamedDeclaration
        // TODO: 没有仔细写 应该默认导入会有问题
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

    // 调用分析模块
    // 根据当前语法树
    // 构筑作用域链对象
    // _defines: 变量定义 const a = 'a'
    // _dependsOn: 变量依赖
    // _included: 此语句是否被打包Bundle 防止多次打包Bundle
    // _source: 语句字符串
    analyse(this.ast, this.code, this); // 找到_defines 和 _dependson

    // 查找外部依赖
    this.definitions = {}; // 找到定义语句
    // 遍历找出每一个节点中的定义语句
    this.ast.body.forEach((statement) => {
      Object.keys(statement._defines).forEach((name) => {
        // 变量名对应的语句
        this.definitions[name] = statement;
      });
    });
  }

  /**
   * 展开所有语句节点
   * @returns
   */
  expandAllStatements() {
    const allStatements = [];

    this.ast.body.forEach((statement) => {
      // 忽略所有Import语句
      if (statement.type === "ImportDeclaration") {
        return;
      }

      let statements = this.expandStatement(statement);
      allStatements.push(...statements, statement);
    });
    return allStatements;
  }

  /**
   * 展开单个语句节点
   * @param {*} statement
   * @returns
   */
  expandStatement(statement) {
    let result = [];
    // !tree-sharking
    // 检查此句的外部依赖
    // 遍历所有依赖变量
    const dependencies = Object.keys(statement._dependsOn);
    dependencies.forEach((name) => {
      statement._included = true;
      // 提取依赖变量的声明部分
      // import {a} from 'foo.js'
      // ↓↓↓↓↓↓↓
      // const a = 'a'
      const definition = this.define(name);
      result.push(...definition);
    });

    if (!statement._included) {
      statement._included = true;
      result.push(statement);
    }
    console.log("result:", result);
    return result;
  }

  /**
   * 查找变量声明
   * @param {*} name
   * @description 找出某个变量的声明部分
   * @returns 声明部分
   */
  define(name) {
    if (has(this.imports, name)) {
      // import项的声明部分
      const importDeclaration = this.imports[name];
      // 获取msg模块 exports imports
      // 读取声明模块
      const module = this.bundle.fetchModule(
        importDeclaration.source,
        this.path
      );

      // this.exports['age'] =
      const exportData = module.exports[importDeclaration.name];

      // 低啊用msg模块的define 目的返回
      return module.define(exportData.localName);
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
