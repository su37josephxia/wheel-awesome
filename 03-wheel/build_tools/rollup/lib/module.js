const { parse } = require('acorn')
const MagicString = require('magic-string')
const analyse = require('./analyse')

const SYSTEM_VARS = ['console', 'log']

function has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
}

class Module {
    constructor({ code, path, bundle }) {
        this.code = new MagicString(code)
        this.path = path;
        this.bundle = bundle;

        this.ast = parse(code, {
            ecmaVersion: 7,
            sourceType: 'module'
        })
        this.analyse()
    }

    analyse() {
        this.imports = {}
        this.exports = {}
        this.ast.body.forEach(node => {
            if (node.type === 'ImportDeclaration') {
                const source = node.source.value
                const { specifiers } = node
                specifiers.forEach(specifier => {
                    const localName = specifier.local ? specifier.local.name : ''
                    const name = specifier.imported ? specifier.imported.name : ''
                    this.imports[localName] = { name, localName, source }
                })
            } else if (/^Export/.test(node.type)) {
                const declaration = node.declaration
                if (declaration.type === 'VariableDeclaration') {
                    if (!declaration.declarations) return
                    const localName = declaration.declarations[0].id.name
                    this.exports[localName] = {
                        node,
                        localName,
                        expression: declaration
                    }
                }
            }

        })

        analyse(this.ast, this.code, this)

        this.definitions = {}
        this.ast.body.forEach(statment => {
            Object.keys(statment._defines).forEach(name => {
                this.definitions[name] = statment
            })
        })
    }

    expandAllStatement() {
        const allStatements = []

        this.ast.body.forEach(statement => {
            // 忽略 import && declaration
            if (statement.type === 'ImportDeclaration') return
            if (statement.type === 'VariableDeclaration') return

            const statements = this.expandStatement(statement)
            allStatements.push(...statements)
        })

        return allStatements
    }

    /**
     * 扩展单个语句： 声明 + 调用
     * @param {*} statement 
     */
    expandStatement(statement) {
        // 此语句已经被引用
        statement._included = true

        const result = []
        const depndencies = Object.keys(statement._dependsOn)
        depndencies.forEach(name => {
            const definitions = this.define(name)
            result.push(...definitions)
        })

        // 添加自己
        result.push(statement)
        return result
    }
    /**
     * 查找变量声明
     * @param {*} name 变量名
     */
    define(name) {
        // import 模块外
        if (has(this.imports, name)) {

            // TODO
            // 加载模块
            const importDeclaration = this.imports[name]

            const source = importDeclaration.source
            const module = this.bundle.fetchModule(
                source,
                this.path
            )

            const exportData = module.exports[importDeclaration.name]
            return module.define(exportData.localName)
        } else {
            // 本模块
            const statement = this.definitions[name]
            if (statement) {
                if (statement._included) {
                    return []
                } else {
                    // 递归
                    // const b = a + 1  => a = 3 + f => f = 1
                    return this.expandStatement(statement)
                }
            } else if (SYSTEM_VARS.includes(name)) {
                return []
            } else {
                throw new Error(`没有此变量: ${name} `)
            }
        }
    }

}

module.exports = Module