# PhPass

A rust implementation of the password hashing algorithm used by WordPress. https://www.openwall.com/phpass/. Based on phpass rust implementaton by @jkoudys [here](https://github.com/clausehound/phpass).

## What

WordPress, the most popular blogging platform of all time, is the main application of the PhPass password algorithm. Since WP is nothing if not broad and backwards-compatible in its support, they avoided using a more modern checksum (e.g. SHA256) in favour of old-fashioned, long-broken md5. To make up for this, they'll run MD5 on a salted (and re-salted) input 256 times.

## Why

We often don't know which ideas and projects will become successful when we make them, and frequently sites evolve naturally from a simple, managed WordPress blog, to one with a custom plugin, to a hosted PHP app with WordPress as one of its packages, to away from PHP entirely. Those who move to rust (which is wonderful) will want some way to keep those old logins working.

It's also considerably faster than the native PHP version, so could be used in quickly auditing your WordPress user database, to flag and disable accounts with insecure (easy to guess) passwords.

I wanted to make a version in wasm that can be used anywhere (cloudflare, vercel, etc).

## How

This crate provides the basics to decode the PhPass checksum and salt from the standard WordPress hash string, and verify against a cleartext password.

### Getting started

```ts
import { hashPassword, checkPassword } from "phpass-wasm";
let hash = await hashPassword("swordfish");

let verified = await checkPassword("swordfish", hash);
```


## API

```ts
/**
 * Calculates PhPass hash
 * @param data Input data (string)
 * @returns Computed hash as a hexadecimal string
 */
export declare function hashPassword(password: string): Promise<string>;

/**
 * Check Password
 * @param data Input password (string)
 * @param hash Input hash (string)
 * @returns boolean if password matches hash
 * @throws {OldWPFormatError} If the hash is in old WordPress format
 * @throws {CheckPasswordError} For other errors
 */
export declare function checkPassword(password: string, hash: string): Promise<boolean>;


export declare class CheckPasswordError extends Error {
    constructor(message: string);
}
export declare class OldWPFormatError extends CheckPasswordError {
    constructor();
}
```

## Testing philosophy

We fuzz test against [`wordpress-hash-node`](https://www.npmjs.com/package/wordpress-hash-node) a nodejs alternative implementation of PhPass. Rust implementation is tested using the test cases from @jkoudys.
