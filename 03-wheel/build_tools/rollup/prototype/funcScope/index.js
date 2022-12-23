const fs = require('fs')
const acorn = require('acorn')
const MagicString = require('magic-string');

const code = fs.readFileSync('./source.js').toString()

let ast = acorn.parse(code, {
    locations: true, // 索引位置
    ranges: true,
    sourceType: "module",
    ecmaVersion: 7,
});

// console.log('=======树状遍历器=========')
const walk = require('./walk')
let indent = 0
ast.body
    .forEach((statement) => {
        // console.log('walk=>',statement)
        walk(statement, {
            enter(node) {


                if (node.type == 'FunctionDeclaration') {
                    console.log('%sfunction: %s', " ".repeat(indent * 4), node.id.name)
                    indent++
                }

                if (node.type == 'VariableDeclarator') {
                    console.log('%svariable:', " ".repeat(indent * 4), node.id.name)
                }
            },
            leave(node) {
                if (node.type == 'FunctionDeclaration') {
                    indent--
                }
            },
        });
    });




