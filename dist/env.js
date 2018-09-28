"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getEnvBtoa=getEnvBtoa,exports.getEnvAtob=getEnvAtob;/**
 * this module handles the difference between window (browser) and node js for specific functions and libraries.
 * env.js
 */function getEnvBtoa(){return"undefined"==typeof window?nodeBtoa:window.btoa;// node
}function getEnvAtob(){return"undefined"==typeof window?nodeAtob:window.atob;// node
}var nodeBtoa=function(a){var b,c=require("buffer").Buffer,d=Object.prototype.toString.call(a).slice(8,-1);return b=c.isBuffer(a)?a:0<=["ArrayBuffer","TypedArray","Uint8Array","Int8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"].indexOf(d)?c.from(a):new c.from(a.toString(),"binary"),b.toString("base64")},nodeAtob=function(a){var b=require("buffer").Buffer;return new b.from(a,"base64").toString("binary")};