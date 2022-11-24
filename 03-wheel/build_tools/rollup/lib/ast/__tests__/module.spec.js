const Module = require('../module')
describe('测试 module ', () => {
    describe('imports', () => {
        it('import', () => {
            const code = `import a from '../module';`
            const module = new Module({ code, path: '', bundle: null })
            expect(module.imports).toEqual({
                a: {
                    "localName": "a",
                    "name": '',
                    "source": "../module",
                }
            })
        })


        it('解构import', () => {
            const code = `import { a } from '../module';`
            const module = new Module({ code, path: '', bundle: null })
            expect(module.imports).toEqual({
                a: {
                    "localName": "a",
                    "name": "a",
                    "source": "../module",
                }
            })
        })

        it('localName  as关键字', () => {
            const code = `import { a as b } from '../module';`
            const module = new Module({ code, path: '', bundle: null })
            expect(module.imports).toEqual({
                b: {
                    "localName": "b",
                    "name": "a",
                    "source": "../module",
                }
            })
        })
    })

    describe('export', () => {
        it('export', () => {
            const code = `export var a = 1`
            const module = new Module({ code, path: '', bundle: null })
            expect(module.exports['a'].localName).toBe('a')
            expect(module.exports['a'].node).toBe(module.ast.body[0])
            expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration)

        })

        // it('default', () => {
        //     // TODO
        //     const code = `export default home`
        // })

        // it('export default home', () => {
        //     // TODO
        //     const code = `export default home`
        // })
    })


    describe('定义变量 definitions', () => {
        it('export', () => {
            const code = `const a = 1;
            const b = 2; 
            `
            const module = new Module({ code, path: '', bundle: null })
            expect(module.definitions).toEqual({
                a: module.ast.body[0],
                b: module.ast.body[1]
            })
        })
    })


    describe('expandAllStatements', () => {
        it('', () => {
            const code = `const a = () =>  1;
            const b = () =>  1;
            a();
            `
            const module = new Module({ code, path: '', bundle: null })
            const statements = module.expandAllStatements()
            // console.log(statements)
            expect(statements.length).toBe(2)
        })
    })


})