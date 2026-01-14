// Secure storage abstraction for sensitive data
// Use this instead of AsyncStorage for anything that could be used to
// impersonate a user (tokens, user IDs, refresh tokens, etc.).

import EncryptedStorage from 'react-native-encrypted-storage';

export async function setSecureItem(key: string, value: string): Promise<void> {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.warn('Failed to set secure item', {key, error});
    // In production, consider reporting this to monitoring.
  }
}

export async function getSecureItem(key: string): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem(key);
  } catch (error) {
    console.warn('Failed to get secure item', {key, error});
    return null;
  }
}

export async function removeSecureItem(key: string): Promise<void> {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove secure item', {key, error});
  }
}
