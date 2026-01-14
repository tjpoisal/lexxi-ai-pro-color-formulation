# Security & Privacy Overview

This document describes the initial security and privacy posture for the Lexxi AR Hair Color Try-On app.

## Data Types and Sensitivity

- **Camera frames & hair segmentation masks**
  - Treated as sensitive biometric-adjacent data.
  - Processed on-device in real time for visualization only.
  - Not persisted or uploaded to any server in the current implementation.
- **User preferences** (e.g., last used color)
  - Non-sensitive.
  - Stored locally on-device.
- **Accounts, purchases, analytics**
  - Not yet implemented; design must assume these will require strong auth, encryption, and minimization.

## Client-Side Security Baseline

- **Transport Security**
  - All future network calls must use HTTPS with TLS 1.2+.
  - Certificate pinning should be enabled once a backend is introduced.
- **Local Storage**
  - `AsyncStorage` MUST be used only for non-sensitive data (e.g., UI preferences).
  - Secrets, tokens, or identifiers that can be used to impersonate users MUST use secure storage (Keychain/Keystore via a secure storage module).
- **Device Integrity**
  - The app will include hooks for jailbreak/root detection and runtime integrity checks.
  - High-risk operations (e.g., account management, purchases, cloud backups) should be blocked or degraded on compromised devices.
- **Code Protection**
  - Release builds must enable JS minification/obfuscation and native code protections (Proguard/R8 on Android, appropriate flags on iOS).

## Privacy & Compliance Principles

- Collect the minimum data necessary for the experience.
- Prefer on-device processing for imagery and hair segmentation; do not upload images by default.
- Any future cloud processing of photos must:
  - Be opt-in with clear, explicit consent.
  - Describe retention and deletion policies.
  - Avoid model training on user images without a separate, explicit agreement.
- Provide an in-app privacy notice that matches these behaviors and reference an external Privacy Policy for legal detail.

## Future Backend & Auth Expectations

When a backend is added:

- Use a managed identity provider (Auth0/Okta/Cognito/etc.) with OAuth2/OIDC.
- Use short-lived access tokens with refresh tokens stored in secure storage only.
- Enforce role-based access control (consumer vs. stylist vs. brand admin) on the server.
- Implement rate limiting, abuse detection, and least-privilege access to stored images and logs.
