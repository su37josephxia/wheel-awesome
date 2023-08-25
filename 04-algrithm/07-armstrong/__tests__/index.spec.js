const { findArmstrong } = require("..")

describe('寻找自幂数', () => {
    it('三进制', () => {
        expect(findArmstrong(3)).toEqual(['12', '22', '122'])
    })

    it('八进制', () => {
        expect(findArmstrong(8)).toEqual(['24', '64',
            '134',
            '205',
            '463',
            '660',
            '661', '40663'])
    })
})

24
