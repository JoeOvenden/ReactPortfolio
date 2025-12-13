import { expect, test } from "vitest"; 
import { verifyPassword, hashPassword } from '@/app/lib/cryptography';

const salt1 = "580b2d74-82bb-4d4a-baec-c5145722bc5f";
const salt2 = "0725837d-19c7-4bc0-a75b-08d84aa7c643";

test('Hashing the same password with the same salt gives the same hash', () => {
    const password = "test_password";
    expect(hashPassword(salt1, password)).toBe(hashPassword(salt1, password));
});

test('Hashing different passwords with the same salt gives different hashes', () => {
    const password1 = "test_password";
    const password2 = "test_password2";
    expect(hashPassword(salt1, password1)).not.toBe(hashPassword(salt1, password2));
});

test('Hashing the same password with different salts gives different hashes', () => {
    const password = "test_password";
    expect(hashPassword(salt1, password)).not.toBe(hashPassword(salt2, password));
});

test('Hashing different passwords with different salts gives different hashes', () => {
    const password1 = "test_password";
    const password2 = "test_password2";
    expect(hashPassword(salt1, password1)).not.toBe(hashPassword(salt2, password2));
});

test('Verify password correctly verifies password', () => {
    const password = "test_password";
    const hash = hashPassword(salt1, password);
    expect(verifyPassword(salt1, password, hash)).toBe(true);
});

test('Verify password correctly verifies wrong password', () => {
    const password1 = "test_password";
    const password2 = "test_password2";
    const hash = hashPassword(salt1, password1);
    expect(verifyPassword(salt1, password2, hash)).toBe(false);
});

test('Hash password throws on error on empty or short salt', () => {
    const password = "test_password";
    expect(() => hashPassword("", password)).toThrowError();
    expect(() => hashPassword("012345678912345", password)).toThrowError();
});

test('Verify password throws on error on empty or short salt', () => {
    const password = "test_password";
    const hash = hashPassword(salt1, password);
    expect(() => verifyPassword("", password, hash)).toThrowError();
    expect(() => verifyPassword("012345678912345", password, hash)).toThrowError();
});