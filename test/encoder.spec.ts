import chai from 'chai';
// const should = chai.should();
const expect = chai.expect;

import {getTestEnv} from './prepare';
const env = getTestEnv();
const jseu = env.library;
const envName = env.envName;

describe(`${envName}: Encoder Test`, () => {
  let msg: Uint8Array;
  let b64uMsg: string;
  let b64Msg: string;
  let hexMsg: string;
  let strMsg: string;
  before( async () => {
    msg = new Uint8Array(32);
    for(let i = 0; i < 32; i++) msg[i] = 0xFF & i;
    b64Msg = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=';
    b64uMsg = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8';
    hexMsg = '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f';
    strMsg = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31';
  });

  it('Encode/Decode Base64 Test', async () => {
    const encoded = jseu.encoder.encodeBase64(msg);
    expect(b64Msg === encoded).to.be.true;

    // Check ArrayBuffer and Other Typed Array Format As Inputs
    const encoded_ab = jseu.encoder.encodeBase64(msg.buffer);
    const encoded_u32 = jseu.encoder.encodeBase64(new Uint32Array(msg.buffer));
    expect(encoded_ab === encoded).to.be.true;
    expect(encoded_u32 === encoded).to.be.true;

    const decoded = jseu.encoder.decodeBase64(encoded);
    expect(msg.toString() === decoded.toString()).to.be.true;
  });


  it('Encode/Decode Base64Url Test', async () => {
    const encoded = jseu.encoder.encodeBase64Url(msg);
    expect(b64uMsg === encoded).to.be.true;

    const decoded = jseu.encoder.decodeBase64Url(encoded);
    expect(msg.toString() === decoded.toString()).to.be.true;
  });


  it('Encode/Decode HexString Test', async () => {
    const encoded = jseu.encoder.arrayBufferToHexString(msg);
    expect(hexMsg === encoded).to.be.true;

    // Check ArrayBuffer and Other Typed Array Format As Inputs
    const encoded_ab = jseu.encoder.arrayBufferToHexString(msg.buffer);
    const encoded_u32 = jseu.encoder.arrayBufferToHexString(new Uint32Array(msg.buffer));
    expect(encoded_ab === encoded).to.be.true;
    expect(encoded_u32 === encoded).to.be.true;

    const decoded = jseu.encoder.hexStringToArrayBuffer(encoded);
    expect(msg.toString() === decoded.toString()).to.be.true;
  });


  it('Encode/Decode String Test', async () => {
    const encoded = jseu.encoder.stringToArrayBuffer(msg.toString());
    const decoded = jseu.encoder.arrayBufferToString(encoded);
    expect(strMsg === decoded).to.be.true;
  });
});
