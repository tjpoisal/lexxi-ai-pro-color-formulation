# Professional Haircolor & Safety Data Sources

This document outlines how to source, maintain, and govern the professional haircolor, MSDS/SDS, and allergen data that will power Lexxi.

## Primary Data Types

- **Shade metadata**: brand, line, shade name/number, level, tone, category.
- **Technical notes**: coverage, undertone, recommended base levels, developer strength, processing time.
- **Safety data**: key ingredients, allergens (e.g., PPD, PTDS, resorcinol, fragrance allergens), MSDS/SDS URLs, patch test guidance.
- **Conversions**: approximate equivalent shades across brands with notes and confidence levels.

## Recommended Sources

- Official manufacturer resources (brand portals, pro-only sites):
  - Shade charts and technical manuals (PDF, web pages).
  - MSDS/SDS libraries and product safety sheets.
- Distributor portals (where terms allow):
  - Sally Beauty, CosmoProf, etc., for cross-checking SKU and naming.
- Regulatory and safety organizations for allergen terminology and guidelines.

Always review the terms of use for each source and respect copyright and rate limits.

## Ingestion Strategy

1. **Manual seeding**
   - Start from the existing sample shades in `src/data/colors.ts`.
   - Expand brand-by-brand using CSV/JSON files created from official charts.
2. **Structured imports**
   - Maintain internal CSV/JSON per brand/line with the full schema (including safety fields).
   - Use a backend ingestion pipeline to validate and normalize records before they reach the app.
3. **Change management**
   - Track source URLs and last-reviewed timestamps.
   - When manufacturers update MSDS/SDS or reformulate products, update records and version them.

## Governance & Quality

- **Accuracy**: Cross-check shade names, numbers, and categories against official literature.
- **Safety-first**: When in doubt about allergens or safety guidance, default to conservative messaging and direct users to the official MSDS/SDS.
- **Auditability**: Keep a record (in the backend) of which human or system last edited a product record and why.

## In-App Positioning

- Clearly label manufacturer-provided content vs. Lexxi-generated guidance.
- Use warnings where AI-suggested formulas or conversions are estimates, not manufacturer-approved instructions.
- Provide easy links from the app UI to official MSDS/SDS and technical resources for each shade when available.