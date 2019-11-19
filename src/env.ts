/**
 * this module handles the difference between window (browser) and node js for specific functions and libraries.
 * env.js
 */

export const getEnvBtoa = () => {
  if(typeof window !== 'undefined') return window.btoa; // browser
  else return nodeBtoa; // node
};

export const getEnvAtob = () => {
  if(typeof window !== 'undefined') return window.atob; // browser
  else return nodeAtob; // node
};

const nodeBtoa = (str: string): string => {
  if(typeof Buffer === 'undefined') throw new Error('UnsupportedEnvironment');
  const buffer = Buffer.from(str.toString(), 'binary');

  return buffer.toString('base64');

};

const nodeAtob = (str: string): string => {
  if(typeof Buffer === 'undefined') throw new Error('UnsupportedEnvironment');
  return Buffer.from(str, 'base64').toString('binary');
};
