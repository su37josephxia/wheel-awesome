//导入一个函数

describe('test helloworld index' , () => {
   //测试用例 test return
   test("should return helloworld string" , () => {
       const hello = require("../index");
       const result = hello();
       expect(result).toBe('helloworld');
   })

    //测试用例 test callback
    test('should call fn and receive a hi' , () => {
        const hello = require("../index");
        const fn = jest.fn();
        hello(fn);
        const calls = fn.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toBe('hi')
    })
})
