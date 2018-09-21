/**
 * encoder.js
 */

import * as env from './env.js';

/**
 * encode uint8array to base64url string
 * @param data
 * @return {Promise<string>}
 */
export async function encodeBase64Url(data) {
  let str = '';
  if (typeof data === 'string') {
    str = data;
  }
  else if (data instanceof Uint8Array) {
    str = String.fromCharCode.apply(null, data);
  }
  const btoa = await env.getEnvBtoa();
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * decode base64url string to uint8array
 * @param str
 * @return {Promise<*|void>}
 */
export async function decodeBase64Url(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // str = str + "=".repeat(str.length % 4); // this sometimes causes error...
  const atob = await env.getEnvAtob();
  const binary = atob(str);
  let data = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    data[i] = binary.charCodeAt(i);
  }

  data = getAsciiIfAscii(data);

  return data;
}

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
  else throw new Error('input data must be uint8array');
}

export function arrayBufferToHexString(arr) {
  const type = Object.prototype.toString.call(arr).slice(8, -1);
  if (!arr || !(type === 'ArrayBuffer' || type === 'Uint8Array')) throw new Error('input arg must be non-null array buffer');
  if (type === 'ArrayBuffer') arr = new Uint8Array(arr);

  let hexStr = '';
  for (let i = 0; i < arr.length; i++) {
    let hex = (arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr += hex;
  }
  return hexStr;
}

export function hexStringToArrayBuffer(str) {
  if (!str || !(typeof str === 'string')) throw new Error('input arg must be non-null string');
  const arr = [];
  const len = str.length;
  for (let i = 0; i < len; i += 2) arr.push(parseInt(str.substr(i, 2), 16));
  return new Uint8Array(arr);
}

export function arrayBufferToString(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

export function stringToArrayBuffer(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}