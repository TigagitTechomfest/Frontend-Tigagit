# 🎨 Design System - Health & Digital Nutrition

## 1. Color Palette

### Primary Colors
- **Primary Blue**: `#3B82F6` (blue-500) - CTA buttons, links, active states
- **Primary Dark**: `#2563EB` (blue-600) - Hover states, emphasis
- **Primary Light**: `#DBEAFE` (blue-100) - Backgrounds, subtle highlights

### Secondary Colors
- **Success Green**: `#10B981` (green-500) - Success messages, positive metrics
- **Warning Yellow**: `#F59E0B` (amber-500) - Warnings, attention needed
- **Danger Red**: `#EF4444` (red-500) - Errors, delete actions
- **Info Cyan**: `#06B6D4` (cyan-500) - Information, neutral actions

### Neutral Colors
- **Gray Scale**:
  - `#F9FAFB` (gray-50) - Backgrounds
  - `#F3F4F6` (gray-100) - Card backgrounds
  - `#E5E7EB` (gray-200) - Borders
  - `#9CA3AF` (gray-400) - Placeholder text
  - `#6B7280` (gray-500) - Secondary text
  - `#374151` (gray-700) - Primary text
  - `#111827` (gray-900) - Headings

### Semantic Colors
- **Calories**: `#3B82F6` (Blue)
- **Protein**: `#10B981` (Green)
- **Carbs**: `#F59E0B` (Amber)
- **Fat**: `#EF4444` (Red)

## 2. Typography Scale

### Font Family
- **Primary**: `Inter, system-ui, -apple-system, sans-serif`
- **Monospace**: `'Courier New', monospace` (untuk angka/metrics)

### Type Scale
```
H1: 2.5rem (40px) - font-bold - Page titles
H2: 2rem (32px) - font-bold - Section titles
H3: 1.5rem (24px) - font-semibold - Card titles
H4: 1.25rem (20px) - font-semibold - Subsection titles
Body Large: 1.125rem (18px) - font-normal - Important body text
Body: 1rem (16px) - font-normal - Default body text
Body Small: 0.875rem (14px) - font-normal - Secondary text
Caption: 0.75rem (12px) - font-normal - Labels, hints
```

### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## 3. Spacing System

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Component Spacing
- **Card Padding**: `p-6` (24px)
- **Section Gap**: `gap-6` (24px)
- **Form Input Gap**: `gap-4` (16px)
- **Button Padding**: `px-6 py-3` (24px horizontal, 12px vertical)

## 4. Component Specifications

### Buttons

#### Primary Button
```css
- Background: #3B82F6 (blue-500)
- Text: White
- Padding: px-6 py-3
- Border Radius: 0.5rem (8px)
- Font: Medium, 16px
- Hover: #2563EB (blue-600)
- Disabled: opacity-50
```

#### Secondary Button
```css
- Background: #F3F4F6 (gray-100)
- Text: #374151 (gray-700)
- Border: None
- Hover: #E5E7EB (gray-200)
```

#### Outline Button
```css
- Background: Transparent
- Border: 2px solid #3B82F6
- Text: #3B82F6
- Hover: #DBEAFE (blue-100) background
```

#### Danger Button
```css
- Background: #EF4444 (red-500)
- Text: White
- Hover: #DC2626 (red-600)
```

### Cards

#### Standard Card
```css
- Background: White
- Border Radius: 0.75rem (12px)
- Shadow: shadow-md (0 4px 6px rgba(0,0,0,0.1))
- Padding: p-6
- Border: None
```

#### Elevated Card (for emphasis)
```css
- Shadow: shadow-lg (0 10px 15px rgba(0,0,0,0.1))
- Hover: shadow-xl transition
```

### Input Fields

#### Standard Input
```css
- Border: 1px solid #E5E7EB (gray-200)
- Border Radius: 0.5rem (8px)
- Padding: px-4 py-2
- Focus: ring-2 ring-blue-500, border-blue-500
- Error: border-red-500, ring-red-500
```

### Navigation

#### Navbar
```css
- Height: 64px (h-16)
- Background: #2563EB (blue-600)
- Text: White
- Shadow: shadow-lg
- Sticky: top-0 z-50
```

## 5. Layout System

### Grid System
- **Container Max Width**: 1280px (max-w-7xl)
- **Grid Columns**: 12-column system
- **Breakpoints**:
  - Mobile: < 640px (sm)
  - Tablet: 640px - 1024px (md-lg)
  - Desktop: > 1024px (xl)

### Container Padding
- **Mobile**: `px-4` (16px)
- **Tablet**: `px-6` (24px)
- **Desktop**: `px-8` (32px)

## 6. Iconography

### Icon Library
- **Primary**: Heroicons (outline style)
- **Size Scale**: 
  - Small: 16px (w-4 h-4)
  - Medium: 20px (w-5 h-5)
  - Large: 24px (w-6 h-6)
  - XLarge: 32px (w-8 h-8)

### Icon Usage
- **Navigation**: 20px
- **Actions**: 20px
- **Metrics**: 24px
- **Decorative**: 32px+

## 7. Animation & Transitions

### Standard Transitions
```css
- Duration: 200ms (transition-all duration-200)
- Easing: ease-in-out
```

### Hover Effects
- **Buttons**: Background color change, slight scale (scale-105)
- **Cards**: Shadow elevation (shadow-md → shadow-lg)
- **Links**: Underline or color change

## 8. Accessibility

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio
- **Text on Colored Background**: Minimum 4.5:1 ratio
- **Interactive Elements**: Clear focus states

### Focus States
- **Outline**: 2px solid blue-500
- **Offset**: 2px from element

## 9. Responsive Breakpoints

```
sm: 640px   - Mobile landscape, small tablets
md: 768px   - Tablets
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Extra large desktop
```

## 10. Component Variants

### Card Variants
- **Default**: White background, shadow-md
- **Highlighted**: Blue-50 background, border-blue-200
- **Metric**: Colored background (blue/green/amber/red)

### Button Variants
- **Primary**: Blue solid
- **Secondary**: Gray solid
- **Outline**: Blue outline
- **Danger**: Red solid
- **Success**: Green solid
- **Ghost**: Transparent with hover

### Input Variants
- **Default**: Standard input
- **Search**: With search icon
- **With Label**: Label above
- **Inline**: Label on left
- **Error**: Red border and message


