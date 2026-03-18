# AdSense Integration Guide for 205 Tools

This guide provides step-by-step instructions for integrating Google AdSense into the 205 Tools website.

---

## 1. Where to Place Ad Codes in HTML

### Ad Placement Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    TOP BANNER (728x90)                  │  ← Above fold, high visibility
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐                                       │
│  │   SIDEBAR    │     MAIN TOOL CONTENT                 │
│  │  (300x250)   │                                       │
│  │              │     [Tool Interface]                  │
│  ├──────────────┤                                       │
│  │   SIDEBAR    │                                       │
│  │  (300x250)   │                                       │
│  └──────────────┘                                       │
│                                                         │
│     IN-CONTENT AD (Responsive)  ← Between sections     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                  BOTTOM BANNER (728x90)                 │  ← End of page
└─────────────────────────────────────────────────────────┘
```

### Specific HTML Locations

#### 1.1 Top Banner Ad
**Location:** Immediately after `<body>` tag, before main content

```html
<body>
  <!-- Top Banner Ad -->
  <div class="ad-container ad-top">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
  </div>
  
  <div class="container">
    <!-- Main content starts here -->
```

#### 1.2 Sidebar Ad
**Location:** Inside a sidebar container, alongside tool content

```html
<div class="tool-layout">
  <div class="tool-main">
    <!-- Tool interface -->
  </div>
  
  <aside class="tool-sidebar">
    <!-- Sidebar Ad -->
    <div class="ad-container ad-sidebar">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="rectangle"
           data-full-width-responsive="false"></ins>
    </div>
    
    <!-- Other sidebar content -->
  </aside>
</div>
```

#### 1.3 In-Content Ad
**Location:** Between tool sections or after initial interaction

```html
<div class="tool-section">
  <!-- Input area -->
</div>

<!-- In-Content Ad -->
<div class="ad-container ad-in-content">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
</div>

<div class="tool-section">
  <!-- Output area -->
</div>
```

#### 1.4 Bottom Banner Ad
**Location:** Before footer, after main content

```html
<!-- Bottom Banner Ad -->
<div class="ad-container ad-bottom">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="horizontal"
       data-full-width-responsive="true"></ins>
</div>

<footer>
  <!-- Footer content -->
</footer>
```

---

## 2. Ad Types Recommended for Tools Site

### Display Ads (Recommended)
| Size | Placement | Best For |
|------|-----------|----------|
| **728x90** | Top/Bottom banner | Desktop visibility |
| **300x250** | Sidebar | Balanced performance |
| **336x280** | In-content | Higher CTR |
| **320x100** | Mobile banner | Mobile users |
| **Responsive** | Any position | Auto-optimization |

### Ad Formats to Use

```javascript
// Priority order for tools site:
const adFormats = {
  display: "Standard display ads - Best for tools",
  inArticle: "For blog posts and long content",
  inFeed: "For lists and tool directories",
  multiplex: "Related ads - Good for recommendations"
};
```

### Why These Formats Work for Tools Sites

1. **Display Ads**: Users spend time using tools = more ad exposure
2. **Responsive Ads**: Automatically adapt to all device sizes
3. **Horizontal Banners**: Natural fit above/below tool interfaces
4. **Rectangle Ads**: Fit well in sidebars next to tool panels

---

## 3. Sample Ad Code

### 3.1 Top Banner (728x90)

```html
<!-- 205 Tools - Top Banner Ad -->
<div class="ad-container ad-top" aria-label="Advertisement">
  <div class="ad-label">Advertisement</div>
  <ins class="adsbygoogle"
       style="display:inline-block;width:728px;height:90px"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

**CSS Styling:**
```css
.ad-top {
  text-align: center;
  margin: 20px auto;
  max-width: 728px;
  min-height: 90px;
}

@media (max-width: 748px) {
  .ad-top {
    display: none; /* Hide on mobile, use responsive ad instead */
  }
}
```

---

### 3.2 Sidebar (300x250)

```html
<!-- 205 Tools - Sidebar Ad -->
<div class="ad-container ad-sidebar" aria-label="Advertisement">
  <div class="ad-label">Advertisement</div>
  <ins class="adsbygoogle"
       style="display:inline-block;width:300px;height:250px"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

**CSS Styling:**
```css
.ad-sidebar {
  text-align: center;
  margin-bottom: 20px;
}

.ad-sidebar ins {
  display: inline-block;
  width: 300px;
  height: 250px;
}

@media (max-width: 1024px) {
  .ad-sidebar {
    display: none; /* Hide sidebar on mobile/tablet */
  }
}
```

---

### 3.3 In-Content (Responsive)

```html
<!-- 205 Tools - In-Content Responsive Ad -->
<div class="ad-container ad-in-content" aria-label="Advertisement">
  <div class="ad-label">Advertisement</div>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

**CSS Styling:**
```css
.ad-in-content {
  text-align: center;
  margin: 30px auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  max-width: 100%;
}

.ad-in-content ins {
  display: block;
  min-height: 100px;
}
```

---

### 3.4 Bottom Banner (728x90)

```html
<!-- 205 Tools - Bottom Banner Ad -->
<div class="ad-container ad-bottom" aria-label="Advertisement">
  <div class="ad-label">Advertisement</div>
  <ins class="adsbygoogle"
       style="display:inline-block;width:728px;height:90px"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

**CSS Styling:**
```css
.ad-bottom {
  text-align: center;
  margin: 40px auto 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  max-width: 728px;
}

@media (max-width: 748px) {
  .ad-bottom ins {
    width: 320px;
    height: 100px;
  }
}
```

---

### Complete CSS for All Ad Containers

```css
/* ============================================
   ADSENSE AD CONTAINER STYLES
   ============================================ */

/* Base ad container */
.ad-container {
  position: relative;
  text-align: center;
  overflow: hidden;
}

/* Ad label */
.ad-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  text-align: center;
}

/* Prevent layout shift */
.ad-container ins {
  display: block;
  background: transparent;
}

/* Top banner styles */
.ad-top {
  margin: 20px auto;
  max-width: 728px;
}

.ad-top ins {
  min-height: 90px;
}

/* Sidebar styles */
.ad-sidebar {
  margin-bottom: 20px;
}

.ad-sidebar ins {
  min-height: 250px;
}

/* In-content styles */
.ad-in-content {
  margin: 30px auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.ad-in-content ins {
  min-height: 100px;
}

/* Bottom banner styles */
.ad-bottom {
  margin: 40px auto 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  max-width: 728px;
}

.ad-bottom ins {
  min-height: 90px;
}

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

/* Tablet and below - Hide fixed-size banners */
@media (max-width: 748px) {
  .ad-top,
  .ad-bottom {
    max-width: 100%;
  }
  
  .ad-top ins,
  .ad-bottom ins {
    width: 100% !important;
    height: auto !important;
    min-height: 100px;
  }
}

/* Mobile - Simplify layout */
@media (max-width: 480px) {
  .ad-container {
    margin-left: -15px;
    margin-right: -15px;
  }
  
  .ad-in-content {
    border-radius: 0;
    padding: 10px;
  }
}

/* Hide sidebar ads on smaller screens */
@media (max-width: 1024px) {
  .tool-sidebar .ad-sidebar {
    display: none;
  }
}

/* ============================================
   RTL SUPPORT
   ============================================ */

[dir="rtl"] .ad-container {
  direction: ltr; /* Keep ads LTR even in RTL pages */
}

/* ============================================
   ACCESSIBILITY
   ============================================ */

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .ad-container ins {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .ad-label {
    color: #fff;
    font-weight: bold;
  }
}
```

---

## 4. AdSense Policies Compliance Checklist

### ✅ Content Policies

- [ ] **Original Content**: All tools provide genuine value, not scraped content
- [ ] **No Prohibited Content**: No hacking, cracking, or illegal tool content
- [ ] **Family Safe**: All content appropriate for general audiences
- [ ] **No Misleading**: Tool descriptions match actual functionality
- [ ] **Accurate Results**: Calculators and converters produce correct results

### ✅ Placement Policies

- [ ] **No Accidental Clicks**: Ads not placed near interactive elements
- [ ] **No Obscuring Content**: Ads don't cover tool interfaces
- [ ] **Limited Ad Count**: Maximum 3 ads per page (AdSense limit for content sites)
- [ ] **Above Fold**: At least one ad visible without scrolling
- [ ] **No Floating/Sticky**: Unless using approved sticky ad units

### ✅ Technical Policies

- [ ] **No Ad Modification**: Ad code used as provided by AdSense
- [ ] **No Iframes**: Ads not placed in iframes (against policy)
- [ ] **Valid HTML**: No broken tags around ad code
- [ ] **No Click Incentives**: No text saying "click ads" or similar
- [ ] **Page Speed**: Ads don't significantly slow down tool loading

### ✅ Traffic Policies

- [ ] **No Paid Traffic**: All traffic organic or legitimate referral
- [ ] **No Incentivized Traffic**: No rewards for visiting pages
- [ ] **No Auto-refresh**: Pages don't auto-refresh to generate impressions
- [ ] **Valid Clicks**: No encouraging accidental or fraudulent clicks

### ✅ Privacy & Legal

- [ ] **Privacy Policy**: Page includes privacy policy mentioning AdSense
- [ ] **Cookie Consent**: EU/UK users see cookie consent for personalized ads
- [ ] **Terms of Service**: Site has clear terms of service
- [ ] **Contact Info**: Valid contact information available

### Prohibited Content Check (205 Tools)

| Category | Status | Notes |
|----------|--------|-------|
| Hacking/Cracking Tools | ✅ Clear | None present |
| Malware Distribution | ✅ Clear | None present |
| Drug/Alcohol Tools | ✅ Clear | None present |
| Gambling Calculators | ✅ Clear | Age calculator is not gambling-related |
| Weapons Content | ✅ Clear | None present |
| Adult Content | ✅ Clear | None present |
| Copyright Violation | ✅ Clear | All content original |

---

## 5. Best Practices for Tool Sites

### 5.1 User Experience First

```
Priority Order:
1. Tool Functionality → Must work perfectly
2. Page Speed → Tools load fast
3. Clean Interface → No clutter
4. Ads → Supplement, not interrupt
```

**Guidelines:**
- Never place ads where they interfere with tool usage
- Keep at least 60px padding between ads and interactive elements
- Don't show popups/popunders alongside AdSense

### 5.2 Ad Density

| Page Type | Recommended Ad Count |
|-----------|---------------------|
| Simple tool (1 input) | 2 ads (top + bottom) |
| Complex tool (multiple sections) | 3 ads (top + sidebar + bottom) |
| Homepage/Directory | 3 ads strategically placed |
| About/Policy pages | 0-1 ad maximum |

### 5.3 Loading Strategy

```html
<!-- Load AdSense script once in <head> -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

**Performance Tips:**
1. Use `async` loading (shown above)
2. Place ad code where ads should appear
3. Don't use `setTimeout` to delay ad loading
4. Use `data-ad-format="auto"` for responsive sizing

### 5.4 Mobile Optimization

```css
/* Mobile-first ad approach */
.ad-container {
  /* Mobile styles first */
  width: 100%;
  margin: 15px 0;
}

/* Desktop enhancement */
@media (min-width: 749px) {
  .ad-top,
  .ad-bottom {
    max-width: 728px;
  }
}
```

**Mobile Guidelines:**
- Use responsive ads for mobile
- Avoid 728x90 on screens < 748px wide
- Test ads on actual devices, not just emulator

### 5.5 A/B Testing Ad Placements

```javascript
// Simple A/B test for ad positions
function getAdVariation() {
  const variations = ['top-only', 'top-sidebar', 'top-bottom'];
  const userVariation = localStorage.getItem('adVariation');
  
  if (userVariation) return userVariation;
  
  const newVariation = variations[Math.floor(Math.random() * variations.length)];
  localStorage.setItem('adVariation', newVariation);
  return newVariation;
}
```

### 5.6 Monitoring & Analytics

**Track These Metrics:**
- Page RPM (Revenue per 1000 impressions)
- CTR by placement
- Viewability rate
- Core Web Vitals impact

**Tools:**
- Google AdSense Dashboard
- Google Analytics 4
- PageSpeed Insights
- Search Console

### 5.7 Ad Blocking Strategy

**Don't:**
- Block content for ad blocker users
- Show aggressive anti-adblock messages
- Break functionality without ads

**Do:**
- Request politely: "Support us by whitelisting"
- Offer premium ad-free option if applicable
- Focus on ad-friendly user experience

---

## Quick Reference Card

```
┌────────────────────────────────────────────────────────┐
│                    AD INTEGRATION                      │
├────────────────────────────────────────────────────────┤
│ 1. Add script to <head>:                               │
│    <script async src="adsbygoogle.js">                 │
│                                                        │
│ 2. Replace ca-pub-XXXXXXXXXXXXXXXX with your ID        │
│                                                        │
│ 3. Place ad containers in HTML                         │
│                                                        │
│ 4. Add CSS for responsive behavior                     │
│                                                        │
│ 5. Test on desktop & mobile                            │
│                                                        │
│ 6. Monitor performance in AdSense dashboard            │
└────────────────────────────────────────────────────────┘
```

---

## Support & Resources

- **AdSense Help**: https://support.google.com/adsense
- **Policy Center**: Check your AdSense account
- **PageSpeed**: https://pagespeed.web.dev
- **Demo Page**: See `/tools/en/ads-demo.html` for live example

---

*Last Updated: March 2026*
*For 205 Tools Hub - https://205-tools.example.com*
