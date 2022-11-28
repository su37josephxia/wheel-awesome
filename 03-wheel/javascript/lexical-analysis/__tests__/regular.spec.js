describe('正则表达式', () => {
    it('判断十进制整数', () => {

        // 打印0-127
        // const str = (new Array(128)).fill().map((v, i) => String.fromCharCode(i)).concat('');
        // console.log('str', str)

        expect(/[1-9]{1,}/.test('1')).toBe(true)
        expect(/[1-9]{1,}/.test('12')).toBe(true)
        expect(/[1-9]{1,}/.test('10')).toBe(true)
        expect(/[1-9]{1,}/.test('02')).toBe(true)

        // 允许0
        expect(/^0$|^[1-9]{1,}$/.test('0')).toBe(true)


        // 判断首个字符不为0
        expect(/^0$|^[1-9][0-9]{1,}$/.test('12')).toBe(true)
        expect(/^0$|^[1-9][0-9]{1,}$/.test('02')).toBe(false)

        // 允许 ’-‘ 负号
        expect(/^0$|^[-]{0,1}[1-9][0-9]{1,}$/.test('12')).toBe(true)
        expect(/^0$|^[-]{0,1}[1-9][0-9]{1,}$/.test('-12')).toBe(true)
    })

    it('判断带小数的', () => {
        // 没有点
        let decimalReg1 = /^(0|-{0,1}[1-9][0-9]{0,})$/
        // 后面只有点
        let decimalReg2 = /^-{0,1}[1-9][0-9]{0,}\.$|^0\.$/
        // 点在中间
        let decimalReg3 = /^-{0,1}[1-9][0-9]{0,}\.[0-9]{0,}$|^0\.[0-9]{0,}$/
        // 点在前面
        let decimalReg4 = /^-{0,1}\.[0-9]{0,}$/

        let decimalReg12 = /^(-{0,1}[1-9][0-9]{0,}|0)\.{0,1}$/

        let decimalReg23 = /^-{0,1}[1-9][0-9]{0,}\.[0-9]{0,}$|^0\.[0-9]{0,}$/

        let decimalReg123 = /^-{0,1}[1-9][0-9]{0,}(\.[0-9]{0,}){0,1}$|^0(\.[0-9]{0,}){0,1}$/

        let decimalReg1234 = /^(-{0,1}[1-9][0-9]{0,}(\.[0-9]{0,}){0,1}|0(\.[0-9]{0,}){0,1})|(-{0,1}\.[0-9]{0,})$/



        expect(/^0$|^[-]{0,1}[1-9][0-9]{1,}\.{0,1}$/.test('12.')).toBe(true)
        expect(/^0$|^[-]{0,1}[1-9][0-9]{1,}\.{0,1}[0-9]{1,}$/.test('12.1')).toBe(true)

        // 允许 . 打头
        expect(/^0$|^([-]{0,1}[1-9][0-9]{1,}){0,1}\.{0,1}[0-9]{0,}$/.test('.12')).toBe(true)

        const reg = /^0$|^([-]{0,1}[1-9][0-9]{1,}){0,}(\.{0,1}[0-9]{0,}){0,}$/

        expect(decimalReg1234.test('1.12')).toBe(true)
        expect(decimalReg1234.test('.12')).toBe(true)
        expect(decimalReg1234.test('1')).toBe(true)
        expect(decimalReg1234.test('0')).toBe(true)
        expect(decimalReg1234.test('01')).toBe(true)

    })


    it('match的用法', () => {
        // let reg = ''
        // const code = 'abc'

        // // 起到匹配作用
        // console.log(code.match(/^[a]([a-z]*)[c]$/))

        // // 只起到分组作用需要加 ?:
        // reg = /[a](?:[a-z])[c]/
        // console.log(code.match(reg))

        // const random2 = 'abcadc'
        // reg = /[a](?:[a-z])([c])/g


        // // console.log(random2.replace(random2, 'xyz'))

        // let i = 3
        // random2.replace(reg, (...args) => {
        //     i++
        //     console.log(args)
        // })
    })

    it('replace的用法', () => {
        const fn = jest.fn()
        'abcadc'.replace(/[a]([a-z])[c]/g, fn)
        let calls = fn.mock.calls
        expect(calls[0]).toEqual(['abc', 'b', 0, 'abcadc'])
        expect(calls[1]).toEqual(['adc', 'd', 3, 'abcadc'])

        // 只用于分组 ?:
        'abcadc'.replace(/[a](?:[a-z])[c]/g, fn)
        expect(calls[2]).toEqual(['abc', 0, 'abcadc'])
        expect(calls[3]).toEqual(['adc', 3, 'abcadc'])

    })

    it('exec的用法', () => {
        const fn = jest.fn()
        // exec 可以多次执行
        const reg = /\d/g
        const str = '123'

        // 古老的编程结构
        let r
        while (r = reg.exec(str)) {
            fn(...r)
        }
        const { calls } = fn.mock
        console.log(calls[0])
        expect(calls[0]).toEqual(['1'])
        expect(calls[1]).toEqual(['2'])
        expect(calls[2]).toEqual(['3'])
    })


})