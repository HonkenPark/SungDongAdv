import CryptoJS from 'crypto-js';

export function encodeAes256(msg, key) {
    // AES-256 인코딩 : CBC 모드
    const cipher = CryptoJS.AES.encrypt(msg, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse('mzkiosksecretkey'),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    return cipher.toString();
}

export function decodeAes256(msg, key) {
    let cipher = CryptoJS.AES.decrypt(msg, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse('mzkiosksecretkey'),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    return cipher.toString(CryptoJS.enc.Utf8);
}
