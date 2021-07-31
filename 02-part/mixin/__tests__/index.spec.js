test("Mixin 实现", () => {
  const mixin = require("../index");


  const Base = class {};

  const fn = jest.fn();

  // 小吸血刀
  const canLog = {
    fn,
  };

  mixin(Base, canLog);

  // 泣血之刃
  const obj = new Base()
  obj.fn("haha");

  const calls = fn.mock.calls;
  expect(calls.length).toBe(1);
  expect(calls[0][0]).toBe("haha");

});
