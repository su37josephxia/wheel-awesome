describe('principle think test', () => {
    test('1.实现exports 功能', () => {
        var exports = {};
        (function (exports, code) {
            eval(code);
        })(exports, `var a=123;exports.default=function(a,b){return a+b}`);
        expect(exports.default(1, 2)).toBe(3);
    })

    test('2.实现require 功能', () => {
        function require(file) {
            var exports = {};
            (function (exports, code) {
                eval(code);
            })(exports, "exports.default = function(a,b){return a + b}");
            return exports;
        }
        const add = require("add.js").default;
        expect(add(1, 2)).toBe(3);
    });

    test('3.实现从入口index.js开始运行', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        (function (list) {
            var exports = {};
            function require(file) {
                (function (exports, code) {
                    eval(code);
                })(exports, list[file])
                return exports;
            }
            require("index.js");
        })({
            "index.js": `var add = require("add.js").default; console.log(add(1, 8));`,
            "add.js": `var a=123;exports.default=function(a,b){return a+b}`,
        })
        expect(consoleSpy).toHaveBeenCalledWith(9);
    });
});
