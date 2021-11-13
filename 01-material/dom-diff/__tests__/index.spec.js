describe("数组Diff", () => {
  it("增加元素", () => {
    const mountElement = jest.fn();
    const remove = jest.fn();
    const { diffArray } = require("../index");
    diffArray([1, 2, 3, 5], [1, 2, 3, 4], { mountElement, remove });

    // 第一次调用次数
    expect(mountElement.mock.calls.length).toBe(1);
    // 第一次调用的第一个参数
    expect(mountElement.mock.calls[0][0]).toBe(4);

    expect(remove.mock.calls.length).toBe(1);
    expect(remove.mock.calls[0][0]).toBe(5);
  });

  it("删除元素", () => {
    const mountElement = jest.fn();
    const remove = jest.fn();
    const { diffArray } = require("../index");
    diffArray([1, 2, 3, 5], [1, 2, 3, 4], { mountElement, remove });

    expect(mountElement.mock.calls.length).toBe(1);
    expect(mountElement.mock.calls[0][0]).toBe(4);

    expect(remove.mock.calls.length).toBe(1);
    expect(remove.mock.calls[0][0]).toBe(5);
  });
});
