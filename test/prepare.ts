/**
 * prepare.ts
 */

export const getTestEnv = async () => {
  let expect;
  if(typeof window === 'undefined'){
    console.log('running on node.js');
    // Chai v5 uses named exports
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  } else {
    console.log('running on browser');
    // Use chai directly in browser for v5 compatibility
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  }

  return {expect};
};
