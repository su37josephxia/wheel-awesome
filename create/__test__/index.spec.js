const newCreate = require('../index') 
Object.prototype.newCreate = newCreate

describe('Object create实现', () => {
  it('只有一个参数', () => {
    const person = {
      age: '18',
      say: function(){
        return `I am ${this.name}, I am ${this.age} years old`
      }
    }
    const newCreate = Object.newCreate(person)
    const originCreate = Object.create(person)
    newCreate.name = 'Tom'
    originCreate.name = 'Tom'
    expect(newCreate.say()).toBe(originCreate.say())
  })
  it('有第二个参数', () => {
    const target = { a: 1 }
    let cVal = 3
    const properies = {
      b: {
        value: 2
      },
      c: {
        get: function(){
          return cVal
        },
        set: function(val){
          cVal = val
        }
      }
    }
    const newCreate = Object.newCreate(target, properies)
    expect(newCreate.b).toBe(2)
    expect(newCreate.c).toBe(3)
    newCreate.c = 4
    expect(newCreate.c).toBe(4)
  })
  it('有第二个参数,但是参数不为包装对象', () => {
    const properies = {
      c: null
    }
    expect(() => Object.newCreate({}, properies)).toThrow(TypeError)
  })
  it('参数异常',() => {
    expect(() => Object.newCreate()).toThrow(TypeError)
    expect(() => Object.newCreate(undefined)).toThrow(TypeError)
    expect(() => Object.newCreate(true)).toThrow(TypeError)
  })
})