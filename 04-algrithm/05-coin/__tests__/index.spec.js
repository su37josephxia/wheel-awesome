const { check } = require('../index')
describe('杨辉三角', () => {
    it('第1层 需要的2个硬币数', () => {
        expect(check(1)).toBe(2)
    })
    it('第2层 需要的8个硬币数', () => {
        expect(check(3)).toBe(8)
    })
    it('第45层 需要的3518437540个硬币数', () => {
        expect(check(45)).toBe(3518437540)
    })
})