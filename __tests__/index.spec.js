const test = require('../test-case')
describe('Koa reduce实现', () => {
    const { compose } = require('../koa/koa-reduce')
    test(compose)
})

describe('Koa 递归实现', () => {
    const { compose } = require('../koa')
    test(compose)
})

describe('Redux reduce实现', () => {
    const { compose } = require('../redux/reduce')
    test(compose)
})

describe('Redux reduceRight实现', () => {
    const { compose } = require('../redux/reduceRight')
    test(compose)
})



describe('Redux reduceRight Promise实现', () => {
    const { compose } = require('../redux/reducePromise')
    test(compose)
})


describe('Express 实现', () => {
    const { compose } = require('../express')
    test(compose)
})

describe('Strategy 责任链实现', () => {
    const { compose } = require('../strategy')
    test(compose)
  })