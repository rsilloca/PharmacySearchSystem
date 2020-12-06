import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  encrKey = 'S3gUi49sPQh36klm';
  options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  constructor() {

  }
  encryptUTF8(cadena: string) {
    const result = CryptoJS.enc.Utf8.parse(cadena);
    return result;
  }
  encryptMD5(cadena: string) {
    const result = CryptoJS.MD5(cadena);
    return result.toString();
  }
  encryptHex(cadena: string) {
    const result = CryptoJS.enc.Hex.parse(cadena);
    return result;
  }
  encrypt3DES(textWordArray: any, keyHex: any) {
    const result = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, this.options);
    return result;
  }
  encriptAll(inputText: string): string {
    let keyMd5 = this.encryptMD5(this.encrKey);
    keyMd5 += keyMd5.substring(0, 16);
    const textWordArray = this.encryptUTF8(inputText);
    const keyHex = this.encryptHex(keyMd5);
    const encriptacion = this.encrypt3DES(textWordArray, keyHex);
    const base64String = encriptacion.toString();
    return base64String;
  }
}
