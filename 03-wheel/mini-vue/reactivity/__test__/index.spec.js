const { reactive, watchEffect } = require('../index')

describe('reactivity/vue3', () => {

    it('测试数据改变时 是否被响应', () => {
        const data = reactive({
            name: 'abc',
            age: {
                n: 5
            }
        })
        // Mock一个响应函数
        const fn = jest.fn()

        // 设置响应函数
        watchEffect(fn)
        // 改变数据
        data.name = 'efg'
        // 确认fn生效
        expect(fn).toBeCalled()
    })


    it('订阅发布 ', () => {
        const data = reactive({
            age: {
                n: 5
            }
        })
        // Mock一个响应函数
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        // 设置响应函数
        watchEffect(fn1)
        watchEffect(fn2)
        // 改变多层数据
        data.age.n = 1
        // 确认fn生效
        expect(fn1).toBeCalled()
        expect(fn2).toBeCalled()
    })


    it('测试多层数据中改变时 是否被响应', () => {
        const data = reactive({
            age: {
                n: 5
            }
        })
        // Mock一个响应函数
        const fn = jest.fn()
        // 设置响应函数
        watchEffect(fn)
        // 改变多层数据
        data.age.n = 1
        // 确认fn生效
        expect(fn).toBeCalled()
    })


    it('测试数组中数据改变时 是否被响应', () => {
        const data = reactive({
            ary: [
                'a'
            ]
        })
        // Mock一个响应函数
        const fn = jest.fn()

        // 设置响应函数
        watchEffect(fn)

        // 改变多层数据
        data.ary.push('b')

        // 确认fn生效
        expect(fn).toBeCalled()
    })
})