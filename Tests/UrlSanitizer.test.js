const UrlSanitizer = require('../Services/UrlSanitizer');
const logger = require('../Services/logger');

describe('Url sanitizer', () => {
  it('should return the Url if it validates', () => {
    try {
      const path = 'https://caloger.com';
      const sanitizedUrl = UrlSanitizer.sanitize(path);
      expect(sanitizedUrl).toEqual('https://caloger.com/');
      logger.info('should return the Url if it validates', sanitizedUrl);
    } catch(error) {
      logger.error('should return the Url if it validates', error);
      throw new Error(error)
    }
    
  });

  it('should test that error is thrown on invalid URL', () => {
    expect(() => {
      UrlSanitizer.sanitize('!@#$%^&*()////<script>alert("hello");</script>');
    }).toThrow('INVALID_URL_ERR');
  });

  it('should test that error is thrown on invalid URL protocol', () => {
    expect(() => {
      UrlSanitizer.sanitize('javascript:console.log(\'javascript\');alert(\'javascript\')');
    }).toThrow('PROTOCOL_MISSING_ERR');
  });
});
