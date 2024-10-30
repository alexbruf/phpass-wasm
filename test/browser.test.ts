/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
/* global test, expect */

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Throws when WebAssembly is unavailable', async () => {
  const { hashPassword } = jest.requireActual('../lib');

  const WASM = globalThis.WebAssembly;
  (globalThis.WebAssembly as any) = undefined;

  await expect(() => hashPassword('a')).rejects.toThrow();
  globalThis.WebAssembly = WASM;
});

const NodeBuffer = (globalThis as any).Buffer;

class TextEncoderMock {
  // eslint-disable-next-line class-methods-use-this
  encode(str) {
    const buf = NodeBuffer.from(str);
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }
}

test('Simulate browsers', async () => {
  const originalBuffer = globalThis.Buffer;
  ((globalThis as any).Buffer as any) = undefined;
  const originalTextEncoder = globalThis.TextEncoder;
  ((globalThis as any).TextEncoder as any) = TextEncoderMock;

  const { hashPassword } = jest.requireActual('../lib');
	expect(!!(await hashPassword('a'))).toBe(true);

  globalThis.TextEncoder = originalTextEncoder;
  globalThis.Buffer = originalBuffer;
});

test('Use global self', async () => {
  const global = globalThis;
  (globalThis as any).self = global;

  const { hashPassword } = jest.requireActual('../lib');
	expect(!!(await hashPassword('a'))).toBe(true);

});

test('Delete global self', async () => {
  const originalSelf = globalThis.self;
  (globalThis.self as any) = undefined;

  const { hashPassword } = jest.requireActual('../lib');
	expect(!!(await hashPassword('a'))).toBe(true);


  globalThis.self = originalSelf;
});

test('Use global window', async () => {
  const originalWindow = globalThis.window;
  (globalThis.window as any) = undefined;

  const { hashPassword } = jest.requireActual('../lib');
	expect(!!(await hashPassword('a'))).toBe(true);


  globalThis.window = originalWindow;
});

test('Delete global self + window', async () => {
  const originalWindow = globalThis.window;
  (globalThis.window as any) = undefined;

  const { hashPassword } = jest.requireActual('../lib');
	expect(!!(await hashPassword('a'))).toBe(true);

  globalThis.window = originalWindow;
});
