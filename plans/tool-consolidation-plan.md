# Omnitools Consolidation Plan

## Executive Summary

This plan outlines the consolidation of tools in the Omnitools project based on user requirements. The goal is to:
1. Keep specified essential tools
2. Merge redundant tools into unified versions
3. Remove useless/duplicate tools

---

## Current State Analysis

### Total Tools Inventory
- **Total tool entries in [`data/tools.ts`](data/tools.ts):** 213 tools
- **Total component files in [`components/tools/`](components/tools/):** 180+ files

---

## 1. TOOLS TO KEEP (As Specified)

These tools will remain unchanged:

| Tool Name | ID | Component File |
|-----------|-----|----------------|
| Unicode Text Converter | `unicode-text-converter` | [`UnicodeTextConverter.tsx`](components/tools/UnicodeTextConverter.tsx) |
| Text to ASCII Art | `text-to-ascii-art` | [`TextToAsciiArt.tsx`](components/tools/TextToAsciiArt.tsx) |
| Color Name Finder | `color-name-finder` | [`ColorNameFinder.tsx`](components/tools/ColorNameFinder.tsx) |
| Random Color Generator | `random-color-generator` | [`RandomColorGenerator.tsx`](components/tools/RandomColorGenerator.tsx) |
| Image Reflection Generator | `image-reflection-generator` | [`ImageReflectionGenerator.tsx`](components/tools/ImageReflectionGenerator.tsx) |
| Image Sepia Converter | `image-sepia-converter` | [`ImageSepiaConverter.tsx`](components/tools/ImageSepiaConverter.tsx) |
| Image Inverter | `image-inverter` | [`ImageInverter.tsx`](components/tools/ImageInverter.tsx) |
| Image Grayscale Converter | `image-grayscale-converter` | [`ImageGrayscaleConverter.tsx`](components/tools/ImageGrayscaleConverter.tsx) |
| Envelope Designer | `envelope-designer` | [`EnvelopeDesigner.tsx`](components/tools/EnvelopeDesigner.tsx) |
| Letterhead Designer | `letterhead-designer` | [`LetterheadDesigner.tsx`](components/tools/LetterheadDesigner.tsx) |
| Quote Card Generator | `quote-card-generator` | [`QuoteCardGenerator.tsx`](components/tools/QuoteCardGenerator.tsx) |
| Badge Generator | `badge-generator` | [`BadgeGenerator.tsx`](components/tools/BadgeGenerator.tsx) |
| Divider Generator | `divider-generator` | [`DividerGenerator.tsx`](components/tools/DividerGenerator.tsx) |
| Callout Generator | `callout-generator` | [`CalloutGenerator.tsx`](components/tools/CalloutGenerator.tsx) |

---

## 2. TOOLS TO MERGE

### 2.1 Hash Generator (Consolidated)
**Merge Source:**
- `hash-generator` (text hash) - KEEP and enhance
- `file-hash-generator` (file hash) - MERGE INTO

**Result:** Single "Hash Generator" tool that supports both:
- Text input hashing (MD5, SHA-1, SHA-256, SHA-512)
- File upload hashing (same algorithms)

**Files to delete:**
- [`components/tools/FileHashGenerator.tsx`](components/tools/FileHashGenerator.tsx)

**Files to modify:**
- [`components/tools/HashGenerator.tsx`](components/tools/HashGenerator.tsx) - Add file upload tab
- [`data/tools.ts`](data/tools.ts) - Remove `file-hash-generator` entry

---

### 2.2 Base64 Converter (Consolidated)
**Merge Sources:**
- `base64-converter` (text encode/decode) - KEEP and enhance
- `image-to-base64` - MERGE INTO
- `base64-to-image` - MERGE INTO

**Result:** Single "Base64 Converter" tool with tabs:
- Tab 1: Text Encode/Decode
- Tab 2: Image to Base64
- Tab 3: Base64 to Image

**Files to delete:**
- [`components/tools/ImageToBase64.tsx`](components/tools/ImageToBase64.tsx)
- [`components/tools/Base64ToImage.tsx`](components/tools/Base64ToImage.tsx)

**Files to modify:**
- [`components/tools/Base64Converter.tsx`](components/tools/Base64Converter.tsx) - Add image conversion tabs
- [`data/tools.ts`](data/tools.ts) - Remove `image-to-base64` and `base64-to-image` entries

---

### 2.3 Image Format Converter (Universal)
**Merge Sources:**
- `image-format-converter` - KEEP (already universal)
- `image-to-jpg` - REMOVE (redundant)
- `image-to-png` - REMOVE (redundant)
- `image-to-webp` - REMOVE (redundant)
- `jpg-to-png` - REMOVE (redundant)
- `png-to-jpg` - REMOVE (redundant)
- `webp-to-png` - REMOVE (redundant)

**Result:** Single "Image Format Converter" supporting all format conversions

**Files to delete:**
- [`components/tools/ImageToJpg.tsx`](components/tools/ImageToJpg.tsx)
- [`components/tools/ImageToPng.tsx`](components/tools/ImageToPng.tsx)
- [`components/tools/ImageToWebp.tsx`](components/tools/ImageToWebp.tsx)
- [`components/tools/JpgToPng.tsx`](components/tools/JpgToPng.tsx)
- [`components/tools/PngToJpg.tsx`](components/tools/PngToJpg.tsx)
- [`components/tools/WebpToPng.tsx`](components/tools/WebpToPng.tsx)

**Files to modify:**
- [`data/tools.ts`](data/tools.ts) - Remove redundant image converter entries

---

### 2.4 Text Analyzer (Consolidated)
**Merge Sources:**
- `word-counter` - MERGE
- `character-counter` - MERGE
- `social-character-counter` - MERGE

**Result:** Single "Text Analyzer" tool with comprehensive analysis:
- Word count
- Character count (with/without spaces)
- Sentence count
- Paragraph count
- Reading time
- Social media limits checker (Twitter, Instagram, LinkedIn)

**New Component:** [`components/tools/TextAnalyzer.tsx`](components/tools/TextAnalyzer.tsx)

**Files to delete:**
- [`components/tools/WordCounter.tsx`](components/tools/WordCounter.tsx)
- [`components/tools/CharacterCounter.tsx`](components/tools/CharacterCounter.tsx)
- [`components/tools/SocialCharacterCounter.tsx`](components/tools/SocialCharacterCounter.tsx)

**Files to modify:**
- [`data/tools.ts`](data/tools.ts) - Replace 3 entries with single `text-analyzer` entry

---

### 2.5 JSON Formatter & Validator (Consolidated)
**Merge Sources:**
- `json-formatter` - KEEP and enhance
- `json-validator` - MERGE INTO

**Result:** Single "JSON Formatter & Validator" tool with:
- Format/Prettify JSON
- Validate JSON with error highlighting
- Minify JSON

**Files to delete:**
- [`components/tools/JsonValidator.tsx`](components/tools/JsonValidator.tsx)

**Files to modify:**
- [`components/tools/JsonFormatter.tsx`](components/tools/JsonFormatter.tsx) - Add validation tab
- [`data/tools.ts`](data/tools.ts) - Remove `json-validator` entry

---

### 2.6 Spreadsheet Converter (Consolidated)
**Merge Sources:**
- `csv-to-excel` - MERGE
- `excel-to-csv` - MERGE

**Result:** Single "Spreadsheet Converter" tool with:
- CSV to Excel conversion
- Excel to CSV conversion

**New Component:** [`components/tools/SpreadsheetConverter.tsx`](components/tools/SpreadsheetConverter.tsx)

**Files to delete:**
- [`components/tools/CsvToExcel.tsx`](components/tools/CsvToExcel.tsx)
- [`components/tools/ExcelToCsv.tsx`](components/tools/ExcelToCsv.tsx)

**Files to modify:**
- [`data/tools.ts`](data/tools.ts) - Replace 2 entries with single `spreadsheet-converter` entry

---

## 3. TOOLS TO REMOVE (Useless/Redundant)

### Clarification Needed
The user specified to "remove all useless tools" but did not define criteria for "useless."

**Potential categories of tools to consider for removal:**

#### 3.1 Duplicate Functionality
- Tools already covered by merged versions above

#### 3.2 Low-Value Tools (Potential candidates)
- `simple-calculator` vs `scientific-calculator` (redundant?)
- Multiple YouTube tools (title, description, tag generators)
- Multiple AI generators that overlap in functionality

#### 3.3 Niche Tools (Potential candidates)
- `aadhaar-mask-tool` (India-specific)
- `gst-calculator` (India-specific)

---

## 4. Implementation Checklist

### Phase 1: Create Merged Components
- [ ] Create TextAnalyzer.tsx (merge word-counter, character-counter, social-character-counter)
- [ ] Create SpreadsheetConverter.tsx (merge csv-to-excel, excel-to-csv)
- [ ] Enhance HashGenerator.tsx (add file hash functionality)
- [ ] Enhance Base64Converter.tsx (add image conversion tabs)
- [ ] Enhance JsonFormatter.tsx (add validation functionality)

### Phase 2: Update data/tools.ts
- [ ] Remove entries for deleted tools
- [ ] Update merged tool entries
- [ ] Update componentName references

### Phase 3: Delete Redundant Component Files
- [ ] Delete individual image converter files
- [ ] Delete individual counter files
- [ ] Delete merged tool files

### Phase 4: Update Imports and References
- [ ] Update any imports in other files
- [ ] Update sitemap generation if needed
- [ ] Test all remaining tools

---

## 5. Questions for User

Before proceeding with implementation, please clarify:

1. **"Useless tools" definition:** Should I remove all tools NOT in the keep/merge list? Or do you have specific criteria?

2. **Calculator consolidation:** Should `SimpleCalculator` and `ScientificCalculator` be merged into one "Calculator" tool?

3. **YouTube tools:** Should the 4 YouTube tools (title, description, tag, thumbnail) be consolidated?

4. **AI Tools:** Many AI tools have overlapping functionality. Should these be consolidated?

5. **India-specific tools:** Keep or remove (`gst-calculator`, `aadhaar-mask-tool`, etc.)?

---

## 6. Summary Statistics

| Category | Count |
|----------|-------|
| Tools to Keep (unchanged) | 14 |
| Tools to Merge (result in) | 6 consolidated tools |
| Tools to Remove (explicit) | 15+ |
| Total Reduction | ~20+ tools |

---

*Plan created: 2026-02-15*
*Status: Pending User Approval*