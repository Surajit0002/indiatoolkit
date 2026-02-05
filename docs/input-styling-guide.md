# Input Styling Standardization Guide

## Overview
This guide explains the standardized input styling system implemented across all tools in the Omnitools application.

## Key Features

### 🎨 **Consistent Design**
- **White backgrounds** for all inputs
- **Black text** (`text-slate-900`) for content
- **Gray placeholders** (`text-slate-400`) 
- **Dynamic border highlighting** that matches each tool's category color
- **Rounded corners** (`rounded-2xl`) for modern appearance
- **Bold typography** for better readability

### 🌈 **Dynamic Color System**
Inputs automatically adapt their focus border color based on the tool's category:
- Uses CSS variable `--accent-color` 
- Each tool category has its own color defined in the tool page
- Focus state creates a subtle glow effect with color mixing

## Available Components

### 1. ToolInput
Standard input field with label support and error handling.

```tsx
import { ToolInput } from "@/components/ui/ToolInput";
import { Search } from "lucide-react";

<ToolInput
  label="Search Query"
  placeholder="Enter your search term..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  icon={<Search className="h-5 w-5" />}
/>
```

### 2. ToolTextarea
Multi-line text input with the same styling consistency.

```tsx
import { ToolTextarea } from "@/components/ui/ToolInput";

<ToolTextarea
  label="Content"
  placeholder="Type or paste your content here..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
  className="h-[300px]"
/>
```

### 3. ToolSelect
Styled dropdown select component with custom arrow indicator.

```tsx
import { ToolSelect } from "@/components/ui/ToolInput";

<ToolSelect
  label="Format"
  value={format}
  onChange={(e) => setFormat(e.target.value)}
  options={[{ value: "json", label: "JSON" }, { value: "xml", label: "XML" }]}
/>
```

## Global CSS Classes

### `.brutal-input`
Base input styling with:
- White background
- Slate-200 border
- Bold text
- Focus states with dynamic color highlighting

### `.brutal-textarea`
Extended textarea styling with:
- Minimum height of 120px
- Same styling as inputs
- Proper placeholder handling

### `.brutal-select`
Custom select styling with:
- Custom dropdown arrow
- Consistent padding and spacing
- Dynamic focus states

### `.brutal-label`
Standard label styling:
- Uppercase text
- Bold font
- Proper spacing
- Slate-700 color

## Implementation Examples

### Basic Usage in Tool Components

```tsx
// In your tool component
import { ToolInput, ToolTextarea } from "@/components/ui/ToolInput";

export default function MyTool() {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <div className="space-y-6">
      <ToolInput
        label="Input Field"
        placeholder="Enter your data..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <ToolTextarea
        label="Large Text Area"
        placeholder="Enter longer content..."
        value={largeText}
        onChange={(e) => setLargeText(e.target.value)}
      />
    </div>
  );
}
```

### With Custom Styling

```tsx
<ToolInput
  label="Custom Styled Input"
  placeholder="Special input field..."
  className="border-4 text-2xl" // Additional custom classes
  error="This field is required" // Error state
/>
```

## Color Customization

The dynamic color system works automatically based on the tool's category color:

```tsx
// In your tool page, the accent color is set via CSS variable
// Note: The curly braces below are escaped for Liquid
<div style="{{ "--accent-color": category?.color }}">
  {/* All inputs within this div will use the category color for focus states */}
  <ToolInput {...props} />
</div>
```

## Accessibility Features

- Proper label association
- Focus states with sufficient contrast
- Keyboard navigation support
- Screen reader friendly markup
- Error messaging for validation

## Migration Guide

To update existing tools to use the standardized inputs:

1. **Import the components:**
```tsx
import { ToolInput, ToolTextarea, ToolSelect } from "@/components/ui/ToolInput";
```

2. **Replace existing input elements:**
```tsx
// Before
<input 
  className="w-full p-4 bg-white border rounded-xl" 
  placeholder="Enter text..."
/>

// After
<ToolInput 
  placeholder="Enter text..."
/>
```

3. **Add labels where appropriate:**
```tsx
<ToolInput 
  label="Description"
  placeholder="Enter description..."
/>
```

## Best Practices

✅ **DO:**
- Use labels for better accessibility
- Provide meaningful placeholders
- Use appropriate input types
- Include error messages when validation fails

❌ **DON'T:**
- Override core styling classes
- Use inconsistent color schemes
- Forget to include labels
- Ignore accessibility requirements

## Troubleshooting

**Issue: Focus border not showing the correct color**
- Ensure the parent container has the `--accent-color` CSS variable set
- Check that the tool's category color is properly defined

**Issue: Placeholder text not visible**
- Verify the global CSS reset is applied
- Check for conflicting CSS rules

**Issue: Components not importing**
- Ensure the component path is correct
- Check that the UI components are properly exported