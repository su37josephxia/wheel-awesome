const acorn = require("acorn");

const walk = require("./walk");
const code = 
`
import { a } from "./foo";
console.log("Hello" + a);
console.log("World");
export const b = 1

`

let ast = acorn.parse(code, {
  locations: true, // 索引位置
  ranges: true,
  sourceType: "module",
  ecmaVersion: 7,
});

let indent = 0;
const padding = () => " ".repeat(indent);

// 遍历语法树中的每一条语句  由walk遍历子元素
// 深度优先原则
ast.body.forEach((statement) => {
  walk(statement, {
    enter(node) {
      if (node.type) {
        console.log(padding() + node.type + ' enter');
        indent += 2;
      }
    },
    leave(node) {
      if (node.type) {
        indent -= 2;
        console.log(padding() + node.type+ ' leave');
      }
    },
  });
});
