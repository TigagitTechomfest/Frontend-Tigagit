# 🎨 Landing Page Design - Health & Digital Nutrition

## 1. Color Palette - Health & Wellness Theme

### Primary Colors
- **Soft Mint**: `#A8E6CF` - Primary background, accents
- **Turquoise**: `#4ECDC4` - CTAs, highlights
- **Soft Green**: `#95E1D3` - Secondary elements
- **Ocean Blue**: `#5F9EA0` - Headings, emphasis

### Secondary Colors
- **Peach**: `#FFD3A5` - Warm accents, highlights
- **Soft Yellow**: `#FFEAA7` - Positive indicators
- **Lavender**: `#C7CEEA` - Subtle backgrounds

### Neutral Colors
- **Pure White**: `#FFFFFF` - Cards, backgrounds
- **Soft Grey**: `#F5F7FA` - Section backgrounds
- **Medium Grey**: `#8E9AAF` - Secondary text
- **Dark Grey**: `#2D3748` - Primary text
- **Charcoal**: `#1A202C` - Headings

### Semantic Colors
- **Success**: `#48BB78` (Green)
- **Info**: `#4299E1` (Blue)
- **Warning**: `#F6AD55` (Orange)
- **Error**: `#F56565` (Red)

## 2. Typography Scale

### Font Family
- **Primary**: `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`
- **Headings**: `'Plus Jakarta Sans', sans-serif` (Bold)
- **Body**: `'Inter', system-ui, sans-serif` (Regular/Medium)

### Type Scale
```
H1 (Hero): 64px / 72px line-height - font-bold (800)
H2 (Section): 48px / 56px line-height - font-bold (700)
H3 (Subsection): 36px / 44px line-height - font-semibold (600)
H4 (Card Title): 24px / 32px line-height - font-semibold (600)
Body Large: 20px / 30px line-height - font-normal (400)
Body: 18px / 28px line-height - font-normal (400)
Body Small: 16px / 24px line-height - font-normal (400)
Caption: 14px / 20px line-height - font-normal (400)
```

## 3. Layout Structure

### Container
- **Max Width**: 1200px (max-w-6xl)
- **Padding**: 
  - Mobile: 24px (px-6)
  - Desktop: 40px (px-10)

### Section Spacing
- **Between Sections**: 120px (py-30)
- **Within Section**: 80px (py-20)
- **Element Gap**: 40px (gap-10)

### Grid System
- **12-column grid** untuk layout kompleks
- **Responsive breakpoints**:
  - Mobile: < 768px (1 column)
  - Tablet: 768px - 1024px (2 columns)
  - Desktop: > 1024px (3-4 columns)

## 4. Component Specifications

### Navbar
- **Style**: Transparent dengan blur effect (backdrop-blur-md)
- **Background**: rgba(255, 255, 255, 0.8) dengan blur
- **Height**: 80px
- **Position**: Fixed, sticky top
- **Logo**: Left side, 40px height
- **Menu**: Center (desktop) / Hamburger (mobile)
- **CTA**: Right side - "Masuk" button

### Hero Section
- **Background**: Gradient dari soft mint ke turquoise
- **Height**: 100vh (min-height)
- **Layout**: 2-column (text left, image right)
- **Headline**: 64px, bold, dark grey
- **Subheadline**: 24px, medium grey, 600px max-width
- **CTAs**: 
  - Primary: "Mulai Sekarang" (turquoise, white text)
  - Secondary: "Masuk" (outline, turquoise border)
- **Illustration**: Dashboard mockup atau health illustration

### Feature Cards
- **Layout**: 3-column grid (desktop), 1-column (mobile)
- **Card Style**:
  - Background: White
  - Border Radius: 24px
  - Shadow: 0 10px 40px rgba(0,0,0,0.08)
  - Padding: 40px
  - Hover: Scale 1.02, shadow increase
- **Icon**: 64px, centered, colored (turquoise/mint)
- **Title**: 24px, semibold, dark grey
- **Description**: 18px, medium grey, line-height 28px

### Why Choose Us Section
- **Background**: Soft grey (#F5F7FA)
- **Layout**: 2-column (text left, stats right)
- **Stats Cards**: 
  - Large numbers (48px)
  - Labels (16px)
  - Colored backgrounds (mint/turquoise)

### Dashboard Preview Section
- **Background**: White dengan subtle pattern
- **Mockup**: Screenshot atau illustration dashboard
- **Overlay**: Gradient dari transparent ke white
- **Features Highlight**: Floating labels dengan arrows

### Testimonial Section
- **Layout**: 3-column grid
- **Card Style**: 
  - White background
  - Rounded 20px
  - Shadow soft
  - Avatar: 64px circle
  - Quote: 18px italic
  - Name: 20px semibold
  - Role: 16px medium grey

### CTA Final Section
- **Background**: Gradient turquoise to mint
- **Layout**: Centered, max-width 800px
- **Headline**: 48px, white, bold
- **Subheadline**: 24px, white, opacity 0.9
- **Button**: White background, turquoise text, large (px-8 py-4)

### Footer
- **Background**: Dark grey (#1A202C)
- **Layout**: 4-column grid
- **Sections**:
  - Logo & Description
  - Quick Links
  - Resources
  - Contact & Social
- **Social Icons**: 40px, colored on hover
- **Copyright**: Centered, bottom, 16px, medium grey

## 5. Button Styles

### Primary CTA
```css
- Background: #4ECDC4 (Turquoise)
- Text: White
- Padding: 16px 32px
- Border Radius: 12px
- Font: 18px, semibold
- Shadow: 0 4px 12px rgba(78, 205, 196, 0.3)
- Hover: Scale 1.05, shadow increase
```

### Secondary CTA
```css
- Background: Transparent
- Border: 2px solid #4ECDC4
- Text: #4ECDC4
- Padding: 16px 32px
- Border Radius: 12px
- Hover: Background #4ECDC4, text white
```

### Ghost Button
```css
- Background: Transparent
- Text: Dark grey
- Padding: 12px 24px
- Hover: Background rgba(78, 205, 196, 0.1)
```

## 6. Card Styles

### Feature Card
```css
- Background: White
- Border Radius: 24px
- Padding: 40px
- Shadow: 0 10px 40px rgba(0,0,0,0.08)
- Transition: All 0.3s ease
- Hover: Transform scale(1.02), shadow-lg
```

### Stat Card
```css
- Background: Gradient (mint to turquoise)
- Border Radius: 20px
- Padding: 32px
- Text: White
- Number: 48px, bold
- Label: 16px, opacity 0.9
```

### Testimonial Card
```css
- Background: White
- Border Radius: 20px
- Padding: 32px
- Shadow: 0 8px 24px rgba(0,0,0,0.06)
- Quote Icon: 32px, turquoise, opacity 0.3
```

## 7. Icon Style
- **Library**: Heroicons (outline) atau Feather Icons
- **Size**: 
  - Small: 20px
  - Medium: 24px
  - Large: 32px
  - XLarge: 48px (feature icons)
- **Color**: Turquoise (#4ECDC4) atau Mint (#A8E6CF)
- **Style**: Outline dengan stroke-width 2

## 8. Gradient Backgrounds

### Hero Gradient
```css
background: linear-gradient(135deg, #A8E6CF 0%, #4ECDC4 50%, #5F9EA0 100%);
```

### Section Gradient (Soft)
```css
background: linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%);
```

### CTA Gradient
```css
background: linear-gradient(135deg, #4ECDC4 0%, #A8E6CF 100%);
```

## 9. Animation & Interactions

### Scroll Animations
- **Fade In**: Elements fade in on scroll
- **Slide Up**: Cards slide up with delay
- **Scale**: Icons scale on hover

### Hover Effects
- **Cards**: Scale 1.02, shadow increase
- **Buttons**: Scale 1.05, color transition
- **Links**: Underline animation

### Transitions
- **Duration**: 0.3s ease
- **Properties**: All transform, opacity, shadow

## 10. Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Stacked sections
- Full-width buttons
- Reduced padding (24px)
- Smaller typography (H1: 40px)

### Tablet (768px - 1024px)
- 2-column grid where appropriate
- Medium padding (32px)
- Adjusted typography (H1: 56px)

### Desktop (> 1024px)
- 3-4 column grids
- Full padding (40px)
- Full typography scale
- Side-by-side layouts

## 11. Wireframe Textual

```
┌─────────────────────────────────────────────────────────┐
│ [Navbar: Transparent, Blur]                             │
│ Logo | Menu | Masuk                                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ HERO SECTION (100vh)                                     │
│ ┌──────────────────────┐ ┌──────────────────────┐      │
│ │                      │ │                      │      │
│ │  Headline (64px)     │ │  [Dashboard Mockup] │      │
│ │  "Kelola Kesehatan"  │ │  atau Illustration   │      │
│ │                      │ │                      │      │
│ │  Subheadline (24px)  │ │                      │      │
│ │  Deskripsi singkat   │ │                      │      │
│ │                      │ │                      │      │
│ │  [Mulai Sekarang]    │ │                      │      │
│ │  [Masuk]             │ │                      │      │
│ └──────────────────────┘ └──────────────────────┘      │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ FEATURES SECTION (py-30)                                 │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│ │ [Icon]   │ │ [Icon]   │ │ [Icon]   │                │
│ │ Title    │ │ Title    │ │ Title    │                │
│ │ Desc     │ │ Desc     │ │ Desc     │                │
│ └──────────┘ └──────────┘ └──────────┘                │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ WHY CHOOSE US (bg-grey)                                  │
│ ┌──────────────────┐ ┌──────────────────┐             │
│ │ Headline         │ │ [Stat Cards]     │             │
│ │ Reasons list     │ │ 100K+ Users      │             │
│ │                  │ │ 4.8 Rating       │             │
│ │                  │ │ 24/7 Support     │             │
│ └──────────────────┘ └──────────────────┘             │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ DASHBOARD PREVIEW                                        │
│ ┌──────────────────────────────────────────────┐       │
│ │ [Dashboard Screenshot/Mockup]                │       │
│ │ With floating feature highlights              │       │
│ └──────────────────────────────────────────────┘       │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ TESTIMONIALS (3 cards)                                   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│ │ Avatar   │ │ Avatar   │ │ Avatar   │                │
│ │ Quote    │ │ Quote    │ │ Quote    │                │
│ │ Name     │ │ Name     │ │ Name     │                │
│ └──────────┘ └──────────┘ └──────────┘                │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ CTA FINAL (Gradient bg)                                  │
│ ┌──────────────────────────────────────────────┐       │
│ │         Headline (48px, white)               │       │
│ │         Subheadline (24px, white)            │       │
│ │         [Mulai Sekarang - Large]             │       │
│ └──────────────────────────────────────────────┘       │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ FOOTER (Dark bg)                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│ │ Logo │ │Links │ │Resrc │ │Social│                   │
│ │ Desc │ │      │ │      │ │      │                   │
│ └──────┘ └──────┘ └──────┘ └──────┘                   │
│                    Copyright                             │
└─────────────────────────────────────────────────────────┘
```

## 12. Visual Mockup Description

### Hero Section
- **Left Side**: 
  - Large headline in dark grey (64px)
  - Subheadline in medium grey (24px)
  - Two CTA buttons side by side
  - Trust badges below (if any)
- **Right Side**:
  - Dashboard mockup dengan soft shadow
  - Atau health illustration dengan gradient overlay
  - Floating elements (charts, icons)

### Feature Section
- **6 Feature Cards** in 3x2 grid:
  1. 📊 Track Nutrition - "Pantau asupan nutrisi harian"
  2. 📈 View Progress - "Lihat perkembangan kesehatan"
  3. 🍎 Food Database - "Database makanan lengkap"
  4. 🎯 Set Goals - "Tetapkan target kesehatan"
  5. 📱 Mobile App - "Akses di mana saja"
  6. 🔒 Privacy First - "Data Anda aman"

### Why Choose Us
- **Left**: 
  - Headline "Mengapa Pilih Kami?"
  - 4-5 bullet points dengan icons
- **Right**:
  - 3 stat cards dengan gradient backgrounds
  - Large numbers, descriptive labels

### Dashboard Preview
- **Full-width mockup** dengan:
  - Overlay gradient
  - Floating callouts highlighting features
  - Smooth scroll animation

### Testimonials
- **3 user testimonials**:
  - Professional photos (or avatars)
  - Quote text in italic
  - Name and role
  - Star rating (optional)

## 13. Implementation Checklist

- [ ] Update color palette in CSS variables
- [ ] Create Hero component with gradient
- [ ] Create Feature cards component
- [ ] Create Why Choose Us section
- [ ] Create Dashboard preview section
- [ ] Create Testimonial cards
- [ ] Create CTA section
- [ ] Update Footer with new design
- [ ] Update Navbar with transparent/blur
- [ ] Add scroll animations
- [ ] Implement responsive breakpoints
- [ ] Add hover effects
- [ ] Test on all devices

## 14. Design Rationale

### Why Soft Colors?
- **Calming**: Soft greens and blues create a calming, health-focused atmosphere
- **Modern**: Mint and turquoise are trendy yet timeless
- **Accessible**: Good contrast ratios for readability
- **Professional**: Not too playful, maintains credibility

### Why Large Typography?
- **Hierarchy**: Clear visual hierarchy guides user attention
- **Readability**: Large text is easier to scan
- **Impact**: Creates strong first impression
- **Mobile**: Scales down appropriately

### Why Generous Spacing?
- **Breathing Room**: Prevents visual clutter
- **Focus**: Helps users focus on key elements
- **Premium Feel**: Spacious layouts feel more premium
- **Mobile**: Easier to tap and interact

### Why Card-Based Design?
- **Scannable**: Easy to scan and understand
- **Modern**: Current design trend
- **Flexible**: Easy to rearrange responsively
- **Consistent**: Creates visual consistency

