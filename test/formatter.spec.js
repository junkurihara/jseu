import jseu from '../src/index.js';

import chai from 'chai';
// const should = chai.should();
const expect = chai.expect;

describe('Formatter Test', () => {
  const certPEM =
    '-----BEGIN CERTIFICATE-----\n' +
    'MIIBxjCCAWwCCQCEZlhfc33wtzAKBggqhkjOPQQDAjBrMQswCQYDVQQGEwJKUDEO\n' +
    'MAwGA1UECAwFVG9reW8xEDAOBgNVBAcMB0NoaXlvZGExFjAUBgNVBAoMDVNlbGYg\n' +
    'RW1wbG95ZWQxDDAKBgNVBAsMA1ImRDEUMBIGA1UEAwwLZXhhbXBsZS5jb20wHhcN\n' +
    'MTgwOTE4MTA0OTM0WhcNMjgwOTE1MTA0OTM0WjBrMQswCQYDVQQGEwJKUDEOMAwG\n' +
    'A1UECAwFVG9reW8xEDAOBgNVBAcMB0NoaXlvZGExFjAUBgNVBAoMDVNlbGYgRW1w\n' +
    'bG95ZWQxDDAKBgNVBAsMA1ImRDEUMBIGA1UEAwwLZXhhbXBsZS5jb20wWTATBgcq\n' +
    'hkjOPQIBBggqhkjOPQMBBwNCAAScXEKv9GvV8EHzB+d9E0EgS3JFJxgz/uAQYwpZ\n' +
    'gI5+9KVuoGhkPk7Y3DuFbKQ20snMA5W7p5YhXxwo82pspWvDMAoGCCqGSM49BAMC\n' +
    'A0gAMEUCIQDG0lRQgVAYaXVkkIYQ8YC1A/NzvtlzlP2Kk07Ox6GCVwIgNS5BnBHj\n' +
    'UR3om5rYSWmj7rgz0uJxoaZkkNH4xM2Zfss=\n' +
    '-----END CERTIFICATE-----';

  it('PEM <-> DER Formatter Test', async () => {
    const binCert = jseu.formatter.pemToBin(certPEM);
    const pemCert = jseu.formatter.binToPem(binCert, 'certificate');
    expect(pemCert === certPEM).to.be.true;
  });

});