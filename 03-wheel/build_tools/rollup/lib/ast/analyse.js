const Scope = require("./scope");
const walk = require("./walk");
/**
 * 当前模块使用哪些变量
 * 哪些变量是当前模块声明
 *
 * @param {*} ast
 * @param {*} magicString
 * @param {*} module
 */
function analyse(ast, magicString, module) {
  // 职责

  // 创建全局作用域
  let scope = new Scope();
  // 遍历当前语法树
  ast.body.forEach((statement) => {

    /**
     * 给作用域内添加变量
     * @param {*} declaration
     */
    function addToScope(declaration) {
      var name = declaration.id.name; // 获取声明的变量
      scope.add(name);
      if (!scope.parent) {
        // 如果此变量作用域不在父级作用域 即当前作用域
        // 如果当前是全局作用域的话
        // 在全局作用域下声明全局变量
        statement._defines[name] = true;
      }
    }

    Object.defineProperties(statement, {
      // 变量定义
      _defines: { value: {} },

      // 变量依赖
      _dependsOn: { value: {} },

      // 此语句是否被打包Bundle 防止多次打包Bundle
      _included: { value: false, writable: true },

      // 变量语句
      _source: { value: magicString.snip(statement.start, statement.end) },
    });

    // 作用域链遍历
    // 分析变量定义的
    // 构造作用域链
    walk(statement, {
      enter(node) {
        let newScope;
        // 防止空节点和空数组
        if (node === null || node.length === 0) return;
        switch (node.type) {
          // 方法声明
          case "FunctionDeclaration":
            const params = node.params.map((v) => v.name);
            addToScope(node);
            // 新作用域
            newScope = new Scope({
              parent: scope,
              params,
            });
            break;
          // 变量声明
          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
        }
        if (newScope) {
          console.log("newScope", newScope);
          // 当前节点声明的新作用域
          // 如果此节点生成一个新作用域
          Object.defineProperties(node, { _scope: { value: newScope } });
          scope = newScope;
        }
      },
      leave(node) {
        if (node._scope) {
          // 如果此节点离开退回父作用域
          scope = scope.parent;
        }
      },
    });
  });
  ast._scope = scope;

  // 找出外部依赖关系 dependsOn
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node._scope) {
          scope = node._scope;
        }
        // 遇到导出节点
        if (node.type === "Identifier") {
          // 遇到 exports const a => node.name = 'a'
          console.log("Identifier:", node);
          // 向上递归
          const definingScope = scope.findDefiningScope(node.name);
          if (!definingScope) {
            statement._dependsOn[node.name] = true; // 表示属于外部依赖变量
          }
        }
      },

      leave(node) {
        if (node._scope) scope = scope.parent;
      },
    });
  });

  // 全量的代码
  // ast.body.forEach((statement) => {
  //   console.log('statement',statement)
  //   Object.defineProperties(statement, {
  //     // start在节点中的起始索引 和结束索引
  //     _source: { value: magicStirng.snip(statement.start, statement.end) },
  //   });
  // });
}

module.exports = analyse;
