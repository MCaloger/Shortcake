const { pickCode } = require("./Utils")
const Utils = require("./Utils")

describe("Utils should", () => {
    it("return a string on pickCode", () => {
        expect(typeof(Utils.pickCode(10))).toEqual("string")
    })

    it("should be the specified length", () => {
        const length = 10
        expect(Utils.pickCode(length)).toHaveLength(10)
    })
})
