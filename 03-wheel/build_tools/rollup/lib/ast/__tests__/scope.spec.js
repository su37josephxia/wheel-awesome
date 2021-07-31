describe("AST Scope函数", () => {
  test("单节点", () => {
    /**
     * 参考代码
     * const a = '1'
     * function() {
     *   const b = 2
     * }
     */
    const Scope = require("../scope.js");
    const root = new Scope({
        
    });
    root.add("a");
    const child = new Scope({
        parent: root,
    })
    child.add('b')
    
    expect(child.findDefiningScope("a")).toBe(root);
    expect(child.cantains('a')).toEqual(true)
    expect(child.findDefiningScope("b")).toBe(child);
    expect(child.cantains('b')).toEqual(true)

  });





});
