/**
 * pembin.js
 */

import * as env from './env.js';
import {arrayBufferToString, stringToArrayBuffer} from "./encoder.js";

export async function pemToBin(keydataB64Pem) {
  const keydataB64 = dearmorPem(keydataB64Pem);
  const atob = await env.getEnvAtob();
  const keydataS = atob(keydataB64);
  return stringToArrayBuffer(keydataS);
}

export async function binToPem(keydata, type) {
  const keydataS = arrayBufferToString(keydata);
  const btoa = await env.getEnvBtoa();
  const keydataB64 = btoa(keydataS);
  return formatAsPem(keydataB64, type);
}

function formatAsPem(str, type) {
  let typeString;
  if (type === 'public') typeString = 'PUBLIC KEY';
  else if (type === 'private') typeString = 'PRIVATE KEY';
  else if (type === 'certificate') typeString = 'CERTIFICATE';

  let finalString = `-----BEGIN ${typeString}-----\n`;


  while (str.length > 0) {
    finalString += `${str.substring(0, 64)}\n`;
    str = str.substring(64);
  }

  finalString = `${finalString}-----END ${typeString}-----`;

  return finalString;
}

function dearmorPem(str) {
  // const beginRegExp = RegExp('^-----[\s]*BEGIN[^-]*KEY-----$', 'gm');
  // const endRegExp = RegExp('^-----[\s]*END[^-]*KEY-----$', 'gm');
  const beginRegExp = RegExp('^-----[\s]*BEGIN[^-]*-----$', 'gm');
  const endRegExp = RegExp('^-----[\s]*END[^-]*-----$', 'gm');

  // check if the object starts from 'begin'
  try {
    let dearmored = str.split(beginRegExp)[1].split(endRegExp)[0];
    dearmored = dearmored.replace(/\r?\n/g, '');

    return dearmored;
  } catch (e) {
    throw new Error('Invalid format as PEM');
  }
}

