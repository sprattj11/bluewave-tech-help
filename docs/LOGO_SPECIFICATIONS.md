# Logo & Favicon Specifications Guide

## BlueWave Tech Help Brand Colors

Your primary brand colors (from your design system):

- **Primary Blue**: `#007BFF` - Main brand color
- **Dark Blue**: `#0056B3` - Darker shade for hover/active states
- **Darker Blue**: `#004395` - Even darker shade
- **Light Blue**: `#5FB4FF` - Light accent
- **Accent**: `#E5F0FF` - Very light background
- **White**: `#FFFFFF` - Text on blue backgrounds
- **Gray**: `#F3F4F6` - Background gray

## Favicon Specifications

### Required Sizes
Create your favicon in these sizes:

1. **16x16 pixels** - Browser tab (minimum)
2. **32x32 pixels** - Browser tab (recommended)
3. **48x48 pixels** - Bookmarks
4. **64x64 pixels** - Current size in use
5. **180x180 pixels** - Apple Touch Icon (iOS)
6. **192x192 pixels** - Android Chrome
7. **512x512 pixels** - Android Chrome (high-res)

### File Formats

**Best Practice:**
- **SVG** (recommended) - Scalable, looks great at any size
  - Current file: `/frontend/public/favicon.svg`
- **PNG** - Good fallback, multiple sizes needed
- **ICO** - Traditional format, can contain multiple sizes

### Color Recommendations for Favicon

- **Simple is better** - Favicons are small, use bold, simple designs
- **High contrast** - Ensure visibility on white browser tabs
- **Single color** - Or max 2-3 colors
- **Background options:**
  - Blue background (`#007BFF`) with white icon
  - White/transparent background with blue icon
  - Square with rounded corners (8-12px radius)

### Current Favicon Location
```
/frontend/public/favicon.svg
```

Update `frontend/index.html` to use your new favicon:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<!-- Or for PNG/ICO: -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Main Logo Specifications

### Sizes Needed

1. **Navigation Logo** (small)
   - **Width**: 40-60px
   - **Height**: 40px
   - **Format**: SVG or PNG (transparent background)
   - **Location**: Next to "BlueWave Tech Help" text in navigation

2. **Hero Logo** (medium)
   - **Width**: 80-120px
   - **Height**: 80-120px
   - **Format**: SVG (recommended)
   - **Location**: Home page hero section

3. **Large Logo** (for About page, email headers, etc.)
   - **Width**: 200-300px
   - **Height**: Auto (maintain aspect ratio)
   - **Format**: SVG or PNG
   - **Location**: Various pages as needed

### Logo Design Guidelines

**Colors to Use:**
- Primary: Blue (`#007BFF`)
- Secondary: White (for backgrounds) or Dark Blue (`#0056B3`)
- Accent: Light Blue (`#5FB4FF`) for highlights

**Design Elements:**
- **Wave motif** - Matches "BlueWave" name
- **Tech element** - Computer, device, or tech icon
- **Text** - Can include "BlueWave Tech Help" or just "BlueWave"
- **Simple & Scalable** - Should work from favicon size to large banners

### Logo Variations Needed

1. **Full Logo** - Logo + text horizontal
2. **Icon Only** - Just the symbol/icon (for favicon, small spaces)
3. **Vertical** - Logo stacked with text (if needed)
4. **Monochrome** - Single color version (for email signatures, etc.)

### File Naming Convention

```
logo-full.svg          - Full logo with text
logo-icon.svg          - Icon/symbol only
logo-full-white.svg    - White version (for dark backgrounds)
favicon.svg            - Favicon (64x64 or scalable)
```

## Logo Placement in Code

### Navigation Logo
File: `frontend/src/components/Navigation.tsx`
```tsx
<img src="/logo-icon.svg" alt="BlueWave Tech Help" className="h-10 w-10" />
```

### Home Page Logo
File: `frontend/src/pages/Home.tsx`
```tsx
<img src="/logo-icon.svg" alt="BlueWave Tech Help" className="w-20 h-20 mx-auto mb-6" />
```

## Design Recommendations

### Simple Logo Ideas

1. **Wave + Computer Icon**
   - Blue wave pattern
   - Computer/device icon integrated
   - Clean, modern look

2. **Wave Pattern Only**
   - Stylized wave(s) in BlueWave blue
   - Simple, memorable
   - Works great at small sizes

3. **B with Wave**
   - Letter "B" for BlueWave
   - Wave integrated into the letter
   - Text-based but distinctive

### Tools for Creating Logos

**Free Options:**
- **Canva** - Easy logo maker, templates
- **Figma** - Professional design tool (free tier)
- **Inkscape** - Free vector graphics editor
- **GIMP** - Free image editor

**Paid Options:**
- **Adobe Illustrator** - Professional vector design
- **Affinity Designer** - One-time purchase, professional tool

## Creating SVG Favicon

If creating your own SVG favicon, here's the template structure:

```svg
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Your logo design here -->
  <!-- Use viewBox="0 0 64 64" for scalable design -->
  <!-- Colors: #007BFF for blue, #FFFFFF for white -->
</svg>
```

## Logo File Locations

Place your logo files in:
```
/frontend/public/
  ├── favicon.svg          (or favicon.ico, favicon.png)
  ├── logo-icon.svg        (icon only, for navigation)
  ├── logo-full.svg        (full logo with text)
  └── apple-touch-icon.png (180x180 for iOS)
```

## Quick Reference

### Favicon
- **Size**: 64x64 (SVG) or multiple PNG sizes
- **Colors**: `#007BFF` (blue) and `#FFFFFF` (white)
- **Background**: Blue square with rounded corners OR transparent
- **Location**: `/frontend/public/favicon.svg`

### Navigation Logo
- **Size**: 40-60px width, 40px height
- **Format**: SVG (preferred) or PNG with transparency
- **Style**: Icon only (no text, text is separate)
- **Location**: `/frontend/public/logo-icon.svg`

### Hero Logo
- **Size**: 80-120px square
- **Format**: SVG
- **Style**: Can include text or be icon only
- **Location**: `/frontend/public/logo-icon.svg` or new file

## Testing Your Logo

1. **Favicon Testing:**
   - Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
   - Check browser tab icon
   - Check bookmarks icon
   - Test on mobile devices

2. **Logo Testing:**
   - Check on desktop (full size)
   - Check on mobile (responsive sizes)
   - Check on different backgrounds (white, blue, gray)
   - Verify contrast and readability

## Brand Guidelines Summary

**Primary Color**: `#007BFF` (BlueWave Blue)
**Text Color**: `#FFFFFF` (White) on blue backgrounds
**Background**: `#F3F4F6` (Light gray) or `#FFFFFF` (White)
**Accent**: `#E5F0FF` (Very light blue) for highlights

**Keep it:**
- ✅ Simple and recognizable at small sizes
- ✅ High contrast for visibility
- ✅ Consistent with BlueWave brand
- ✅ Scalable (vector format recommended)

