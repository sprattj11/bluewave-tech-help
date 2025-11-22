# Quick Mobile Testing Guide

## Fastest Way: Browser DevTools

1. **Open your site** in Chrome: `http://localhost:5173`
2. **Press `F12`** (or `Cmd+Option+I` on Mac) to open DevTools
3. **Press `Ctrl+Shift+M`** (or `Cmd+Shift+M` on Mac) to toggle device mode
4. **Select a device** from the dropdown (iPhone 13, Galaxy S20, etc.)
5. **Test your site!**

### Key Things to Test:
- ✅ Click the hamburger menu (☰) - does it open?
- ✅ Tap the "Book Now" button - easy to tap?
- ✅ Go through the booking form - can you fill it out?
- ✅ Scroll through pages - everything fits on screen?
- ✅ Try rotating device (portrait ↔ landscape)

## Test on Your Phone

### 1. Start dev server with network access:
```bash
cd frontend
npm run dev -- --host
```

### 2. Find your computer's IP address:

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (usually something like `192.168.1.xxx`)

### 3. Access from your phone:
- Make sure phone is on the **same WiFi** as your computer
- Open browser on phone
- Go to: `http://[your-ip-address]:5173`
- Example: `http://192.168.1.100:5173`

### 4. Test:
- Navigation menu
- Booking form
- Touch interactions
- Performance

## What to Look For

✅ **Good:**
- Text is readable (not tiny)
- Buttons are easy to tap (not too small)
- Menu works smoothly
- Forms are usable
- Everything fits on screen

❌ **Bad:**
- Text too small to read
- Buttons too close together
- Menu doesn't work
- Content spills off screen
- Page zooms when clicking input fields

## Quick Fixes if You See Issues

**Text too small?** - Increase font sizes in your CSS
**Buttons too small?** - Increase padding/min-height (should be 44px+)
**Page zooms on input?** - Make sure input font-size is at least 16px
**Horizontal scroll?** - Check for elements wider than viewport

