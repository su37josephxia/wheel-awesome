const getVars = require('../ast')


describe('获取代码中的变量名', () => {
    it('单条语句', () => {
        const vars = getVars(`
const a = 1
        `)
        expect(vars).toEqual(['a'])
    })
})