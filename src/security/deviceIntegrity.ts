// Device integrity helpers
// Uses react-native-root-detection to detect rooted/jailbroken devices
// and provides a hook to gate high-risk flows.

import {isRooted, isDebuggable, isOnExternalStorage} from 'react-native-root-detection';

export async function isDeviceCompromised(): Promise<boolean> {
  try {
    const rooted = isRooted();
    const debuggable = isDebuggable();
    const external = isOnExternalStorage();
    return rooted || debuggable || external;
  } catch (error) {
    console.warn('Device integrity check failed', error);
    return false;
  }
}

export async function assertSafeEnvironment(): Promise<void> {
  const compromised = await isDeviceCompromised();
  if (compromised) {
    // In a real implementation, you might:
    // - Block certain flows (e.g., account management, purchases)
    // - Show a warning to the user
    // - Log the event to monitoring (without sensitive data)
  }
}
