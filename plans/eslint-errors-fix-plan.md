# ESLint Errors Fix Plan

## Overview

The project has **88 errors** and **353 warnings** reported by ESLint. This plan focuses on fixing the **errors** only, as warnings are optional fixes.

## Error Categories

### 1. react-hooks/purity Errors (18 errors)

These errors occur when impure functions like `Math.random()` and `Date.now()` are called during render inside `useMemo` hooks. React requires components to be pure - the same inputs should produce the same outputs.

#### Affected Files:
- [`components/DynamicToolCategories.tsx`](components/DynamicToolCategories.tsx:30-45)
- [`components/DynamicToolRenderer.tsx`](components/DynamicToolRenderer.tsx:60-84)

#### Solution:
Move the random data generation outside the render phase using one of these approaches:

**Option A: Use a seeded pseudo-random number generator (PRNG)**
```typescript
// Create a seeded random generator for deterministic results
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Use category name hash as seed for consistent results
const seed = cat.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
const randomValue = seededRandom(seed);
```

**Option B: Pre-generate random values in a stable data structure**
```typescript
// Outside the component or in a separate data file
const categoryMetadata = {
  'Image Tools': { toolCount: 42, popularity: 85, isNew: true, ... },
  'Text Tools': { toolCount: 28, popularity: 72, isNew: false, ... },
  // ... predefined values for each category
};
```

**Option C: Use useState with lazy initialization**
```typescript
// Generate once on mount, not on every render
const [enhancedCategories] = useState(() => {
  return categories.map(cat => ({
    ...cat,
    toolCount: Math.floor(Math.random() * 50) + 10,
    // ... other random values
  }));
});
```

**Recommended: Option C** - Using `useState` with lazy initialization is the cleanest solution that maintains the current behavior while fixing the purity issue.

---

### 2. react-hooks/set-state-in-effect Errors (6 errors)

These errors occur when `setState` is called synchronously inside `useEffect`. This can cause cascading renders and performance issues.

#### Affected Files:
- [`components/GlobalSearch.tsx`](components/GlobalSearch.tsx:46) - Line 46: `setResults([])`
- [`components/HeroSearchBar.tsx`](components/HeroSearchBar.tsx:52) - Line 52: `setSearchHistory(...)`, Line 74: `setResults(...)`
- [`components/SmartToolRecommendations.tsx`](components/SmartToolRecommendations.tsx:84) - Line 84: `generateRecommendations()`
- [`components/ToolConfigurationPanel.tsx`](components/ToolConfigurationPanel.tsx:87) - Line 87: `loadToolConfig(toolId)`

#### Solution:

**For GlobalSearch.tsx:**
Replace the `useEffect` with `useMemo` for derived state:
```typescript
// Before
useEffect(() => {
  if (query.length >= 1) {
    // ... search logic
    setResults(filtered);
  } else {
    setResults([]);
  }
}, [query, fuse]);

// After
const results = useMemo(() => {
  if (query.length >= 1) {
    const fuseResults = fuse.search(query);
    return fuseResults.slice(0, 6).map((result) => result.item);
  }
  return [];
}, [query, fuse]);
```

**For HeroSearchBar.tsx:**
- For search history: Use `useState` with lazy initialization
- For search results: Use `useMemo` instead of `useEffect`

```typescript
// Before - search history
useEffect(() => {
  const history = localStorage.getItem('searchHistory');
  if (history) {
    setSearchHistory(JSON.parse(history));
  }
}, []);

// After - lazy initialization
const [searchHistory, setSearchHistory] = useState<string[]>(() => {
  if (typeof window === 'undefined') return [];
  try {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
});

// Before - search results
useEffect(() => {
  if (query.length >= 1) {
    const searchResults = fuse.search(query);
    setResults(searchResults.slice(0, 8).map(r => r.item));
  } else {
    setResults([]);
  }
}, [query]);

// After - useMemo
const results = useMemo(() => {
  if (query.length >= 1) {
    const searchResults = fuse.search(query);
    return searchResults.slice(0, 8).map(r => r.item);
  }
  return [];
}, [query, fuse]);
```

**For SmartToolRecommendations.tsx:**
Wrap the `generateRecommendations` call to avoid synchronous setState:
```typescript
// Before
useEffect(() => {
  generateRecommendations();
}, [userPreferences, activeFilter, searchQuery]);

// After - use async pattern or move to event handler
useEffect(() => {
  // Use requestAnimationFrame to defer state updates
  const frame = requestAnimationFrame(() => {
    generateRecommendations();
  });
  return () => cancelAnimationFrame(frame);
}, [userPreferences, activeFilter, searchQuery]);
```

**For ToolConfigurationPanel.tsx:**
Use lazy initialization or move to an event-based pattern:
```typescript
// Before
useEffect(() => {
  loadToolConfig(toolId);
}, [toolId]);

// After - use useState with lazy initialization
const [config, setConfig] = useState<ToolConfig | null>(() => {
  return loadToolConfigSync(toolId); // Synchronous version
});

// Or use a ref to track if we need to load
const prevToolIdRef = useRef(toolId);
if (prevToolIdRef.current !== toolId) {
  prevToolIdRef.current = toolId;
  // Load config outside of useEffect
}
```

---

### 3. @typescript-eslint/no-explicit-any Errors (4 errors)

These errors occur when using `any` type instead of specific types.

#### Affected Files:
- [`components/DynamicToolCategories.tsx`](components/DynamicToolCategories.tsx:81) - Line 81: `category: any`
- [`components/DynamicToolCategories.tsx`](components/DynamicToolCategories.tsx:128) - Line 128: `e.target.value as any`
- [`components/DynamicToolRenderer.tsx`](components/DynamicToolRenderer.tsx:205) - Line 205: `e.target.value as any`

#### Solution:

**For DynamicToolCategories.tsx - Line 81:**
```typescript
// Before
const handleCategoryClick = (category: any) => {
  setSelectedCategory(category.id);
  onCategorySelect?.(category);
};

// After - define proper type
interface Category {
  id: string;
  name: string;
  // ... other properties
}

const handleCategoryClick = (category: Category) => {
  setSelectedCategory(category.id);
  onCategorySelect?.(category);
};
```

**For DynamicToolCategories.tsx - Line 128 and DynamicToolRenderer.tsx - Line 205:**
```typescript
// Before
onChange={(e) => setSortBy(e.target.value as any)}

// After - define union type for valid sort values
type SortOption = 'name' | 'popularity' | 'recent' | 'featured' | 'newest';

onChange={(e) => setSortBy(e.target.value as SortOption)}
```

---

## Implementation Order

1. **DynamicToolCategories.tsx** - Fix purity errors and `any` types
2. **DynamicToolRenderer.tsx** - Fix purity errors and `any` types
3. **GlobalSearch.tsx** - Fix set-state-in-effect errors
4. **HeroSearchBar.tsx** - Fix set-state-in-effect errors
5. **SmartToolRecommendations.tsx** - Fix set-state-in-effect errors
6. **ToolConfigurationPanel.tsx** - Fix set-state-in-effect errors

---

## Files to Modify

| File | Error Type | Number of Errors |
|------|------------|------------------|
| `components/DynamicToolCategories.tsx` | purity, no-explicit-any | 5 |
| `components/DynamicToolRenderer.tsx` | purity, no-explicit-any | 11 |
| `components/GlobalSearch.tsx` | set-state-in-effect | 1 |
| `components/HeroSearchBar.tsx` | set-state-in-effect | 2 |
| `components/SmartToolRecommendations.tsx` | set-state-in-effect | 1 |
| `components/ToolConfigurationPanel.tsx` | set-state-in-effect | 1 |

---

## Notes

- The warnings (353 total) are not blocking errors and can be addressed separately
- Many warnings are about unused imports/variables which can be auto-fixed with `eslint --fix`
- Image-related warnings about `<img>` vs `<Image />` are Next.js optimizations, not critical errors
