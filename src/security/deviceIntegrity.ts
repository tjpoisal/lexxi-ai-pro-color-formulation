export async function isDeviceCompromised(): Promise<boolean> {
  return false;
}

export async function assertSafeEnvironment(): Promise<void> {
  await isDeviceCompromised();
}
