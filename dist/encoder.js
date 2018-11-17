"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeBase64 = encodeBase64;
exports.decodeBase64 = decodeBase64;
exports.encodeBase64Url = encodeBase64Url;
exports.decodeBase64Url = decodeBase64Url;
exports.arrayBufferToHexString = arrayBufferToHexString;
exports.hexStringToArrayBuffer = hexStringToArrayBuffer;
exports.arrayBufferToString = arrayBufferToString;
exports.stringToArrayBuffer = stringToArrayBuffer;

var env = _interopRequireWildcard(require("./env.js"));

/**
 * encoder.js
 */

/**
 * Encode ArrayBuffer or TypedArray To Base64
 * @param data
 * @return {*}
 */
function encodeBase64(data) {
  var str = '';
  if (typeof data === 'string') str = data;else str = arrayBufferToString(data);
  var btoa = env.getEnvBtoa();
  return btoa(str);
}
/**
 * Decode Base64 to Uint8Array
 * @param str
 * @return {Uint8Array|string|*}
 */


function decodeBase64(str) {
  var atob = env.getEnvAtob();
  var binary = atob(str);
  var data = stringToArrayBuffer(binary);
  return getAsciiIfAscii(data);
}
/**
 * if input data is an ArrayBuffer or TypedArray, it would be returned as Uint8Array
 * @param data
 * @return {Uint8Array}
 */


function sanitizeTypedArrayAndArrayBuffer(data) {
  if (data instanceof Uint8Array) return data;

  if (ArrayBuffer.isView(data) && typeof data.buffer !== 'undefined') {
    // TypedArray except Uint8Array
    return new Uint8Array(data.buffer);
  } else if (data instanceof ArrayBuffer) {
    // ArrayBuffer
    return new Uint8Array(data);
  } else throw new Error('Input must be an ArrayBuffer or a TypedArray');
}
/**
 * Check if the given Uint8Array can be expressed in Ascii Text
 * @param data
 * @return {Uint8Array|string|*}
 */


function getAsciiIfAscii(data) {
  if (data instanceof Uint8Array) {
    var flag = true;

    for (var i = 0; i < data.length; i++) {
      if (data[i] > 0x7e || data[i] < 0x20 && data[i] !== 0x0d && data[i] !== 0x0a) {
        flag = false;
        break;
      }
    }

    var returnData = null;

    if (flag) {
      returnData = '';

      for (var _i = 0; _i < data.length; _i++) {
        returnData += String.fromCharCode(data[_i]);
      }
    } else returnData = data;

    return returnData;
  } else throw new Error('Input data must be an Uint8Array');
}
/**
 * Encode ArrayBuffer or TypedArray to base64url string
 * @param data
 * @return {string}
 */


function encodeBase64Url(data) {
  return encodeBase64(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
/**
 * Decode Base64Url string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */


function decodeBase64Url(str) {
  if (typeof str !== 'string') throw new Error('Input must be string');
  str = str.replace(/-/g, '+').replace(/_/g, '/'); // str = str + "=".repeat(str.length % 4); // this sometimes causes error...

  return decodeBase64(str);
}
/**
 * Encode ArrayBuffer or TypedArray to hex string
 * @param data
 * @return {string}
 */


function arrayBufferToHexString(data) {
  var arr = sanitizeTypedArrayAndArrayBuffer(data);
  var hexStr = '';

  for (var i = 0; i < arr.length; i++) {
    var hex = (arr[i] & 0xff).toString(16);
    hex = hex.length === 1 ? "0".concat(hex) : hex;
    hexStr += hex;
  }

  return hexStr;
}
/**
 * Decode hex string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */


function hexStringToArrayBuffer(str) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string');
  var arr = [];
  var len = str.length;

  for (var i = 0; i < len; i += 2) {
    arr.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(arr);
}
/**
 * Encode ArrayBuffer or TypedArray to string with code (like output of legacy atob)
 * @param data
 * @return {string}
 */


function arrayBufferToString(data) {
  var bytes = sanitizeTypedArrayAndArrayBuffer(data);
  return String.fromCharCode.apply(null, bytes);
}
/**
 * Decode string with code (like output of legacy atob) to Uint8Array
 * @param str
 * @return {Uint8Array}
 */


function stringToArrayBuffer(str) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string');
  var bytes = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}