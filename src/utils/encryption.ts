import CryptoJS from 'crypto-js';
import { config } from '@/config/env';

/**
 * Encrypt data before storing to localStorage
 */
export function encryptData(data: unknown): string {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, config.cryptoKey).toString();
}

/**
 * Decrypt data from localStorage
 */
export function decryptData<T>(encryptedData: string): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, config.cryptoKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedString ? (JSON.parse(decryptedString) as T) : null;
  } catch {
    return null;
  }
}

/**
 * Safely save encrypted data to localStorage
 */
export function saveEncryptedToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, encryptData(data));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Safely load and decrypt data from localStorage
 */
export function loadEncryptedFromStorage<T>(key: string): T | null {
  const encrypted = localStorage.getItem(key);
  return encrypted ? decryptData<T>(encrypted) : null;
}
