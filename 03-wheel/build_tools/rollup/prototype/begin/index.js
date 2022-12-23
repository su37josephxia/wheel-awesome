const fs = require('fs')
const acorn = require('acorn')
const MagicString = require( 'magic-string' );

const code = fs.readFileSync('./source.js').toString()

let ast = acorn.parse(code, {
    locations: true, // 索引位置
    ranges: true,
    sourceType: "module",
    ecmaVersion: 7,
  });

//   console.log('ast', ast)

// 打印
const m = new MagicString(code)
// ast.body.map((node,i) =>  {
//     console.log(`${i}: ${m.snip(node.start, node.end).toString()}`)
// })


// 用户声明
console.log('====analayze=======')
const delarations = {}
ast.body
.filter(node => node.type === 'VariableDeclaration')
.map(node => {
    console.log('VariableDeclaration:',node.declarations[0].id.name)
    delarations[node.declarations[0].id.name] = node
})


const statements = []
console.log('====expand=======')
ast.body
.filter(node => node.type !== 'VariableDeclaration')
.map((node,i) => {
    statements.push(delarations[node.expression.callee.name])
    statements.push(node)
    return {node,i}
})

console.log('=====output=======')
statements.map((node,i) => {
    console.log(`${i}: ${m.snip(node.start, node.end).toString()}`)
})




// console.log('=======树状遍历器=========')
// const walk = require('../acorn/walk')
// ast.body
// .forEach((statement) => {
//     // console.log('walk=>',statement)
//     walk(statement, {
//       enter(node) {
//         node.type == 'Identifier' && console.log('node type:',node.type, node)
//       },
//       leave(node) {
//       },
//     });
//   });




