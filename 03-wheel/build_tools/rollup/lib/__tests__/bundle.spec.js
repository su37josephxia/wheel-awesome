const Bundle = require('../bundle')
const fs = require('fs')
const path = require('path')
jest.mock('fs')
describe('测试 Bundle', () => {
    test('fetchModule', () => {
        const bundle = new Bundle({ entry: './a.js' })
        fs.readFileSync.mockReturnValueOnce(`const a = 1;`)
        const module = bundle.fetchModule('index.js')
        const { calls } = fs.readFileSync.mock
        expect(calls[0][0]).toBe('index.js')
        expect(module.code.toString()).toBe(`const a = 1;`)
    })

    test("主模块路径", () => {
        const bundle = new Bundle({ entry: "./a.js" });
        fs.readFileSync.mock.calls = []
        fs.readFileSync.mockReturnValueOnce("const a = 1");
        bundle.fetchModule("/index.js");
        const { calls } = fs.readFileSync.mock;
        expect(calls[0][0]).toEqual("/index.js");
    });
    describe("非主模块", () => {
        test("测试绝对路径", () => {
            const bundle = new Bundle({ entry: "./a.js" });
            fs.readFileSync.mock.calls = []
            fs.readFileSync.mockReturnValueOnce("const a = 1");
            bundle.fetchModule("/index.js", "main.js");
            const { calls } = fs.readFileSync.mock;
            //   console.log(calls[0][0]);
            expect(calls[0][0]).toEqual("/index.js");
        });
        test("测试相对路径", () => {
            const bundle = new Bundle({ entry: "./a.js" });
            fs.readFileSync.mock.calls = []
            fs.readFileSync.mockReturnValueOnce("const a = 1");
            const importee = path.resolve("./bundle.js");
            // console.log({ importee });
            bundle.fetchModule("../bundle.js", "./a/main.js");
            const { calls } = fs.readFileSync.mock;
            //   console.log(calls[0][0]);
            expect(calls[0][0]).toEqual(importee);
        });
    });

    describe('build', () => {
        test('单条语句', () => {
            const bundle = new Bundle({ entry: 'index.js' })
            fs.readFileSync.mockReturnValueOnce(`console.log(1)`)
            bundle.build('bundle.js')
            const { calls } = fs.writeFileSync.mock
            expect(calls[0][0]).toBe('bundle.js')
            expect(calls[0][1]).toBe(`console.log(1)`)
        })


        test('多条语句', () => {
            const bundle = new Bundle({ entry: 'index.js' })
            fs.readFileSync.mockReturnValueOnce(`const a = () => 1;
            const b = () => 2;
            a()`)
            fs.writeFileSync.mock.calls = []
            bundle.build('bundle.js')
            const { calls } = fs.writeFileSync.mock
            expect(calls[0][0]).toBe('bundle.js')
            expect(calls[0][1]).toBe(`const a = () => 1;
a()`)
        })

        test('多模块', () => {
            const bundle = new Bundle({ entry: 'index.js' })
            fs.readFileSync.mockReturnValueOnce(`import { a } from './a';
    a();`)
                .mockReturnValueOnce('export const a = () => 1;')

            fs.writeFileSync.mock.calls = []
            bundle.build('bundle.js')
            const { calls } = fs.writeFileSync.mock
            expect(calls[0][0]).toBe('bundle.js')
            expect(calls[0][1]).toEqual(`const a = () => 1;
a();`)
        })

    })


})