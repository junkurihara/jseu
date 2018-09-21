/**
 * encoder.js
 */

import * as env from './env.js';

/**
 * Encode ArrayBuffer or TypedArray To Base64
 * @param data
 * @return {*}
 */
export function encodeBase64(data){
  let str = '';
  if (typeof data === 'string') str = data;
  else str = arrayBufferToString(data);

  const btoa = env.getEnvBtoa();
  return btoa(str);
}

/**
 * Decode Base64 to Uint8Array
 * @param str
 * @return {Uint8Array|string|*}
 */
export function decodeBase64(str){
  const atob = env.getEnvAtob();
  const binary = atob(str);
  const data = stringToArrayBuffer(binary);
  return getAsciiIfAscii(data);
}

/**
 * if input data is an ArrayBuffer or TypedArray, it would be returned as Uint8Array
 * @param data
 * @return {Uint8Array}
 */
function sanitizeTypedArrayAndArrayBuffer(data){
  if(data instanceof Uint8Array) return data;

  if (ArrayBuffer.isView(data) && typeof data.buffer !== 'undefined') { // TypedArray except Uint8Array
    return new Uint8Array(data.buffer);
  }
  else if (data instanceof ArrayBuffer) { // ArrayBuffer
    return new Uint8Array(data);
  }
  else throw new Error('Input must be an ArrayBuffer or a TypedArray')
}


/**
 * Check if the given Uint8Array can be expressed in Ascii Text
 * @param data
 * @return {Uint8Array|string|*}
 */
function getAsciiIfAscii(data) {
  if (data instanceof Uint8Array) {
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
  }
  else throw new Error('Input data must be an Uint8Array');
}

/**
 * Encode ArrayBuffer or TypedArray to base64url string
 * @param data
 * @return {string}
 */
export function encodeBase64Url(data) {
  return encodeBase64(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode Base64Url string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export function decodeBase64Url(str) {
  if (typeof str !== 'string') throw new Error('Input must be string');
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // str = str + "=".repeat(str.length % 4); // this sometimes causes error...

  return decodeBase64(str);
}

/**
 * Encode ArrayBuffer or TypedArray to hex string
 * @param data
 * @return {string}
 */
export function arrayBufferToHexString(data) {
  const arr = sanitizeTypedArrayAndArrayBuffer(data);

  let hexStr = '';
  for (let i = 0; i < arr.length; i++) {
    let hex = (arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr += hex;
  }
  return hexStr;
}

/**
 * Decode hex string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export function hexStringToArrayBuffer(str) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string');
  const arr = [];
  const len = str.length;
  for (let i = 0; i < len; i += 2) arr.push(parseInt(str.substr(i, 2), 16));
  return new Uint8Array(arr);
}

/**
 * Encode ArrayBuffer or TypedArray to string with code (like output of legacy atob)
 * @param data
 * @return {string}
 */
export function arrayBufferToString(data) {
  const bytes = sanitizeTypedArrayAndArrayBuffer(data);
  return String.fromCharCode.apply(null, bytes);
}

/**
 * Decode string with code (like output of legacy atob) to Uint8Array
 * @param str
 * @return {Uint8Array}
 */
export function stringToArrayBuffer(str) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string');
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}