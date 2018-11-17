"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pemToBin = pemToBin;
exports.binToPem = binToPem;

var encoder = _interopRequireWildcard(require("./encoder.js"));

/**
 * formatter.js
 */
var supportedPEMTypes = {
  'public': 'PUBLIC KEY',
  'private': 'PRIVATE KEY',
  'encryptedPrivate': 'ENCRYPTED PRIVATE KEY',
  'certificate': 'CERTIFICATE',
  'certRequest': 'CERTIFICATE REQUEST'
};
/**
 * Convert PEM armored string to Uint8Array
 * @param keydataB64Pem
 * @return {Uint8Array}
 */

function pemToBin(keydataB64Pem) {
  var keydataB64 = dearmorPem(keydataB64Pem);
  return encoder.decodeBase64(keydataB64);
}
/**
 * Convert ArrayBuffer or TypedArray to PEM armored string with a specified type
 * @param keydata
 * @param type
 * @return {string}
 */


function binToPem(keydata, type) {
  var keydataB64 = encoder.encodeBase64(keydata);
  return formatAsPem(keydataB64, type);
}
/**
 * Armor the given Base64 string and return PEM formatted string
 * @param str
 * @param type
 * @return {string}
 */


function formatAsPem(str, type) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string');
  if (!type || !(typeof type === 'string')) throw new Error('Input arg must be a non-null string');
  if (Object.keys(supportedPEMTypes).indexOf(type) < 0) throw new Error('Unsupported type');
  var typeString = supportedPEMTypes[type];
  var finalString = "-----BEGIN ".concat(typeString, "-----\n");

  while (str.length > 0) {
    finalString += "".concat(str.substring(0, 64), "\n");
    str = str.substring(64);
  }

  finalString = "".concat(finalString, "-----END ").concat(typeString, "-----");
  return finalString;
}
/**
 * Dearmor the given PEM string and return Base64 string
 * @param str
 * @return {string}
 */


function dearmorPem(str) {
  if (!str || !(typeof str === 'string')) throw new Error('Input arg must be a non-null string'); // const beginRegExp = RegExp('^-----[\s]*BEGIN[^-]*KEY-----$', 'gm');
  // const endRegExp = RegExp('^-----[\s]*END[^-]*KEY-----$', 'gm');

  var beginRegExp = RegExp('^-----[\s]*BEGIN[^-]*-----$', 'gm');
  var endRegExp = RegExp('^-----[\s]*END[^-]*-----$', 'gm'); // check if the object starts from 'begin'

  try {
    var dearmored = str.split(beginRegExp)[1].split(endRegExp)[0];
    dearmored = dearmored.replace(/\r?\n/g, '');
    return dearmored;
  } catch (e) {
    throw new Error('Invalid format as PEM');
  }
}