const UrlSanitizer = require('../Services/UrlSanitizer');

describe('Url sanitizer', () => {
  it('should return the Url if it validates', () => {
    const path = 'https://caloger.com';
    const sanitizedUrl = UrlSanitizer.sanitize(path);
    expect(sanitizedUrl).toEqual('https://caloger.com/');
  });

  it('should test that error is thrown on invalid URL', () => {
    expect(() => {
      UrlSanitizer.sanitize('!@#$%^&*()////<script>alert("hello");</script>');
    }).toThrow('Invalid Url.');
  });

  it('should test that error is thrown on invalid URL protocol', () => {
    expect(() => {
      UrlSanitizer.sanitize('javascript:console.log(\'javascript\');alert(\'javascript\')');
    }).toThrow('Invalid Url.');
  });
});
