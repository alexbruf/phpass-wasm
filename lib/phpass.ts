import Mutex from "./mutex";
import wasmJson from "../wasm/phpass_wasm.wasm.json";
import lockedCreate from "./lockedCreate";

const mutex = new Mutex();
let wasmCache: Awaited<ReturnType<typeof lockedCreate>> = null;

/**
 * Calculates PhPass hash
 * @param data Input data (string)
 * @returns Computed hash as a hexadecimal string
 */
export async function hashPassword(password: string): Promise<string> {
  if (wasmCache === null) {
    wasmCache = await lockedCreate(mutex, wasmJson, 16);
  }

  try {
    const hash = wasmCache.hash_password(password);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(err);
  }
}

export class CheckPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckPasswordError";
  }
}

export class OldWPFormatError extends CheckPasswordError {
  constructor() {
    super("Old WordPress format");
    this.name = "OldWPFormatError";
  }
}

/**
 * Check Password
 * @param data Input password (string)
 * @param hash Input hash (string)
 * @returns boolean if password matches hash
 * @throws {OldWPFormatError} If the hash is in old WordPress format
 * @throws {CheckPasswordError} For other errors
 */
export async function checkPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  if (wasmCache === null) {
    wasmCache = await lockedCreate(mutex, wasmJson, 16);
  }

  try {
    const [valid, error] = wasmCache.check_password(password, hash);
    if (error) {
      if (error.type === "VerificationError") {
        return false;
      } else if (error.type === "OldWPFormat") {
        throw new OldWPFormatError();
      } else {
        throw new CheckPasswordError(error.message);
      }
    }
    return valid;
  } catch (err) {
    return Promise.reject(err);
  }
}

