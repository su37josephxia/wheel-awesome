describe("call、apply、bind的实现", () => {

  it("测试call方法", () => {
    const { call } = require("../index");
    Function.prototype.myCall = call;
    const obj = { a: 1 };
    const f = function (...args) {
      return { context: this, args };
    };
    expect(f.myCall(obj, 1, 2)).toEqual({ context: { a: 1 }, args: [1, 2] });
  });

  it("测试apply方法", () => {
    const { apply } = require("../index");
    Function.prototype.myApply = apply;
    const obj = { a: 1 };

    const f = function (...args) {
      return { context: this, args };
    };
    expect(f.myApply(obj, [1, 2])).toEqual({ context: { a: 1 }, args: [1, 2] });
  });

  it("测试bind方法", () => {
    const { bind } = require("../index");
    Function.prototype.myBind = bind;
    const obj = { a: 1 };

    const f = function (...args) {
      return { context: this, args };
    };
    expect(f.bind(obj, 1, 2)(3, 4)).toEqual({
      context: { a: 1 },
      args: [1, 2, 3, 4],
    });
  });
});
