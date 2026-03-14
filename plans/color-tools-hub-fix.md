# Fix for ColorToolsHub.tsx Type Error

## Problem Analysis
In `components/tools/ColorToolsHub.tsx` at line 1148, there's a type error:
```
const img = new Image();
```
Error: "Expected 1 arguments, but got 0."

## Root Cause
The file imports `Image` from lucide-react (line 17):
```typescript
import { 
  // ... 
  Image,
  // ... 
} from "lucide-react";
```
When TypeScript encounters `new Image()`, it references the imported `Image` component from lucide-react rather than the DOM `Image` constructor. The lucide-react `Image` component expects props (like an SVG icon), hence the error "Expected 1 arguments, but got 0."

## Solution
Replace `new Image()` with `new window.Image()` or `new globalThis.Image()` to explicitly reference the DOM Image constructor.

## Implementation Plan
1. **Locate the problematic code** in `components/tools/ColorToolsHub.tsx` at line 1148
2. **Change** `const img = new Image();` to `const img = new window.Image();`
3. **Verify** there are no other instances of `new Image()` in the same file that need fixing
4. **Test** the fix by checking if the TypeScript error resolves

## Files to Modify
- `components/tools/ColorToolsHub.tsx` - Line 1148

## Verification Steps
1. After making the change, run the TypeScript compiler or Next.js build to confirm the error is resolved
2. Ensure the color extractor functionality still works correctly
3. Check that no new errors are introduced

## Estimated Impact
- Minimal change: only one line modified
- No functional changes to the component behavior
- Resolves the TypeScript blocking the build