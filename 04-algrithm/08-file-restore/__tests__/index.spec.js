const { restore } = require("..")

describe('让文件恢复原位', () => {
    it('3个文件', () => {
        expect(restore(3)).toEqual(8)
    })

    it('5个文件', () => {
        expect(restore(5)).toEqual(124)
    })

    it('15个文件', () => {
        expect(restore(15)).toEqual(1307674368014)
    })
})
