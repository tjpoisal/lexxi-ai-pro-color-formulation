module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vision-camera|@shopify/react-native-skia|react-native-reanimated|react-native-encrypted-storage|react-native-root-detection|react-native-signature-canvas|react-native-fs)/)',
  ],
};
