# Mobile Testing Guide

## Quick Testing Methods

### 1. Browser DevTools (Recommended for Development)

**Chrome/Edge:**
1. Open your site in Chrome
2. Press `F12` (Windows) or `Cmd+Option+I` (Mac) to open DevTools
3. Press `Cmd+Shift+M` (Mac) or `Ctrl+Shift+M` (Windows) to toggle device toolbar
4. Select device presets or create custom sizes

**Firefox:**
1. Press `F12` to open DevTools
2. Click the device icon in toolbar (or press `Cmd+Shift+M`)
3. Select device presets

**Safari:**
1. Enable Developer menu: Safari → Preferences → Advanced → Check "Show Develop menu"
2. Develop → Enter Responsive Design Mode (or `Cmd+Ctrl+R`)
3. Select device presets

**Test These Screen Sizes:**
- iPhone SE (375x667) - Smallest modern phone
- iPhone 13/14 (390x844) - Standard phone
- iPhone 14 Pro Max (430x932) - Large phone
- Samsung Galaxy S20 (360x800) - Android standard
- iPad (768x1024) - Tablet portrait
- iPad Pro (1024x1366) - Tablet landscape

### 2. Test on Physical Devices

**iPhone:**
- Connect iPhone to Mac via USB
- Safari → Develop → [Your iPhone] → Local site
- Or share local network IP: `http://[your-ip]:5173`

**Android:**
- Connect Android to computer
- Enable USB debugging
- Use Chrome DevTools → Remote debugging
- Or access via network: `http://[your-ip]:5173`

**Network Testing:**
1. Find your local IP:
   ```bash
   # Mac
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```
2. Make sure phone and computer are on same WiFi
3. Access site: `http://[your-ip]:5173`
4. Update Vite config if needed to allow external connections

### 3. Online Testing Tools

**Responsive Design Checkers:**
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/) - Paid but comprehensive
- [LambdaTest](https://www.lambdatest.com/) - Free tier available

**Mobile-Friendly Test:**
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- Checks if site is mobile-friendly according to Google standards

### 4. What to Test

**Navigation:**
- [ ] Hamburger menu opens/closes
- [ ] All nav links work on mobile
- [ ] Menu closes when link clicked
- [ ] "Book Now" button is easily tappable

**Home Page:**
- [ ] Text is readable (not too small)
- [ ] "Book Now" button is large enough to tap
- [ ] Layout doesn't break on small screens
- [ ] Images load properly

**Booking Form:**
- [ ] Calendar is usable on mobile
- [ ] Time slots are easy to tap (minimum 44px height)
- [ ] Form inputs are large enough
- [ ] Keyboard appears correctly on mobile
- [ ] Step indicator is visible
- [ ] Next/Back buttons work well
- [ ] Form doesn't zoom when focusing inputs (font-size: 16px helps)

**Contact/About/Services:**
- [ ] Text is readable
- [ ] Links are tappable (phone, email)
- [ ] Cards stack properly
- [ ] Images don't overflow

**Admin Pages:**
- [ ] Admin nav menu works on mobile
- [ ] Tables are scrollable horizontally
- [ ] Buttons are large enough
- [ ] Forms are usable

**Performance:**
- [ ] Page loads quickly on mobile data (3G/4G)
- [ ] Images are optimized
- [ ] No layout shifts while loading

### 5. Network Testing

**Test on Slow Connections:**
- Chrome DevTools → Network tab → Throttling
- Select "Slow 3G" or "Fast 3G"
- Test page load times

**Test Real Mobile Data:**
- Use phone's mobile data (not WiFi)
- Check loading times
- Test booking form submission

### 6. Touch Interaction Testing

**Test Touch Targets:**
- All buttons should be at least 44x44 pixels
- Links should have enough space around them
- No elements too close together (can't tap accurately)

**Test Gestures:**
- Swipe navigation (if implemented)
- Pinch to zoom (should work appropriately)
- Scroll behavior is smooth

### 7. Accessibility Testing

**VoiceOver (iOS):**
- Settings → Accessibility → VoiceOver
- Test navigation with voice
- All interactive elements should be accessible

**TalkBack (Android):**
- Settings → Accessibility → TalkBack
- Test navigation with voice

**Keyboard Navigation:**
- Tab through all interactive elements
- Focus indicators should be visible
- Logical tab order

## Quick Test Checklist

### Critical Mobile Issues to Check:
- [ ] Navigation menu works
- [ ] Text is readable (at least 16px base font size)
- [ ] Buttons are tappable (min 44px)
- [ ] Forms are usable
- [ ] No horizontal scrolling
- [ ] Phone/email links work (tap to call/email)
- [ ] Images scale properly
- [ ] Page loads on 3G connection

### Browser Compatibility:
Test in:
- Safari iOS (iPhone)
- Chrome Android
- Safari iOS (iPad)
- Chrome Desktop (mobile emulation)

## Common Mobile Issues to Watch For

1. **Text Too Small** - Minimum 16px base font size
2. **Touch Targets Too Small** - Minimum 44x44px
3. **Form Zoom** - Input font-size should be at least 16px to prevent auto-zoom
4. **Horizontal Scroll** - Content should fit viewport width
5. **Slow Loading** - Optimize images and assets
6. **Menu Not Working** - Test hamburger menu thoroughly
7. **Tables Breaking** - Admin tables should scroll horizontally

## Testing Commands

**Start dev server for network access:**
```bash
cd frontend
npm run dev -- --host
```

This allows other devices on your network to access the site.

Then access from phone: `http://[your-computer-ip]:5173`

## Reporting Issues

When testing, note:
- Device model and OS version
- Browser and version
- Screen size
- Issue description
- Steps to reproduce
- Screenshots if possible

