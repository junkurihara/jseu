/**
 * index.ts
 **/
import * as Encoder from './encoder';
import * as Formatter from './formatter';

export namespace encoder {
  export const encodeBase64 = Encoder.encodeBase64;
  export const decodeBase64 = Encoder.decodeBase64;
  export const encodeBase64Url = Encoder.encodeBase64Url;
  export const decodeBase64Url = Encoder.decodeBase64Url;
  export const arrayBufferToHexString = Encoder.arrayBufferToHexString;
  export const hexStringToArrayBuffer = Encoder.hexStringToArrayBuffer;
  export const stringToArrayBuffer = Encoder.stringToArrayBuffer;
  export const arrayBufferToString = Encoder.arrayBufferToString;
}

export namespace formatter {
  export const binToPem = Formatter.binToPem;
  export const pemToBin = Formatter.pemToBin;
}

//export default {encoder, formatter};
//export {encoder, formatter};
