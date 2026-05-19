# Lexxi AI Pro — Color Formulation

React Native / Expo application for AI-powered hair color formulation.

## Tech Stack
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Package manager**: npm
- **Runtime**: Node 20

## Development

```bash
npm install
npm run lint
npm test -- --passWithNoTests --watchAll=false
```

## CI
Workflow in `.github/workflows/ci.yml`:
- Lint + Test on every push and PR

## Structure
- `App.tsx` — root component
- `src/` — application source
- `app.json` — Expo config

## Branch Convention
Dev branches follow the pattern `claude/<name>-<id>` and are branched from `main`.
