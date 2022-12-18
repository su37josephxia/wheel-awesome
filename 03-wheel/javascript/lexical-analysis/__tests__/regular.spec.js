describe('', () => {
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
            expect(calls[0]).toEqual(['1'])
            expect(calls[1]).toEqual(['2'])
            expect(calls[2]).toEqual(['3'])
        })
    })


    describe('词法分析', () => {
        it('关键字匹配', () => {
            const fn = jest.fn()
            // exec 可以多次执行
            const reg = /const|let|var|=/g
            // 关键字匹配 var let const
            const str = `const a = 1`

            let r
            while (r = reg.exec(str)) {
                fn(...r)
            }
            const { calls } = fn.mock
            expect(calls[0]).toEqual(['const'])
            expect(calls[1]).toEqual(['='])
        })


        it('关键字匹配2', () => {
            const fn = jest.fn()
            // exec 可以多次执行
            const reg = /const|let|var|while|=/g
            // 关键字匹配 var let const
            const str = `const a = 1;
            while(true) {
                console.log(a)
            }`

            let r
            while (r = reg.exec(str)) {
                fn(...r)
            }
            const { calls } = fn.mock
            expect(calls[0]).toEqual(['const'])
            expect(calls[1]).toEqual(['='])
            expect(calls[2]).toEqual(['while'])
        })


        it('跳格判断', () => {
            const fn = jest.fn()
            // exec 可以多次执行
            const reg = /const|let|var|=/g
            // 关键字匹配 var let const
            const str = `const a = 1;
            const b = 2;
            `

            let r
            let currentIndex = 0
            while (r = reg.exec(str)) {
                const { 0: key, index, input } = r

                // console.log(key, index)
                if (currentIndex === index) {
                    // console.log('没跳', index)
                    currentIndex = index + key.length
                } else {
                    // console.log('跳了')
                }
            }

        })


        it('关键字判断', () => {
            const fn = jest.fn()
            // exec 可以多次执行
            const reg = /(const|let|var)|(?: |\n|\t)|[_$a-zA-Z][a-zA-Z0-9_$]*|;|=|"[^"]*"/g
            // 关键字匹配 var let const
            const str = `const a = "1";
            const b = "2";`

            let r
            let currentIndex = 0
            while (r = reg.exec(str)) {
                const { 0: key, index } = r
                if (currentIndex === index) {
                    // console.log(`✅跳： [${key}] ${index}`)
                    currentIndex = index + key.length
                    fn(key)
                } else {
                    // console.log(`❌跳： [${key}] ${index}`)
                }

            }
            const { calls } = fn.mock
            expect(calls.join('')).toBe(str)
        })


        it('分辨关键字、空白符、表示符(变量名)', () => {
            const fn = jest.fn()
            // exec 可以多次执行
            const reg = /(const|let|var)|( |\n|\t)|([_$a-zA-Z][a-zA-Z0-9_$]*)|("[^"]*")|(=|;)/g
            // 关键字匹配 var let const
            const str = `const a = "1";
            const b = "2";`

            // 使用match + 正则表达式的分组功能
            // console.log('abc'.match(/a(b)(c)/))


            let r
            let currentIndex = 0
            while (r = reg.exec(str)) {
                // const { 0: key, index } = r
                const { 0: key, 1: keyword, 2: whiteSpace, 3: indentifer, punctuator, stringLiteral } = r
                // console.log('r', r)
                if (r[1]) {
                    console.log('keyword:', keyword,)

                } else if (r[2]) {
                    console.log('whiteSpace:', whiteSpace,)
                } else if (r[3]) {
                    1

                    1
                    console.log('indentifer:', indentifer)
                } else if (r[4]) {
                    console.log('punctuator:', punctuator)
                } else if (r[5]) {
                    console.log('stringLiteral:', stringLiteral)
                }

                // if (currentIndex === index) {
                //     currentIndex = index + key.length

                //     // fn(key)
                // } else {
                //     // console.log(`❌跳： [${key}] ${index}`)
                // }

            }

            // 字符串完整判定 
            // https://262.ecma-international.org/13.0/#sec-literals-string-literals
            // https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-ecmascript-language-lexical-grammar

            // const { calls } = fn.mock
            // expect(calls.join('')).toBe(str)
        })
    })







})