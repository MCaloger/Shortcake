class Utils {
  /**
     * @param {Number} numberofCharacters
     * @return {String} alphanumeric code
     * @memberof Utils
     */
  pickCode(numberOfCharacters) {
    let code = '';
    const chars = [
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f',
      'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2',
      '3', '4', '5', '6', '7', '8', '9', '0',
    ];

    for (let i = 0; i < numberOfCharacters; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }
}

module.exports = new Utils();
