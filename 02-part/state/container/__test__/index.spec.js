describe("统一状态管理", () => {
  const reducer = (state = { num: 100 }, action) => {
    switch (action.type) {
      case "clear":
        return { num: 0 };
      case "add":
        return { num: state.num + action.payload };
      default:
        return state;
    }
  };

  it("基本功能 订阅通知 改变状态", () => {
    const { createStore } = require("../index");
    const mockFn = jest.fn();
    const store = createStore(reducer);

    // 建立响应订阅
    store.effect(mockFn);
    store.dispatch({
      type: "clear",
    });
    // store.dispatch({ type: "add", payload: 1 });

    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    expect(store.getState().num).toBe(0);
  });

  it("改变状态 带载荷Payload", () => {
    const { createStore } = require("../index");
    const mockFn = jest.fn();
    const store = createStore(reducer);

    // 建立响应订阅
    store.effect(mockFn);
    store.dispatch({ type: "add", payload: 1 });

    const calls = mockFn.mock.calls;
    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    expect(store.getState().num).toBe(101);
  });

  it("多Action", () => {
    const { createStore } = require("../index");
    const mockFn = jest.fn();
    const store = createStore(reducer);

    // 建立响应订阅
    store.effect(mockFn);
    store.dispatch({ type: "clear" });
    store.dispatch({ type: "add", payload: 1 });

    const calls = mockFn.mock.calls;
    // 断言 mock方法只调用两次
    expect(calls.length).toBe(2);
    expect(store.getState().num).toBe(1);
  });
});
