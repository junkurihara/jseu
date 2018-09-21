"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:!0}),exports.pemToBin=pemToBin,exports.binToPem=binToPem;var encoder=_interopRequireWildcard(require("./encoder.js")),supportedPEMTypes={public:"PUBLIC KEY",private:"PRIVATE KEY",certificate:"CERTIFICATE",certRequest:"CERTIFICATE REQUEST"};function pemToBin(a){var b=dearmorPem(a);return encoder.decodeBase64(b)}function binToPem(a,b){var c=encoder.encodeBase64(a);return formatAsPem(c,b)}function formatAsPem(a,b){if(!a||"string"!=typeof a)throw new Error("Input arg must be a non-null string");if(!b||"string"!=typeof b)throw new Error("Input arg must be a non-null string");if(0>Object.keys(supportedPEMTypes).indexOf(b))throw new Error("Unsupported type");for(var c=supportedPEMTypes[b],d="-----BEGIN ".concat(c,"-----\n");0<a.length;)d+="".concat(a.substring(0,64),"\n"),a=a.substring(64);return d="".concat(d,"-----END ").concat(c,"-----"),d}function dearmorPem(a){if(!a||"string"!=typeof a)throw new Error("Input arg must be a non-null string");var b=/^-----[s]*BEGIN[^-]*-----$/gm,c=/^-----[s]*END[^-]*-----$/gm;try{var d=a.split(b)[1].split(c)[0];return d=d.replace(/\r?\n/g,""),d}catch(a){throw new Error("Invalid format as PEM")}}