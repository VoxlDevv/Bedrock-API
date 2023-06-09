/**
 * Encrypt text
 * @param {String} text
 * @returns {String}
 */
function EncryptText(text) {
  return text
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(10);
    })
    .join("|");
}

/**
 * Decrypt text
 * @param {String} encrypt
 * @returns {String}
 */
function DecryptText(encrypt) {
  return encrypt
    .split("|")
    .map((char) => {
      return String.fromCharCode(parseInt(char, 10));
    })
    .join("");
}

export { EncryptText, DecryptText };
