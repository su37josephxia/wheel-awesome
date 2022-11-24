const analyse = require("../analyse");
const MagicString = require('magic-string')
const acorn = require('acorn')
function getCode(code) {
  const ast = acorn.parse(code, {
    locations: true, // 索引位置
    ranges: true,
    sourceType: "module",
    ecmaVersion: 7,
  })
  return {
    ast,
    magicString: new MagicString(code)
  }
}
describe("AST Analyse方法", () => {
  it("空语法树", () => {
    const ast = {
      body: [],
    };

    analyse(ast);
  });

  // it("返回值", () => {
  //   const { ast, magicString } = getCode(`const a = () => 'a'`)

  //   analyse(ast, magicString)
  //   expect(ast._scope.cantains('a')).toBe(true)
  //   // expect(ast._scope.findDefiningScope('a')).toBe(true)

  //   expect(ast.body[0]._defines).toEqual({ a: true })  // 变量定义
  //   expect(ast.body[0]._dependsOn).toEqual({})  // 依赖外部变量
  //   expect(ast.body[0]._included).toEqual(false) // 是否已经被打包
  //   expect(ast.body[0]._source.toString()).toBe(`const a = () => 'a'`) // 源码

  // })


  describe("作用域分析", () => {


    it("单个变量", () => {
      const { ast, magicString } = getCode(`const a = () => 'a'`)

      analyse(ast, magicString)
      expect(ast._scope.cantains('a')).toBe(true)
      expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope)
      expect(ast.body[0]._defines).toEqual({ a: true })  // 变量定义
    })

    it("多个变量", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
        const b = () => 'b'`
      )

      analyse(ast, magicString)
      expect(ast._scope.cantains('a')).toBe(true)
      expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope)
      expect(ast._scope.cantains('b')).toBe(true)
      expect(ast._scope.findDefiningScope('b')).toEqual(ast._scope)
      expect(ast.body[0]._defines).toEqual({ a: true })  // 变量定义
      expect(ast.body[1]._defines).toEqual({ b: true })  // 变量定义
    })


    it("嵌套变量", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
        if(true) {
          const b = () => 'b'
        }
        `
      )

      analyse(ast, magicString)
      expect(ast._scope.cantains('a')).toBe(true)
      expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope)
      expect(ast._scope.cantains('b')).toBe(true)
      expect(ast._scope.findDefiningScope('b')).toEqual(ast._scope)
      expect(ast.body[0]._defines).toEqual({ a: true })  // 变量定义
      expect(ast.body[1]._defines).toEqual({ b: true })  // 变量定义
    })


    it("嵌套变量", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
        function f() {
          const b = () => 'b'
        }
        `
      )

      analyse(ast, magicString)
      // console.log('ast._scope', ast._scope)
      expect(ast._scope.cantains('a')).toBe(true)
      expect(ast._scope.findDefiningScope('a')).toEqual(ast._scope)
      expect(ast._scope.cantains('f')).toBe(true)
      expect(ast._scope.findDefiningScope('f')).toEqual(ast._scope)
      expect(ast.body[1]._scope.cantains('b')).toBe(true)
      expect(ast.body[1]._scope.findDefiningScope('f')).toEqual(ast._scope)
      expect(ast.body[1]._scope.findDefiningScope('b')).toEqual(ast.body[1]._scope)
      expect(ast.body[0]._defines).toEqual({ a: true })  // 全局变量定义
      expect(ast.body[1]._defines).toEqual({ f: true })  // 全局变量定义 
    })


  })


  describe("变量依赖分析", () => {
    it("无需依赖", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
         a();
        `
      )

      analyse(ast, magicString)
      expect(ast.body[0]._dependsOn).toEqual({ a: true })
      expect(ast.body[1]._dependsOn).toEqual({ a: true })
    })

    it("依赖依赖", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
         a();
         b()
        `
      )

      analyse(ast, magicString)
      expect(ast.body[0]._dependsOn).toEqual({ a: true })
      expect(ast.body[1]._dependsOn).toEqual({ a: true })
      expect(ast.body[2]._dependsOn).toEqual({ b: true })
    })

    it("fun作用域依赖", () => {
      const { ast, magicString } = getCode(
        `const a = () => 'a';
         a();
         function f() {
          b();
          a()
         }
        `
      )

      analyse(ast, magicString)
      expect(ast.body[0]._dependsOn).toEqual({ a: true })
      expect(ast.body[1]._dependsOn).toEqual({ a: true })
      expect(ast.body[2]._dependsOn).toEqual({ b: true, f: true, a: true })
    })
  })




});
