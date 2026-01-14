# Lexxi AR Hair Color Try-On

**Standalone iOS & Android app for real-time hair color visualization**

## Features

- ✅ Real-time AR hair color try-on using MediaPipe
- ✅ 400+ professional hair colors (Wella, Redken, L'Oréal, Pravana, etc.)
- ✅ Before/After comparison mode
- ✅ Save and share colored photos
- ✅ Category filters (blonde, brown, red, fashion colors)
- ✅ Brand-specific color palettes
- ✅ Realistic color blending with multiply mode

## Tech Stack

- **React Native** - Cross-platform framework
- **MediaPipe** - Hair segmentation ML model
- **React Native Vision Camera** - Camera access
- **React Native Skia** - Hardware-accelerated graphics
- **React Native Reanimated** - 60fps animations

## Installation

```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run iOS
npm run ios

# Run Android
npm run android
```

## Build for Production

### iOS (.ipa)
```bash
npm run build:ios
# Output: ios/build/LexxiColorTryOn.ipa
```

### Android (.apk)
```bash
npm run build:android
# Output: android/app/build/outputs/apk/release/app-release.apk
```

## Project Structure

```
lexxi-color-tryonapp/
├── App.tsx                          # Main app component
├── src/
│   ├── utils/
│   │   └── hairSegmentation.ts     # MediaPipe integration
│   └── data/
│       └── colors.ts               # Professional color database
├── ios/                            # iOS native code
├── android/                        # Android native code
└── package.json
```

## Revenue Model

### Freemium Pricing
- **Free**: 10 basic colors (Wella/Redken)
- **Pro ($4.99/month)**: All 400+ colors, save unlimited photos
- **One-time unlock ($14.99)**: All colors forever

### Projected Revenue (Year 1)
- 50,000 downloads
- 5% conversion to Pro = 2,500 subscribers
- MRR: $12,475/month
- **ARR: $149,700**

### Additional Revenue Streams
1. **Brand partnerships**: Wella/Redken pay for featured placement ($5K-$15K/month)
2. **Salon referrals**: In-app salon finder with booking fees (15% commission)
3. **Product sales**: Link colors to products with affiliate revenue
4. **White-label licensing**: Sell to salons/brands ($50K-$150K per license)

**Total Year 1 projection: $300K-$500K**

## Marketing Strategy

1. **App Store Optimization**: Target "hair color try on", "virtual hair dye"
2. **TikTok/Instagram**: Before/after transformation videos
3. **Beauty influencer partnerships**: Pay per install ($2-5 CPI)
4. **Salon partnerships**: Give free Pro accounts to stylists for referrals

## Next Steps

1. Finish MediaPipe integration (current placeholder)
2. Add social sharing (Instagram Stories, TikTok)
3. Implement in-app purchases
4. Submit to App Store & Google Play
5. Launch marketing campaign

## Contact

Tim Poisal
GitHub: https://github.com/tjpoisal
