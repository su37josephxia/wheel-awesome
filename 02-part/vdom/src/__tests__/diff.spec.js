describe("Diff 算法", () => {
  function createDom() {
    const fn = jest.fn();
    return {
      createElement: (...args) => fn("creatElement", ...args),
      patchProp: (...args) => fn("patchProp", ...args),
      setText: (...args) => fn("setText", ...args),
      mountElement: (...args) => fn("mountElement", ...args),
      replaceElement: (...args) => fn('replaceElement',...args)
    };
  }


  it("case01", () => {
    console.log("diff");
  });
});
