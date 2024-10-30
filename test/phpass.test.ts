import { HashPassword, CheckPassword } from "wordpress-hash-node";
import { hashPassword, checkPassword } from "../lib/phpass";
/* global test, expect */

function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

test("simple strings hash", async () => {
  for (let i = 0; i < 1; i++) {
    let str = generateRandomString();
    let hash = await hashPassword(str);
    expect(CheckPassword(str, hash)).toBe(true);
  }
});


test("simple strings check", async () => {
  for (let i = 0; i < 1; i++) {
    let str = generateRandomString();
    let hash = HashPassword(str);
    expect(await checkPassword(str, hash)).toBe(true);
  }
});
