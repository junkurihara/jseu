import jsbu from '../src/index.js';

import chai from 'chai';
// const should = chai.should();
const expect = chai.expect;

describe('Encoder Test', () => {
  let msg;
  let b64uMsg;
  before( async () => {
    msg = new Uint8Array(32);
    for(let i = 0; i < 32; i++) msg[i] = 0xFF & i;
    b64uMsg = 'AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8';
  });

  it('Encode/Decode Base64Url Test', async () => {
    const encoded = await jsbu.encoder.encodeBase64Url(msg);
    expect(b64uMsg === encoded).to.be.true;
  });
});