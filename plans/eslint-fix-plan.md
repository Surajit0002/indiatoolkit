# ESLint Error Fix Plan

## Summary
Total: 674 problems (155 errors, 519 warnings)

## Critical Errors to Fix

### 1. react-hooks/set-state-in-effect (3 errors)

**Files affected:**
- `components/ToolManagementSystem.tsx` (lines 97, 106)
- `components/ads/AdBanner.tsx` (line 19)

**Solution:** Wrap setState calls in `setTimeout` to avoid cascading renders:
```typescript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    setState(value);
  }, 0);
  return () => clearTimeout(timeoutId);
}, [deps]);
```

---

### 2. react-hooks/purity (2 errors)

**File affected:** `components/ToolMarketplace.tsx` (lines 96, 385)

**Problem:** `Date.now()` is being called during render, which is impure.

**Solution:** Move the date calculation to a useMemo or use a state value:
```typescript
// Option 1: Use useMemo for derived state
const toolAgeInfo = useMemo(() => {
  return advancedTools.map(tool => ({
    ...tool,
    daysSinceUpdate: Math.floor((Date.now() - new Date(tool.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
  }));
}, [advancedTools]); // Recalculate when tools change

// Option 2: Store current time in state and update periodically
const [currentTime, setCurrentTime] = useState(Date.now());
useEffect(() => {
  const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
  return () => clearInterval(interval);
}, []);
```

---

### 3. @typescript-eslint/no-explicit-any (2 errors)

**Files affected:**
- `components/ToolManagementSystem.tsx` (line 315)
- `components/ToolMarketplace.tsx` (line 342)

**Solution:** Replace `any` with proper types.

---

### 4. @typescript-eslint/ban-ts-comment (8 errors)

**Files affected:**
- `components/ToolSwitcher.tsx` (line 61)
- `components/ads/AdBanner.tsx` (lines 25, 27, 29)
- `components/seo/PopularTools.tsx` (lines 61, 148, 218)
- `components/seo/RelatedTools.tsx` (lines 48, 89)

**Solution:** Change `@ts-ignore` to `@ts-expect-error`

---

## Warnings to Fix

### 5. Unused Imports and Variables

**Pattern:** Remove unused imports and prefix unused variables with underscore.

**Files with many unused imports:**
- `components/ToolManagementSystem.tsx` - Trash2, Edit3, Database, BarChart3, Lock, Globe, Filter, Calendar, Clock, TrendingUp, Heart, AlertCircle, ToolCategory, setTools, handlePinToggle, isToolPinned
- `components/ToolMarketplace.tsx` - useEffect, Filter, Download, Tag, ChevronUp, ExternalLink, Heart, Share2, BarChart3, ToolCategory, expandedCategories, toggleCategory, isPopular
- `components/ToolsList.tsx` - Grid, List, ArrowRight
- `components/ToolSwitcher.tsx` - Layout
- And many more files...

---

## Implementation Order

1. **Fix setState in effect errors** (3 errors)
   - ToolManagementSystem.tsx
   - AdBanner.tsx

2. **Fix purity errors** (2 errors)
   - ToolMarketplace.tsx - Date.now() during render

3. **Fix @ts-ignore comments** (8 errors)
   - Change to @ts-expect-error

4. **Fix no-explicit-any errors** (2 errors)
   - Add proper TypeScript types

5. **Remove unused imports** (many warnings)
   - Systematically go through each file

6. **Verify build succeeds**
   - Run `npm run build`

---

## Files to Modify

| File | Error Types | Priority |
|------|-------------|----------|
| components/ToolManagementSystem.tsx | set-state-in-effect, no-explicit-any, unused-vars | High |
| components/ToolMarketplace.tsx | purity, no-explicit-any, unused-vars | High |
| components/ads/AdBanner.tsx | set-state-in-effect, ban-ts-comment, unused-vars | High |
| components/ToolSwitcher.tsx | ban-ts-comment, unused-vars | Medium |
| components/seo/PopularTools.tsx | ban-ts-comment, unused-vars | Medium |
| components/seo/RelatedTools.tsx | ban-ts-comment, unused-vars | Medium |
| components/ToolsList.tsx | unused-vars | Low |
| Multiple tool files | unused-vars, no-img-element | Low |
