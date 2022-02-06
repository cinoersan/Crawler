import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";

export const getHashDate = (token: string): boolean => {

    dotenv.config();
    const today = new Date();

    const currentDate = today.getFullYear() + '' +
        ('0' + (today.getMonth() + 1)).slice(-2) + '' +
        ('0' + today.getDate()).slice(-2);

    const key1 = process.env.APIKEY;
    const key2 = process.env.IVKEY;

    var encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(currentDate), CryptoJS.enc.Utf8.parse(key1),
        {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(key2),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });


    const final = `${key1}${CryptoJS.enc.Base64.stringify(encryptedData.ciphertext)}`;

    return final === token;
}