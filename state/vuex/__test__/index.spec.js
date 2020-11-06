const { createStore } = require("../index");
it("基本功能：store统一存储状态，commit()修改状态", () => {
  const mockFn = jest.fn();
  const store = createStore({
    state: { num: 0 },
    mutations: {
      add(state) {
        state.num++;
      },
    },
  });

  // 添加副作用函数
  store.effect(mockFn);
  store.commit("add");

  const calls = mockFn.mock.calls;

  // 断言 mock方法只调用一次，num值为1
  expect(calls.length).toBe(1);
  expect(store.state.num).toBe(1);
});
