const analyse = require("../analyse");
const acorn = require('acorn')
describe("AST Analyse方法", () => {
  it("空语法树", () => {
    const ast = {
      body: [],
    };

    analyse(ast);
  });

  it("", () => {
    const code = `const a = () => 'a'`
    const ast = acorn.parse(code, {
      locations: true, // 索引位置
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    })
    analyse(ast)
    console.log('ast', ast)

    // ast._scope 描述作用域


  })


});
