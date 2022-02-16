const UrlSanitizer = require('./UrlSanitizer')

require('dotenv').config()


describe('Url sanitizer', () => {
    it('should return the Url if it validates', () => {
        const path = "https://caloger.com/";
        expect(
            UrlSanitizer.sanitize(path)
        ).toBe(path);
    })

    it('should test that error is thrown on invalid URL', () => {
        expect(() => {
            UrlSanitizer.sanitize('!@#$%^&*()////<script>alert("hello");</script>')
        }).toThrow('Invalid Url.')
    })


    it('should test that error is thrown on invalid URL protocol', () => {
        expect(() => {
            UrlSanitizer.sanitize("javascript:void")
        }).toThrow('Invalid Url.')
    })
})