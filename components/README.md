# Google AdSense Setup

## Current Configuration

AdSense is already configured and will display ads at the **top and bottom of every page** automatically via the AdLayout wrapper in the root layout.

### What's Set Up:

1. ✅ AdSense script added to `layout.tsx`
2. ✅ Publisher ID configured: `ca-pub-1589967275136790`
3. ✅ Top and bottom ads on all pages via `AdLayout.tsx`

## Next Steps

**⚠️ Important:** You need to replace the placeholder ad slot IDs in `/components/AdLayout.tsx`:

- **Line 11 (Top Ad):** Replace `"1234567890"` with your actual ad slot ID
- **Line 20 (Bottom Ad):** Replace `"0987654321"` with your actual ad slot ID

### Getting Your Ad Slot IDs:

1. Log into [Google AdSense](https://www.google.com/adsense)
2. Go to **Ads** → **By ad unit** → **Display ads**
3. Create two new ad units:
   - **Top Ad:** Responsive horizontal banner
   - **Bottom Ad:** Responsive horizontal banner
4. Copy each ad slot ID (format: `1234567890`)
5. Update `/components/AdLayout.tsx` with these IDs

## Usage

### Basic Ad Placement

```tsx
import AdSense from '@/components/AdSense';

export default function MyPage() {
  return (
    <div>
      <h1>My Content</h1>
      
      {/* Display Ad */}
      <AdSense adSlot="1234567890" />
      
      {/* In-feed Ad */}
      <AdSense 
        adSlot="1234567890" 
        adFormat="fluid" 
      />
      
      {/* Custom styling */}
      <AdSense 
        adSlot="1234567890"
        style={{ marginTop: '20px', marginBottom: '20px' }}
        className="my-custom-class"
      />
    </div>
  );
}
```

### Getting Ad Slot IDs

1. In your AdSense account, create ad units
2. Each ad unit will have a unique slot ID
3. Use these slot IDs in the `adSlot` prop

### Ad Formats

- `auto` - Responsive ads that adapt to available space
- `fluid` - In-feed or in-article ads
- `rectangle` - Fixed size rectangular ads

## Example Placements

### Between Content Sections
```tsx
<AdSense adSlot="1234567890" style={{ margin: '2rem 0' }} />
```

### Sidebar
```tsx
<aside className="sidebar">
  <AdSense adSlot="9876543210" />
</aside>
```

### After Header
```tsx
<header>...</header>
<AdSense adSlot="1122334455" />
<main>...</main>
```

## Important Notes

- Ads may not display immediately in development mode
- Google needs to approve your site before ads show
- Don't click your own ads (violates AdSense policy)
- Respect AdSense ad placement policies (max ads per page, etc.)
