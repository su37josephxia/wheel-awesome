describe("new 实现", () => {
  const newObj = require("../index")
  it("new 函数没有返回值", () => {
    const mockFn = jest.fn()
    const selfNew = newObj(mockFn)
    const originNew = new mockFn()
    expect(selfNew.prototype).toBe(originNew.prototype)
  })
  it("函数返回基本类型的值", () => {
    function testFn() {
      return 1
    }
    const selfNew = newObj(testFn)
    const originNew = new testFn()
    expect(selfNew.prototype).toBe(originNew.prototype)
    expect(typeof selfNew).toBe(typeof originNew)
  })
  it("函数返回值是一个对象", () => {
    const a = { a: 2 }
    function testFn() {
      return a
    }
    const selfNew = newObj(testFn)
    const originNew = new testFn()
    expect(selfNew).toBe(originNew)
  })
  it("函数返回值是一个函数", () => {
    function innerFn() {}
    function testFn() {
      return innerFn
    }
    const selfNew = newObj(testFn)
    const originNew = new testFn()
    expect(selfNew).toBe(originNew)
  })
})
