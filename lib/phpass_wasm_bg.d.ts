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
