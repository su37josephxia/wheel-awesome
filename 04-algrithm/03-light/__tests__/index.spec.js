const { getNum } = require('../index')
// 24小时制
describe('电子钟的亮灯数', () => {
    test('27处亮灯 8800种', () => {
        expect(getNum(27)).toBe(8800)
    })

    test('30处亮灯 8360种', () => {
        expect(getNum(30)).toBe(8360)
    })
})