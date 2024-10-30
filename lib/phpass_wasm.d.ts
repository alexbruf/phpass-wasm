export function __wbg_set_wasm(val: any): void;
export function hash_password(password: string): string;
export function check_password(
  password: string,
  hash: string,
): [
  boolean,
  { type: "OldWPFormat" } | { type: "VerificationError" } |
  { type: "Other"; message: string } | null | undefined,
];

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly greet: () => void;
  readonly hash_password: (a: number, b: number, c: number) => void;
  readonly check_password: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;
