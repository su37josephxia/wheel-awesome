const acorn = require('acorn');
const { default: MagicString } = require('magic-string');

module.exports = function (code) {
    return code

    // const ast = acorn.parse(code, {
    //     locations: true, // 索引位置
    //     ranges: true,
    //     sourceType: "module",
    //     ecmaVersion: 7,
    // });

    // const m = new MagicString(code)
    // m.snip(node.start, node.end).toString()


}