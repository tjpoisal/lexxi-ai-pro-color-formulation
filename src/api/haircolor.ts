// Client-facing API types and stubs for haircolor metadata, conversions,
// and safety information. These are designed to mirror a future backend
// while providing local mocks for now.

import type {HairColor} from '../data/colors';

export interface HairColorDetail extends HairColor {
  ingredientsFull?: string[]; // optional, full INCI-style list
  developerGuidance?: string; // e.g. "20 vol on natural levels 6–7"
  processingTimeMinutes?: {min: number; max: number};
}

export interface ConversionSuggestion {
  sourceId: string;
  targetId: string;
  similarityScore: number; // 0–1
  notes?: string;
}

export interface AllergenInfo {
  allergen: string;
  presentInColorIds: string[];
  notes?: string;
}

// Placeholder in-memory mocks. Replace with real HTTPS requests when
// a backend service is available.

import {PROFESSIONAL_COLORS} from '../data/colors';

export async function fetchColorDetail(id: string): Promise<HairColorDetail | null> {
  const base = PROFESSIONAL_COLORS.find(c => c.id === id);
  if (!base) return null;

  // Example: derive a simple processing suggestion based on level.
  const levelText = base.level ?? 'standard';
  return {
    ...base,
    developerGuidance: `Typical developer: 10–20 vol depending on base level for ${levelText}. Always follow manufacturer instructions.`,
    processingTimeMinutes: {min: 20, max: 45},
  };
}

export async function fetchConversions(sourceId: string): Promise<ConversionSuggestion[]> {
  const source = PROFESSIONAL_COLORS.find(c => c.id === sourceId);
  if (!source) return [];

  // Simplified mock: suggest colors from other brands with same category and similar tone.
  return PROFESSIONAL_COLORS
    .filter(c => c.brand !== source.brand && c.category === source.category)
    .slice(0, 5)
    .map(target => ({
      sourceId,
      targetId: target.id,
      similarityScore: 0.7,
      notes: 'Mock conversion; verify against manufacturer charts before real-world use.',
    }));
}

export async function searchAllergens(allergen: string): Promise<AllergenInfo | null> {
  const lower = allergen.toLowerCase();
  const presentInColorIds = PROFESSIONAL_COLORS
    .filter(c => c.allergens?.some(a => a.toLowerCase() === lower))
    .map(c => c.id);

  if (!presentInColorIds.length) return null;

  return {
    allergen,
    presentInColorIds,
    notes: 'Based on metadata encoded in the app. Always confirm with official MSDS/SDS.',
  };
}