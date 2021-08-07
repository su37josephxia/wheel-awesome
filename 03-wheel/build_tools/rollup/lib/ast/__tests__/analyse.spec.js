const analyse = require("../analyse");
describe("AST Analyse方法", () => {
  it("空语法树", () => {
    const ast = {
      body: [],
    };

    analyse(ast);
  });
});
