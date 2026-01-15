# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core development commands

This is a React Native app targeting iOS and Android. All commands assume Node.js 18 and npm 9.

### Install dependencies

```sh
npm install
```

### Local development (Metro + simulators)

- Start Metro bundler only:
  ```sh
  npm run start
  ```
- Run on iOS simulator (starts Metro if needed):
  ```sh
  npm run ios
  ```
- Run on Android emulator/device (starts Metro if needed):
  ```sh
  npm run android
  ```

### Build mobile release artifacts

These assume the native projects are configured under `ios/` and `android/`.

- iOS archive build (Xcode workspace):
  ```sh
  npm run build:ios
  ```
- Android release APK/AAB:
  ```sh
  npm run build:android
  ```

### Linting and type-checking

- Lint the entire project with ESLint:
  ```sh
  npm run lint
  ```
- Lint a single file (useful when iterating on one component):
  ```sh
  npx eslint src/path/to/File.tsx
  ```
- Type-check with TypeScript (no emit):
  ```sh
  npx tsc --noEmit
  ```

### Tests (Jest)

Jest is configured via React Native defaults; there are currently no test files checked in.

- Run the Jest test suite:
  ```sh
  npm test
  ```
- Run a single test file (once tests exist):
  ```sh
  npm test -- src/path/to/file.test.ts
  ```

## High-level architecture

### Entry points and navigation

- **`App.tsx`** is the primary entry point mounted by React Native:
  - Requests camera permission and opens the **front-facing camera** using `react-native-vision-camera`.
  - Renders a full-screen live camera feed with an overlaid Skia `Canvas` that will display the hair segmentation mask tinted with the selected color.
  - Manages all UI state for:
    - Current selected color (from `PROFESSIONAL_COLORS`).
    - Camera permissions and device selection.
    - Before/after comparison modal.
    - Loaded color technical details and cross-brand conversions.
    - Open metadata tab (technical, safety, conversions).
    - Active allergen filters.
- **`src/navigation/AppNavigator.tsx`** defines a simple `@react-navigation/native` stack (`Home` and `Camera` screens under `src/screens`). It is currently a separate navigator that is **not wired into `App.tsx` yet**, and serves as a starting point for a multi-screen flow if/when the app moves beyond the single-screen prototype.

### AR and image-processing layers

The AR experience is split between a JavaScript-based prototype and a native iOS controller:

- **JS/React Native AR overlay (`App.tsx`)**
  - Uses `react-native-vision-camera` to stream frames from the front camera.
  - Intended to use a frame processor that runs MediaPipe hair segmentation per frame and writes the resulting mask into a shared value (`hairMaskImage`) consumed by a Skia `Canvas` overlay.
  - Current `segmentHair(frame)` implementation inside `App.tsx` is a **placeholder**; it needs to be wired to the real segmentation utilities in `src/utils/hairSegmentation.ts` once frame data is bridged.
- **MediaPipe integration (`src/utils/hairSegmentation.ts`)**
  - `initializeHairSegmentation()` lazily loads the MediaPipe `ImageSegmenter` via `FilesetResolver.forVisionTasks` and returns a configured `ImageSegmenter` instance using the hosted hair segmentation model.
  - `segmentHair(imageData, timestamp)` takes browser-style `ImageData` plus a timestamp, runs `segmentForVideo`, extracts the categorical mask, and produces a binary `Uint8ClampedArray` representing hair vs. non-hair plus basic metadata (width, height, confidence).
  - `applyColorToHair(originalImage, hairMask, colorHex, blendStrength)` applies a multiplicative blend of the desired color over hair pixels only, returning a new `ImageData`. This is the core pixel-level blending primitive used to make hair appear tinted while preserving texture.
- **Native ARKit controller (`src/LexxiColorTryOnViewController.swift`)**
  - Implements a full **ARKit + SceneKit** pipeline for head-tracked, 3D hair overlays on iOS:
    - `ARSCNView` with `ARFaceTrackingConfiguration` and real-time `ARSCNFaceGeometry` updates.
    - A custom `hairGeometry` node approximating the hair region using upper-forehead vertices (placeholder for a future ML-driven mesh built from a hair mask).
    - `applyHairColor(hex, blend)` constructs a `SCNMaterial` with `.multiply` blend mode and PBR properties (roughness/metalness) to simulate realistic shine.
  - Provides a UIKit color-picker strip built from a local `professionalColors` dictionary mirroring the TypeScript palette.
  - Contains **ML and lighting hooks**:
    - `segmentHairUsingML(image:)` uses `Vision` person segmentation as a stand-in for a dedicated hair model.
    - `adjustColorForLighting(_:lightEstimate:)` adjusts saturation/brightness based on `ARLightEstimate`.
    - `captureComparison(selectedColorHex:)` captures before/after snapshots and is designed to hand them to a higher-level UI for side‑by‑side comparison.
  - Includes a **Supabase integration hook** via the `AnySupabaseClient` protocol and `fetchProfessionalColors(using:)`, which returns decoded `ColorOption` records for integration with Strattora/Supabase-backed color catalogs.

### Domain data and color metadata

- **`src/data/colors.ts`** is the central catalog of professional shades:
  - Defines the `HairColor` interface, including technical and safety metadata (level, tone, usage notes, ingredient summary, allergen tags, MSDS/SDS URLs, equivalent shades).
  - Exports `PROFESSIONAL_COLORS` with a curated subset of shades from Wella, Redken, L'Oréal, Schwarzkopf, Pravana, Pulp Riot, Matrix, Joico.
  - Provides `COLOR_CATEGORIES` as a convenience for grouping by `category` (`blonde`, `brown`, `red`, `black`, `fashion`).
- **`App.tsx`** uses `PROFESSIONAL_COLORS` as the source of truth for:
  - The scrollable color picker (circular swatches at the bottom).
  - Metadata presented under the **Technical / Formula** and **Safety & Allergens** tabs.
  - Conversions between brands (via `fetchConversions`).

### API boundary and backend integration

Backend integration is intentionally abstracted so the app can run entirely on-device for demos, then flip to a real backend later.

- **Config (`src/config/api.ts`)**
  - `API_BASE_URL` is the single toggle between **demo/offline mode** (empty string) and a real HTTPS backend (set to a non-empty base URL such as `https://api.lexxi.app/v1`).
  - `hasBackend()` returns `true`/`false` based on whether `API_BASE_URL` is set, and all API calls check this before hitting the network.
- **Haircolor API client (`src/api/haircolor.ts`)**
  - Defines shared API types: `HairColorDetail`, `ConversionSuggestion`, and `AllergenInfo` that mirror the expected backend responses.
  - `authorizedFetch(path, init)` builds a `fetch` call using `API_BASE_URL` and attaches a `Bearer` token from secure storage (`getSecureItem('authToken')`) when present.
  - `fetchColorDetail(id)`:
    - In backend mode: calls `/haircolors/{id}` and returns `HairColorDetail` from the server.
    - In offline mode: derives a `HairColorDetail` from local `PROFESSIONAL_COLORS`, adding conservative default `developerGuidance` and processing-time ranges.
  - `fetchConversions(sourceId)`:
    - In backend mode: calls `/haircolors/{id}/conversions`.
    - In offline mode: returns mock cross-brand conversions by filtering other colors with the same category and assigning a fixed similarity score.
  - `searchAllergens(allergen)`:
    - In backend mode: calls `/allergens/{allergen}`.
    - In offline mode: walks `PROFESSIONAL_COLORS` and returns which color IDs contain the specified allergen tag.

When adding new API calls, follow this pattern: gate on `hasBackend()`, prefer secure token retrieval via `secureStorage`, and provide a safe local fallback where feasible.

### AI consultation helpers

- **`src/ai/assistant.ts`** centralizes AI-related logic without directly depending on any vendor SDK:
  - `ConsultationInput` models the high-level questions the AI cares about (target category, natural level, gray %, allergens to avoid, preferred brands).
  - `getRuleBasedConsultation(input)` implements a **rule-based suggestion engine** entirely on the device using `PROFESSIONAL_COLORS`:
    - Filters out shades with banned allergens.
    - Prioritizes preferred brands while still falling back to others.
    - Emits a primary formula, a small set of alternatives, and human-readable warnings/rationale.
  - `LLMClient` is an interface that any backend client can implement to talk to a hosted LLM.
  - `getLLMConsultation(input, client)` packages a conservative, safety-first system prompt plus structured `input` and `baseSuggestion`, then delegates to `client.consult`. This ensures **all direct LLM calls go through a backend** instead of bundling provider secrets in the app.

### Security, integrity, and consent flows

- **Secure storage (`src/security/secureStorage.ts`)**
  - Wraps `react-native-encrypted-storage` with three helpers: `setSecureItem`, `getSecureItem`, and `removeSecureItem`.
  - All authentication or token-like values (e.g., `authToken` consumed by `authorizedFetch`) should go through this module rather than `AsyncStorage`.
- **Device integrity (`src/security/deviceIntegrity.ts`)**
  - Uses `react-native-root-detection` to flag potentially compromised environments via `isDeviceCompromised()` (rooted, debuggable, or running from external storage).
  - `assertSafeEnvironment()` provides a central hook to gate high-risk flows (e.g., account changes, payment flows, or access to legal documents) without yet enforcing UI behavior.
- **Legal/consent UI (`src/components/ComprehensiveConsent.tsx` and `SignatureCapture.tsx`)**
  - `ComprehensiveConsent` implements the 9‑acknowledgment consent and liability waiver described in the README:
    - Displays client/stylist identities, service description, formula summary, and total cost.
    - Renders each acknowledgment as a tappable row that toggles a checkbox.
    - Requires all acknowledgments plus both signatures before calling `onComplete`.
  - `SignatureCapture` is a thin wrapper around `react-native-signature-canvas` with a minimal toolbar:
    - Renders an HTML-based signature pad styled to match the Lexxi palette.
    - Exposes a `Clear` button that calls `clearSignature()` on the underlying canvas.

These modules together form the legal-protection layer (consent capture, signatures, and integration points for later PDF/email workflows).

## Repository notes

- The **README** includes additional non-code documents (business plan, workflows, design system, scheduling) that are not currently checked into this repo but are conceptually authoritative for product behavior. If those files appear in the future, prefer them as the source of truth for domain rules and flows when modifying related code.
- The project currently has no Jest test files or explicit Jest/Metro/Babel config committed; when adding tests or build tooling, keep the existing script names and TypeScript/React Native stack in mind to avoid duplicating configuration.
