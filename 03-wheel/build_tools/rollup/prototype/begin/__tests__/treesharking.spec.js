const treesharking = require("../treesharking")

describe('Treesharking', () => {
    it('单条语句', () => {
        expect(treesharking(
            `const a = () => 1;`
        ))
            .toBe(`const a = () => 1;`)
    })
})