import CryptoJS from 'crypto-js';

export const isMultipleArray = (arr) => {
  return Array.isArray(arr)
}

export function decodeAes256(msg, key) {
  let cipher = CryptoJS.AES.decrypt(msg, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse('mzkiosksecretkey'),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
  });

  return cipher.toString(CryptoJS.enc.Utf8);
}