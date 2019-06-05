/**
 * encoder.js
 */

import * as env from './env';
import TypedArray = NodeJS.TypedArray;

/**
 * Encode ArrayBuffer or TypedArray To Base64
 * @param data
 * @return {*}
 */
export const encodeBase64 = (data: string|ArrayBuffer|TypedArray): string => {
  let str = '';
  if (typeof data === 'string') str = data;
  else str = arrayBufferToString(data);

  const btoa = env.getEnvBtoa();
  return btoa(str);
};

/**
 * Decode Base64 to Uint8Array
 * @param str
 * @return {Uint8Array|string|*}
 */
export const decodeBase64 = (str: string): Uint8Array|string => {
  const atob = env.getEnvAtob();
  const binary = atob(str);
  const data = stringToArrayBuffer(binary);
  return getAsciiIfAscii(data);
};

/**
 * if input data is an ArrayBuffer or TypedArray, it would be returned as Uint8Array
 * @param data
 * @return {Uint8Array}
 */
const sanitizeTypedArrayAndArrayBuffer = (data: ArrayBuffer|TypedArray): Uint8Array => {
  if(data instanceof Uint8Array) return data;

  if (ArrayBuffer.isView(data) && typeof data.buffer !== 'undefined') { // TypedArray except Uint8Array
    return new Uint8Array(data.buffer);
  }
  else if (data instanceof ArrayBuffer) { // ArrayBuffer
    return new Uint8Array(data);
  }
  else throw new Error('Input must be an ArrayBuffer or a TypedArray');
};


/**
 * Check if the given Uint8Array can be expressed in Ascii Text
 * @param data
 * @return {Uint8Array|string|*}
 */
const getAsciiIfAscii = (data: Uint8Array): Uint8Array|string => {
  let flag = true;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > 0x7e || (data[i] < 0x20 && data[i] !== 0x0d && data[i] !== 0x0a)) {
      flag = false;
      break;
    }
  }
  let returnData = null;
  if (flag) {
    returnData = '';
    for (let i = 0; i < data.length; i++) returnData += String.fromCharCode(data[i]);
  }
  else returnData = data;
  return returnData;
};

/**
 * Encode ArrayBuffer or TypedArray to base64url string
 * @param data
 * @return {string}
 */
export const encodeBase64Url = (data: ArrayBuffer|Uint8Array): string => encodeBase64(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Decode Base64Url string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export const decodeBase64Url = (str: string) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // str = str + "=".repeat(str.length % 4); // this sometimes causes error...

  return decodeBase64(str);
};

/**
 * Encode ArrayBuffer or TypedArray to hex string
 * @param data
 * @return {string}
 */
export const arrayBufferToHexString = (data: ArrayBuffer|TypedArray): string => {
  const arr = sanitizeTypedArrayAndArrayBuffer(data);

  let hexStr = '';
  for (let i = 0; i < arr.length; i++) {
    let hex = (arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr += hex;
  }
  return hexStr;
};

/**
 * Decode hex string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export const hexStringToArrayBuffer = (str:string): Uint8Array => {
  const arr = [];
  const len = str.length;
  for (let i = 0; i < len; i += 2) arr.push(parseInt(str.substr(i, 2), 16));
  return new Uint8Array(arr);
};

/**
 * Encode ArrayBuffer or TypedArray to string with code (like output of legacy atob)
 * @param data
 * @return {string}
 */
export const arrayBufferToString = (data: ArrayBuffer|TypedArray): string => {
  const bytes = sanitizeTypedArrayAndArrayBuffer(data);
  const arr: number[] = new Array(bytes.length);
  bytes.forEach( (x, i) => { arr[i] = x; });
  return String.fromCharCode.apply(null, arr);
};

/**
 * Decode string with code (like output of legacy atob) to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export const stringToArrayBuffer = (str: string): Uint8Array => {
  const bytes = new Uint8Array(str.length);
  return bytes.map( (_x, i) => str.charCodeAt(i));

};
