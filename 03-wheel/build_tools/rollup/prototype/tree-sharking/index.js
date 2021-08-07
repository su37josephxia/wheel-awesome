const acorn = require("acorn");

const walk = require("../../lib/ast/walk");
const Scope = require("../../lib/ast/scope");
const MagicString = require("magic-string");

const code = {
  index: `
  import { add } from "./add.js";
  console.log(add(2, 4));
  `,
  add: `
  export const add = (a,b) => a + b
  `,
};
// Parse阶段
const add = getAst(code.add);
const index = getAst(code.index);

// Transfer
// 添加代码片段
// getSource(index, new MagicString(code.index));
// getSource(add, new MagicString(code.add));
let declarations = [];
analyse(add, new MagicString(code.add));
analyse(index, new MagicString(code.index));
const statments = expandAllStatements(index);

// Generate
generate(statments)

// analyse(add,new MagicString(code.add))
// const _exports =  getExports(add);

/**
 * 获取AST
 * @param {*} code
 * @returns
 */
function getAst(code) {
  return acorn.parse(code, {
    locations: true, // 索引位置
    ranges: true,
    sourceType: "module",
    ecmaVersion: 7,
  });
}

function getImports(ast) {
  console.log("========分析import=======");
  const imports = {};
  ast.body.forEach((node) => {
    if (node.type === "ImportDeclaration") {
      console.log("import:", node._source.toString());
      // ex: import { a : b } from 'foo'
      // let source = node.source.value;
      const source = "";
      let specifiers = node.specifiers;
      specifiers.forEach((specifier) => {
        const name = specifier.imported.name; // a
        const localName = specifier.local.name; // b
        console.log("specifiers", name, localName);
        imports[localName] = { name, localName, source };
      });
    }
  });
  return imports;
}

function getExports(ast) {
  const _exports = {};
  console.log("========分析导出========");
  ast.body.forEach((node) => {
    // 分析导入import
    if (/^Export/.test(node.type)) {
      console.log("exports:", node._source.toString());
      let declaration = node.declaration;
      if (declaration.type === "VariableDeclaration") {
        let name = declaration.declarations[0].id.name;
        console.log(
          "declaration",
          name,
          new MagicString(code.add)
            .snip(declaration.start, declaration.end)
            .toString()
        );
        _exports[name] = {
          node,
          localName: name,
          expression: declaration,
        };
      }
    }
  });
  return _exports;
}


/**
 * 根据语法树 start-end 切割代码
 */
function getSource(ast, magicString) {
  // 全量的代码
  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      // start在节点中的起始索引 和结束索引
      _source: { value: magicString.snip(statement.start, statement.end) },
    });
    console.log(statement.type, statement._source.toString());
  });
}

// 分析函数
function analyse(ast, magicString) {
  console.log("======analyse=====");
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
          // 变量声明
          case "VariableDeclaration":
            declarations.push(node);
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

          // 向上递归
          const definingScope = scope.findDefiningScope(node.name);
          if (!definingScope) {
            console.log("Identifier:", node.name);
            statement._dependsOn[node.name] = true; // 表示属于外部依赖变量
          }
        }
      },

      leave(node) {
        if (node._scope) scope = scope.parent;
      },
    });
  });
}

/**
 * 展开所有语句节点
 * @returns
 */
function expandAllStatements(ast) {
  console.log("=========expandAllStatements=============");
  const allStatements = [];

  ast.body.forEach((statement) => {
    // 忽略所有Import语句
    if (statement.type === "ImportDeclaration") {
      return;
    }

    allStatements.push(...declarations, statement);
  });
  return allStatements;
}



function generate(statments) {
  console.log('======generate=====')
  // statments.forEach(v => console.log(magicString.snip(v.start, v.end))) 
  let v = statments[0]
  console.log(new MagicString(code.add).snip(v.start, v.end).toString())
  v = statments[1]
  console.log(new MagicString(code.index).snip(v.start, v.end).toString())
}

