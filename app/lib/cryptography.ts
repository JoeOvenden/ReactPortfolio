import { sha256 } from 'js-sha256';

export function verifyPassword(
    salt: string,
    password: string,
    hash: string,
    rounds?: number,
    hashingFunction?: 'sha256',
) {
    return hashPassword(salt, password) === hash;
}

export function hashPassword(salt: string, password: string, rounds?: number, hashingFunction?: 'sha256') {
    if (salt.length < 16) {
        throw new Error('Salt too short');
    }
    const pepper = process.env.PASSWORD_PEPPER ?? '';
    if (pepper.length < 16) {
        throw new Error('Pepper is either null or too short');
    }

    rounds = rounds ?? 10000;
    let hash = password;
    for (let i = 0; i < rounds; i++) {
        hash = sha256(salt + hash + pepper);
    }
    return hash;
}
