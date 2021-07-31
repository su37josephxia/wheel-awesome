it("节流Throttle首次执行", (done) => {
  const { throttle } = require("../index");

  // 定义一个Mock函数
  const mockFn = jest.fn();

  // 封装为节流方法
  const fn = throttle(mockFn, 50, true);

  // 同步调用两次
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    // 根据参数判断以第一次调用为准
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});

it("节流Throttle非首次执行", (done) => {
  const { throttle } = require("../index");

  // 定义一个Mock函数
  const mockFn = jest.fn();

  // 封装为节流方法
  const fn = throttle(mockFn, 60);

  // 同步调用两次
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言 mock方法只调用一次
    expect(calls.length).toBe(0);
    done();
  }, 50);
});

it("防抖Debounce非首次执行", (done) => {
  const { debounce } = require("../index");
  const mockFn = jest.fn();
  // 封装一个防抖函数
  const fn = debounce(mockFn, 10);

  // 连续两次调用
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言只调用一次
    expect(calls.length).toBe(1);
    // 断言以最后一次调用为准
    expect(calls[0][0]).toBe(2);
    done();
  }, 50);
});

it("防抖Debounce首次执行", (done) => {
  const { debounce } = require("../index");
  const mockFn = jest.fn();
  // 封装一个防抖函数
  const fn = debounce(mockFn, 10, true);

  // 连续两次调用
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;
    // 断言只调用一次
    expect(calls.length).toBe(1);
    // 断言以最后一次调用为准
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});
