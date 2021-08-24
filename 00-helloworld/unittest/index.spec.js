describe('Hello Word', () => {
    test('返回参数正确', () => {
        let hello = require('../index.js')
        let fn = jest.fn()
        expect(hello(fn)).toBe('helloworld')
    })

    test('参数执行正确', () => {
        let hello = require('../index.js')
        let fn = jest.fn()
        hello(fn);

        const calls = fn.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toBe("hi");
    })
})