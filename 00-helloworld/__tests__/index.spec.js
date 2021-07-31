// 1.导出一个模块
// 2.返回一个函数，函数接收一个函数参数，如果传递该参数执行之，同时传入hi给它
// 3.返回helloworld

// 套件
describe('test helloworld index', () => {
  // 测试用例1: 验证返回值
  test('should return a helloworld string', () => {
    const hello = require('../index')
    const result = hello()
    expect(result).toBe('helloworld')
  })
  
  // 测试用例2：验证回调函数是否被调用并传入hi
  test('should call fn and receive a hi', () => {
    const hello = require('../index')
    // 模拟一个函数
    const fn = jest.fn()
    hello(fn)

    // 验证是否fn被调用
    const calls = fn.mock.calls;
    expect(calls.length).toBe(1)
    expect(calls[0][0]).toBe('hi')
  })
  
})
