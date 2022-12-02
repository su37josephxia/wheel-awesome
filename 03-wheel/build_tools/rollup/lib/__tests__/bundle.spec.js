const Bundle = require('../bundle')
const fs = require('fs')
jest.mock("fs");

describe("测试 Bundle", () => {


    describe('fetchModule', () => {
        test("构造函数", () => {
            const bundle = new Bundle({ entry: './a.js' })
            fs.readFileSync.mockReturnValueOnce(`
            const a = 1;`)
            bundle.fetchModule('index.js')
            const { calls } = fs.readFileSync.mock
            expect(calls[0][0]).toBe('index.js')

        });
    })

    describe('build', () => {
        test("单语句", () => {
            const bundle = new Bundle({ entry: 'index.js' })

            fs.readFileSync.mockReturnValueOnce(`console.log(1)`)
            bundle.build('bundle.js')
            const { calls } = fs.writeFileSync.mock
            expect(calls[0][0]).toBe('bundle.js')
            expect(calls[0][1]).toBe('console.log(1)')

        });

        test("多语句", () => {
            const bundle = new Bundle({ entry: 'index.js' })
            jest.mock("fs");
            const code =
                `const a = () => 1;
const b = () => 2;
a();`
            fs.readFileSync.mockReturnValue(code)
            fs.writeFileSync.mock.calls = []
            bundle.build('bundle.js')
            const { calls } = fs.writeFileSync.mock
            expect(calls[0][0]).toBe('bundle.js')
            expect(calls[0][1]).toBe(`const a = () => 1;
a();`)
        });
    })




});
