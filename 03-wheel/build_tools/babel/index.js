//  console.log 和 console.error 中插入代码的位置信息
//一些参数的功能。
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')

const sourceFileName = 'sourceFile.js'

const sourceCode = `
    console.log(1)
    function log() : number {
        console.debug('before');
        console.error(2);
        console.debug('after');
    }
    log();
    class Foo {
        bar(): void {
            console.log(3)
        }
        render() {
            return ''
            // return <div><div>
        }
    }
`

const ast = parser.parse(sourceCode, {
    plugins: ['typescript','jsx']
})

traverse(ast, {
    CallExpression(path) {
        const calleeStr = generator(path.node.callee).code
        if(['console.log','console.error'].includes(calleeStr)) {
            const {line,column} = path.node.loc.start
            path.node.arguments.unshift(types.stringLiteral(`${sourceFileName}(${line},${column}):`))

        }
    }
})

const {code ,map } = generator(ast, {
    sourceMaps: true,
    sourceFileName
})
console.log('code ',code)

console.log('map',map)