describe("时间旅行", () => {
    const createHistory = require('../index')
  it("当前状态 On the fly ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})

    expect(history.present.num).toBe(3)
  });

  it("前进 ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.undo()
    expect(history.present.num).toBe(2)
  });

  it("回退 ", () => {
    const history = createHistory()

    history.push({num: 1})
    history.push({num: 2})
    history.push({num: 3})
    history.push({num: 4})
    history.undo()
    history.undo()
    history.undo()
    history.redo()
    expect(history.present.num).toBe(2)
  });
});
