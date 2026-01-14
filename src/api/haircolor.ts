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

// Placeholder in-memory mocks and optional backend integration.
// When API_BASE_URL is configured, functions will call a real HTTPS
// backend with auth headers; otherwise they fall back to local data.

import {PROFESSIONAL_COLORS} from '../data/colors';
import {API_BASE_URL, hasBackend} from '../config/api';
import {getSecureItem} from '../security/secureStorage';

async function authorizedFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = `${API_BASE_URL}${path}`;
  const token = await getSecureItem('authToken');
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> | undefined),
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, {...init, headers});
}

export async function fetchColorDetail(id: string): Promise<HairColorDetail | null> {
  if (hasBackend()) {
    try {
      const resp = await authorizedFetch(`/haircolors/${encodeURIComponent(id)}`);
      if (resp.ok) {
        return (await resp.json()) as HairColorDetail;
      }
      console.warn('fetchColorDetail backend error', resp.status);
    } catch (error) {
      console.warn('fetchColorDetail backend request failed', error);
    }
  }

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
  if (hasBackend()) {
    try {
      const resp = await authorizedFetch(`/haircolors/${encodeURIComponent(sourceId)}/conversions`);
      if (resp.ok) {
        return (await resp.json()) as ConversionSuggestion[];
      }
      console.warn('fetchConversions backend error', resp.status);
    } catch (error) {
      console.warn('fetchConversions backend request failed', error);
    }
  }

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
  if (hasBackend()) {
    try {
      const resp = await authorizedFetch(`/allergens/${encodeURIComponent(allergen)}`);
      if (resp.ok) {
        return (await resp.json()) as AllergenInfo;
      }
      console.warn('searchAllergens backend error', resp.status);
    } catch (error) {
      console.warn('searchAllergens backend request failed', error);
    }
  }

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
