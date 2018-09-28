"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var env=_interopRequireWildcard(require("./env.js"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.encodeBase64=encodeBase64,exports.decodeBase64=decodeBase64,exports.encodeBase64Url=encodeBase64Url,exports.decodeBase64Url=decodeBase64Url,exports.arrayBufferToHexString=arrayBufferToHexString,exports.hexStringToArrayBuffer=hexStringToArrayBuffer,exports.arrayBufferToString=arrayBufferToString,exports.stringToArrayBuffer=stringToArrayBuffer;/**
 * encoder.js
 */ /**
 * Encode ArrayBuffer or TypedArray To Base64
 * @param data
 * @return {*}
 */function encodeBase64(a){var b="";b="string"==typeof a?a:arrayBufferToString(a);var c=env.getEnvBtoa();return c(b)}/**
 * Decode Base64 to Uint8Array
 * @param str
 * @return {Uint8Array|string|*}
 */function decodeBase64(a){var b=env.getEnvAtob(),c=b(a),d=stringToArrayBuffer(c);return getAsciiIfAscii(d)}/**
 * if input data is an ArrayBuffer or TypedArray, it would be returned as Uint8Array
 * @param data
 * @return {Uint8Array}
 */function sanitizeTypedArrayAndArrayBuffer(a){if(a instanceof Uint8Array)return a;if(ArrayBuffer.isView(a)&&"undefined"!=typeof a.buffer)// TypedArray except Uint8Array
return new Uint8Array(a.buffer);if(a instanceof ArrayBuffer)// ArrayBuffer
return new Uint8Array(a);throw new Error("Input must be an ArrayBuffer or a TypedArray")}/**
 * Check if the given Uint8Array can be expressed in Ascii Text
 * @param data
 * @return {Uint8Array|string|*}
 */function getAsciiIfAscii(a){if(a instanceof Uint8Array){for(var b=!0,c=0;c<a.length;c++)if(126<a[c]||32>a[c]&&13!==a[c]&&10!==a[c]){b=!1;break}var d=null;if(b){d="";for(var e=0;e<a.length;e++)d+=String.fromCharCode(a[e])}else d=a;return d}throw new Error("Input data must be an Uint8Array")}/**
 * Encode ArrayBuffer or TypedArray to base64url string
 * @param data
 * @return {string}
 */function encodeBase64Url(a){return encodeBase64(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}/**
 * Decode Base64Url string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */function decodeBase64Url(a){if("string"!=typeof a)throw new Error("Input must be string");// str = str + "=".repeat(str.length % 4); // this sometimes causes error...
return a=a.replace(/-/g,"+").replace(/_/g,"/"),decodeBase64(a)}/**
 * Encode ArrayBuffer or TypedArray to hex string
 * @param data
 * @return {string}
 */function arrayBufferToHexString(a){for(var b,c=sanitizeTypedArrayAndArrayBuffer(a),d="",e=0;e<c.length;e++)b=(255&c[e]).toString(16),b=1===b.length?"0".concat(b):b,d+=b;return d}/**
 * Decode hex string to Uint8Array
 * @param str
 * @return {Uint8Array}
 */function hexStringToArrayBuffer(a){if(!a||"string"!=typeof a)throw new Error("Input arg must be a non-null string");for(var b=[],c=a.length,d=0;d<c;d+=2)b.push(parseInt(a.substr(d,2),16));return new Uint8Array(b)}/**
 * Encode ArrayBuffer or TypedArray to string with code (like output of legacy atob)
 * @param data
 * @return {string}
 */function arrayBufferToString(a){var b=sanitizeTypedArrayAndArrayBuffer(a);return String.fromCharCode.apply(null,b)}/**
 * Decode string with code (like output of legacy atob) to Uint8Array
 * @param str
 * @return {Uint8Array}
 */function stringToArrayBuffer(a){if(!a||"string"!=typeof a)throw new Error("Input arg must be a non-null string");for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);return b}