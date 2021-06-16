const acorn = require("acorn");

const walk = require("../../lib/ast/walk");
const code = {
  index: `
  import { add } from "./add.js";
  console.log(add(2, 4));
  `,
  add: `
  export const add = (a,b) => a + b
  `,
};

const add = getAst(code.add);
const index = getAst(code.index);
getImports(index);
getExports(add);

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
  const index = getAst(code.index);
  const imports = {};
  ast.body.forEach((node) => {
    if (node.type === "ImportDeclaration") {
      console.log("import:", node);
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
      console.log("exports:", node);
      // TODO: ExportDefaultDeclaration or ExportNamedDeclaration
      // TODO: 没有仔细写 应该默认导入会有问题
      let declaration = node.declaration;
      if (declaration.type === "VariableDeclaration") {
        let name = declaration.declarations[0].id.name;
        console.log("declaration", name, declaration);
        _exports[name] = {
          node,
          localName: name,
          expression: declaration,
        };
      }
    }
  });
}

/**
 * 根据语法树 start-end 切割代码
 */
function getSource(ast) {
  let indent = 0;
  const padding = () => " ".repeat(indent);

  // 遍历语法树中的每一条语句  由walk遍历子元素
  // 深度优先原则
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node.type) {
          console.log(padding() + node.type + " enter");
          indent += 2;
        }
      },
      leave(node) {
        if (node.type) {
          indent -= 2;
          console.log(padding() + node.type + " leave");
        }
      },
    });
  });
}
