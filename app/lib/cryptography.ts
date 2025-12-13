import { sha256 } from "js-sha256";
import '@/envConfig.ts';

export function verifyPassword(
  salt: string,
  password: string,
  hash: string
) {
    return hashPassword(salt, password) === hash;
}

export function hashPassword(
  salt: string,
  password: string,
  rounds?: number,
  fn?: 'sha256'
) {
    if (salt.length < 16) {
        throw new Error("Salt too short");
    }
    const pepper = process.env.PASSWORD_PEPPER ?? "";
    if (pepper.length < 16) {
        throw new Error("Pepper is either null or too short");
    }

    rounds = rounds ?? 10000;
    fn = fn ?? 'sha256';
    let hash = password;
    console.log(salt, password, pepper);
    for(let i = 0; i < rounds; i++) {
        hash = sha256(salt + hash + pepper);
    }
    return hash;
}