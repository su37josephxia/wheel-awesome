const { check, checkMem, checkDP } = require('../index');
describe('分桌坐 ', () => {
    describe('递归解法', () => {
        it('6人 每桌最少坐2人 4种分法', () => {
            expect(check(6, 2, 10)).toBe(4);
        })
        it('10人 每桌最少坐2人 12种分法', () => {
            expect(check(10, 2, 10)).toBe(12);
        })
        it('100人 每桌最少坐2人 437420种分法', () => {
            expect(check(100, 2, 10)).toBe(437420);
        })
        // it('1000人 每桌最少坐2人 437420种分法', () => {
        //     expect(check(1000, 2, 10)).toBe(437420);
        // })
    })

    describe('递归解法 + 内存化', () => {
        it('6人 每桌最少坐2人 4种分法', () => {
            expect(checkMem(6, 2, 10)).toBe(4);
        })
        it('10人 每桌最少坐2人 12种分法', () => {
            expect(checkMem(10, 2, 10)).toBe(12);
        })
        it('100人 每桌最少坐2人 437420种分法', () => {
            expect(checkMem(100, 2, 10)).toBe(437420);
        })
        it('1000人 每桌最少坐2人 8451056940838种分法', () => {
            expect(checkMem(1000, 2, 10)).toBe(8451056940838);
        })
    })

    describe('动态规划', () => {
        it('6人 每桌最少坐2人 4种分法', () => {
            expect(checkDP(6, 2, 10)).toBe(4);
        })
        it('10人 每桌最少坐2人 12种分法', () => {
            expect(checkDP(10, 2, 10)).toBe(12);
        })
        it('100人 每桌最少坐2人 437420种分法', () => {
            expect(checkDP(100, 2, 10)).toBe(437420);
        })
        it('1000人 每桌最少坐2人 8451056940838种分法', () => {
            expect(checkDP(1000, 2, 10)).toBe(8451056940838);
        })
    })
})           