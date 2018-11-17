"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvBtoa = getEnvBtoa;
exports.getEnvAtob = getEnvAtob;

/**
 * this module handles the difference between window (browser) and node js for specific functions and libraries.
 * env.js
 */
function getEnvBtoa() {
  if (typeof window !== 'undefined') return window.btoa; // browser
  else return nodeBtoa; // node
}

function getEnvAtob() {
  if (typeof window !== 'undefined') return window.atob; // browser
  else return nodeAtob; // node
}

var nodeBtoa = function nodeBtoa(str) {
  if (typeof Buffer !== 'undefined') {
    var buffer;
    var type = Object.prototype.toString.call(str).slice(8, -1);
    var typedArrays = ['ArrayBuffer', 'TypedArray', 'Uint8Array', 'Int8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array'];

    if (Buffer.isBuffer(str)) {
      buffer = str;
    } else if (typedArrays.indexOf(type) >= 0) {
      buffer = Buffer.from(str);
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  } else throw new Error('UnsupportedEnvironment');
};

var nodeAtob = function nodeAtob(str) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('binary');
  } else throw new Error('UnsupportedEnvironment');
};