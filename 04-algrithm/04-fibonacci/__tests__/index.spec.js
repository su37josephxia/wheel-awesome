const { fi, fi2 } = require('../index')

describe('斐波那契数列', () => {
    describe('递归', () => {
        it('fibonacci(9) => 34', () => {
            expect(fi(9)).toBe(55)
        })
        it('fibonacci(16) => 987', () => {
            expect(fi(40)).toBe(165580141)
        })
    })

    describe('动态规划', () => {
        it('fibonacci(9) => 34', () => {
            expect(fi2(9)).toBe(55)
        })
        it('fibonacci(16) => 987', () => {
            expect(fi2(40)).toBe(165580141)
        })
    })


})