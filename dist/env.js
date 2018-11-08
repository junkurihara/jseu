"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getEnvBtoa=getEnvBtoa,exports.getEnvAtob=getEnvAtob;/**
 * this module handles the difference between window (browser) and node js for specific functions and libraries.
 * env.js
 */function getEnvBtoa(){return"undefined"==typeof window?nodeBtoa:window.btoa;// node
}function getEnvAtob(){return"undefined"==typeof window?nodeAtob:window.atob;// node
}var nodeBtoa=function(a){if("undefined"!=typeof Buffer){var b,c=Object.prototype.toString.call(a).slice(8,-1);return b=Buffer.isBuffer(a)?a:0<=["ArrayBuffer","TypedArray","Uint8Array","Int8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"].indexOf(c)?Buffer.from(a):Buffer.from(a.toString(),"binary"),b.toString("base64")}throw new Error("UnsupportedEnvironment")},nodeAtob=function(a){if("undefined"!=typeof Buffer)return Buffer.from(a,"base64").toString("binary");throw new Error("UnsupportedEnvironment")};