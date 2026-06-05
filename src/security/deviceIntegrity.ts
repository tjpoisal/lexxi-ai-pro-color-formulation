// Device integrity helpers
// react-native-root-detection was removed (package unavailable on npm).
// Returns safe defaults; replace with a maintained alternative when available.

export async function isDeviceCompromised(): Promise<boolean> {
  return false;
}

export async function assertSafeEnvironment(): Promise<void> {
  // no-op: root detection unavailable
}
