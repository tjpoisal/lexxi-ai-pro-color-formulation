// AI consultation helpers for Lexxi.
// - Rule-based suggestions derived from structured metadata.
// - Interface for backend-hosted LLM consultations.

import {PROFESSIONAL_COLORS, type HairColor} from '../data/colors';

export interface ConsultationInput {
  targetCategory: HairColor['category'];
  naturalLevel: number; // approximate 1–10
  grayPercentage?: number; // 0–100
  avoidAllergens?: string[];
  preferredBrands?: string[];
}

export interface ConsultationSuggestion {
  primaryFormula: HairColor;
  alternatives: HairColor[];
  warnings: string[];
  rationale: string;
}

export function getRuleBasedConsultation(input: ConsultationInput): ConsultationSuggestion | null {
  const avoidSet = new Set((input.avoidAllergens ?? []).map(a => a.toLowerCase()));

  const candidates = PROFESSIONAL_COLORS.filter(color => {
    if (color.category !== input.targetCategory) return false;
    if (color.allergens && color.allergens.some(a => avoidSet.has(a.toLowerCase()))) {
      return false;
    }
    return true;
  });

  if (!candidates.length) {
    return null;
  }

  // Prefer preferred brands, then fall back.
  let sorted = candidates;
  if (input.preferredBrands?.length) {
    const brandSet = new Set(input.preferredBrands.map(b => b.toLowerCase())) as Set<string>;
    sorted = [...candidates].sort((a, b) => {
      const aPref = brandSet.has(a.brand.toLowerCase()) ? 0 : 1;
      const bPref = brandSet.has(b.brand.toLowerCase()) ? 0 : 1;
      return aPref - bPref;
    });
  }

  const primary = sorted[0];
  const alternatives = sorted.slice(1, 4);

  const warnings: string[] = [];
  if (input.grayPercentage && input.grayPercentage > 40) {
    warnings.push('High gray percentage detected; verify coverage claims and consider adding neutral/opaque shades.');
  }

  const rationale = [
    `Selected a ${primary.category} shade from ${primary.brand} in line ${primary.line ?? ''}.`.trim(),
    primary.level ? `Level: ${primary.level}.` : '',
    primary.tone ? `Tone: ${primary.tone}.` : '',
    primary.usageNotes ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return {primaryFormula: primary, alternatives, warnings, rationale};
}

// Interface for backend-hosted LLM consultations.
// The app should NOT call an LLM provider directly with secrets; instead,
// send structured input to a secure backend that talks to the model.

export interface LLMClient {
  consult(prompt: string, context: Record<string, unknown>): Promise<string>;
}

export async function getLLMConsultation(
  input: ConsultationInput,
  client: LLMClient,
): Promise<string> {
  const baseSuggestion = getRuleBasedConsultation(input);

  const systemPrompt = [
    'You are a professional haircolor technical educator.',
    'Use conservative, safety-first guidance and always defer to official MSDS/SDS and manufacturer instructions.',
    'Do not give medical advice. Recommend patch tests and salon consultation when in doubt.',
  ].join(' ');

  const userPrompt = JSON.stringify({
    input,
    baseSuggestion,
  });

  return client.consult(systemPrompt, {user: userPrompt});
}