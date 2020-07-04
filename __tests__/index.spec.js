const test = require('../test-case')
describe('Koa 递归实现', () => {
    const { compose } = require('../koa')
    test(compose)
})
describe('Redux reduce实现', () => {
    const { compose } = require('../redux/reduce')
    test(compose)
})