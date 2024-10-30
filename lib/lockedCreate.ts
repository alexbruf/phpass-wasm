import Mutex from "./mutex";
import { initSync, hash_password, check_password } from "./phpass_wasm";
import { decodeBase64 } from "./util";

const wasmModuleCache = new Map<string, Promise<WebAssembly.Module>>();
export default async function lockedCreate(
  mutex: Mutex,
  binary: any,
  hashLength: number,
): Promise<{
  hash_password: typeof hash_password;
  check_password: typeof check_password;
}> {
  const unlock = await mutex.lock();
  if (!wasmModuleCache.has(binary.name)) {
    const asm = decodeBase64(binary.data);
    const promise = WebAssembly.compile(asm);

    wasmModuleCache.set(binary.name, promise);
  }
  const module = await wasmModuleCache.get(binary.name);

  initSync({ module });
  unlock();
  return { hash_password, check_password };
}
