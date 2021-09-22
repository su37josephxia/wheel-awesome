describe("Helloworld", ()=>{
    test("返回参数正确", ()=>{
        const hello = require('../index')

        const fn = jest.fn();
        hello()
        expect(hello(fn)).toBe("helloworld")
    })

    test("回调函数被正确调用", ()=>{
        const hello = require('../index')
        const fn = jest.fn()
        hello(fn)

        const calls = fn.mock.calls
        expect(calls.length).toBe(1)
        expect(calls[0][0]).toBe("hi")
    })
})