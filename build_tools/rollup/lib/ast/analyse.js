const Scope = require("./scope");
const walk = require("./walk");
/**
 * 当前模块使用哪些变量
 * 哪些变量是当前模块声明
 *
 * @param {*} ast
 * @param {*} magicStirng
 * @param {*} module
 */
function analyse(ast, magicStirng, module) {
  // 创建全局作用域
  let scope = new Scope();
  // 遍历当前语法树
  ast.body.forEach((statement) => {

    // 给作用域内添加变量
    function addToScope(declaration) {
      var name = declaration.id.name; // 获取声明的变量
      scope.add(name);
      if (!scope.parent) { // 如果此变量作用域不在父级作用域 即当前作用域
        // 如果当前是全局作用域的话
        // 在全局作用域下声明全局变量
        statement._defines[name] = true;
      }
    }

    Object.defineProperties(statement, {
      _defines: { value: {} }, // 当前模块定义的所有全局变量

      _dependsOn: { value: {} }, // 当前模块没有定义但是使用过的变量

      _included: { value: false, writable: true }, // 此语句是否被打包 防止多次打包

      _source: { value: magicStirng.snip(statement.start, statement.end) },
    });
    // console.log('sate',statement)
    // 投建我们的作用域链
    walk(statement, {
      enter(node) {
        let newScope;
        if(node === null || node.length === 0) return 
        console.log('walk', node.type)
        switch (node.type) {
          case "FunctionDeclaration":
            const params = node.params.map((x) => x.name);
            addToScope(node);
            // 新作用域
            newScope = new Scope({
              parent: scope,
              params,
            });
            break;

          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
        }
        if (newScope) {
          // 当前节点声明的新作用域
          // 如果此节点生成一个新作用域
          Object.defineProperties(node, "_scope", { value: newScope });
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
  // 找出外部依赖 dependsOn
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node._scope) {
          scope = node._scope;
        }
        if (node.type === "Identifier") {
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
