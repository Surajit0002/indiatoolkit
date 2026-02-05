# AdSense Integration

## Overview

Google AdSense integration for monetization of India Toolkit website.

## Step 1: Site Verification

Before showing ads, verify your site ownership with Google AdSense:

**Add this meta tag to your root layout:**

```html
<meta name="google-adsense-account" content="ca-pub-2181120097485339">
```

Implementation in [`app/layout.tsx`](../app/layout.tsx):

```typescript
export const metadata: Metadata = {
  // ... other metadata
  other: {
    'google-adsense-account': 'ca-pub-2181120097485339'
  }
};
```

## Step 2: AdSense Script

After verification, add the Google AdSense script to the root layout:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2181120097485339"
     crossorigin="anonymous"></script>
```

## Implementation in Next.js

### Method 1: Using Next.js Script Component

Add to [`app/layout.tsx`](../app/layout.tsx):

```typescript
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2181120097485339"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Method 2: Using dangerouslySetInnerHTML

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2181120097485339"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

## Ad Placement Strategy

### Above the Fold
- Place ad banner below the header
- Use responsive ad unit (728x90 for desktop, 320x50 for mobile)

### Tool Page
- Place ad below the tool interface
- Place ad in sidebar (desktop only)
- Place ad above FAQ section

### Category Pages
- Place ad between tool cards
- Use grid layout for multiple ads

### Blog Pages
- Place ad within content (between paragraphs)
- Place ad in sidebar

## Ad Unit Configuration

### Responsive Ad Unit

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2181120097485339"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Fixed Size Ad Unit

```html
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-2181120097485339"
     data-ad-slot="YOUR_AD_SLOT_ID"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Ad Component

Create a reusable Ad component:

```typescript
// components/ads/AdSenseAd.tsx

'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = ''
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const adStyle: React.CSSProperties = {
    display: adFormat === 'auto' ? 'block' : 'inline-block',
    ...style
  };

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2181120097485339"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

## Usage Example

```typescript
// In a page component
import AdSenseAd from '@/components/ads/AdSenseAd';

export default function ToolPage() {
  return (
    <div>
      <h1>Tool Name</h1>
      
      {/* Above tool */}
      <AdSenseAd adSlot="1234567890" />
      
      <ToolComponent />
      
      {/* Below tool */}
      <AdSenseAd adSlot="0987654321" />
      
      <FAQSection />
    </div>
  );
}
```

## Performance Considerations

1. **Lazy Loading**: Load ads after main content
2. **Ad Blocking**: Handle ad-blocked scenarios gracefully
3. **CLS Prevention**: Reserve space for ads to prevent layout shifts
4. **Mobile Optimization**: Use responsive ad units

## AdSense Analytics

Track ad performance in Google AdSense dashboard:
- Page RPM (Revenue per 1000 pageviews)
- Click-through rate (CTR)
- Active view viewability
- Estimated earnings

## Compliance

- Follow AdSense program policies
- Ensure content is ad-friendly
- Don't click on your own ads
- Don't encourage ad clicks
- Maintain good user experience

## Testing

Test ad placement with:
- Google AdSense preview tool
- Different devices (desktop, mobile, tablet)
- Different browsers
- Ad blockers enabled/disabled
