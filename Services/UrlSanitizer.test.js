const UrlSanitizer = require('./UrlSanitizer')

require('dotenv').config()


describe('Url sanitizer works', () => {
    const string = '!@#$%^&*()////<script>alert("hello");</script>'
    it('should test that string is sanitized', () => {
        expect(UrlSanitizer.sanitize(string)).toBe(string);
    })
})