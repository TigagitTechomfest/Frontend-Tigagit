# 🎨 UI/UX Design Documentation - Health & Digital Nutrition

## 1. Visual Design Refinement

### Layout Principles
1. **Grid-Based Layout**: 12-column grid system untuk konsistensi
2. **Whitespace**: Generous spacing (minimal 16px antara elemen)
3. **Visual Hierarchy**: Size, weight, dan color untuk menunjukkan importance
4. **Card-Based Design**: Informasi dikelompokkan dalam cards yang jelas

### Spacing & Hierarchy
- **Section Spacing**: 48px (3xl) antara section utama
- **Card Spacing**: 24px (lg) antara cards dalam grid
- **Element Spacing**: 16px (md) antara elemen terkait
- **Form Spacing**: 24px (lg) antara form groups

### Typography Hierarchy
```
Page Title (H1): 40px, Bold, Gray-900
Section Title (H2): 32px, Bold, Gray-800
Card Title (H3): 24px, Semibold, Gray-700
Body Text: 16px, Normal, Gray-600
Caption: 12px, Normal, Gray-500
```

### Visual Styling
- **Rounded Corners**: 8px untuk buttons, 12px untuk cards
- **Shadows**: Subtle shadows untuk depth (shadow-md untuk cards)
- **Gradients**: Subtle gradients untuk backgrounds (blue-50 to indigo-100)
- **Icons**: Consistent icon style (Heroicons outline)

## 2. Component-Level UI Design

### A. Card Ringkasan Kalori
**Spesifikasi:**
- **Layout**: Grid 4 kolom (mobile: 1 kolom, tablet: 2 kolom)
- **Content**:
  - Icon besar di atas (32px)
  - Label kecil di bawah icon
  - Angka besar (32px, bold) dengan warna semantic
  - Progress bar atau target di bawah
- **Styling**: 
  - Background: White dengan border subtle
  - Hover: Slight elevation (shadow-lg)
  - Metric colors: Blue (calories), Green (protein), Amber (carbs), Red (fat)

### B. List Makanan
**Spesifikasi:**
- **Layout**: Vertical list dengan spacing 12px
- **Item Structure**:
  - Food name (semibold, 16px)
  - Nutrition info (small, gray-600): "250 kkal | P: 20g | C: 30g | F: 10g"
  - Quantity badge (optional)
  - Action button (delete) di kanan
- **Styling**:
  - Background: Gray-50 dengan rounded-lg
  - Hover: Gray-100
  - Border: None
  - Padding: 16px

### C. Search Bar Makanan
**Spesifikasi:**
- **Layout**: Full width dengan button di kanan
- **Features**:
  - Search icon di kiri input
  - Placeholder: "Cari makanan..."
  - Clear button (X) saat ada text
  - Loading state saat searching
- **Styling**:
  - Border: Gray-200, focus: Blue-500 ring
  - Border radius: 8px
  - Height: 48px

### D. Komponen Grafik Progres
**Spesifikasi:**
- **Chart Types**:
  - Bar chart untuk kalori harian
  - Line chart untuk berat badan
- **Features**:
  - Hover tooltip dengan detail
  - Color coding (blue untuk kalori, green untuk berat)
  - X-axis: Dates
  - Y-axis: Values dengan grid lines
- **Styling**:
  - Background: White card
  - Chart area: Gray-50
  - Bars/Lines: Primary colors dengan opacity

### E. Navigation Bar
**Spesifikasi:**
- **Desktop**:
  - Logo/Title di kiri
  - Menu items horizontal di tengah
  - User info + logout di kanan
- **Mobile**:
  - Hamburger menu
  - Logo di tengah
  - User icon di kanan
- **Styling**:
  - Background: Blue-600
  - Text: White
  - Height: 64px
  - Sticky: top-0, z-50

### F. Sidebar Layout (Optional)
**Spesifikasi:**
- **Width**: 256px (w-64)
- **Content**:
  - User profile card di atas
  - Navigation menu
  - Quick stats
- **Styling**:
  - Background: White atau Gray-50
  - Border: Right border gray-200
  - Shadow: Left shadow

### G. Tombol & Input Form
**Tombol:**
- **Sizes**: Small (py-2), Medium (py-3), Large (py-4)
- **Variants**: Primary, Secondary, Outline, Danger
- **States**: Default, Hover, Active, Disabled, Loading

**Input:**
- **Sizes**: Standard (py-2), Large (py-3)
- **Types**: Text, Email, Password, Number, Date
- **States**: Default, Focus, Error, Disabled
- **With Icons**: Left icon, right icon, both

### H. User Profile Component
**Spesifikasi:**
- **Layout**: Card dengan sections
- **Sections**:
  - Avatar + Name + Email
  - Personal Info (editable form)
  - Health Metrics (BMI, etc.)
  - Settings
- **Styling**:
  - Avatar: 80px circle dengan border
  - Form: Standard input styling
  - Metrics: Grid cards dengan colors

### I. Modal Tambah Makanan
**Spesifikasi:**
- **Size**: Max width 600px, centered
- **Content**:
  - Food search di atas
  - Results list dengan scroll
  - Meal type selector
  - Quantity input
  - Add button
- **Styling**:
  - Background: White dengan rounded-lg
  - Overlay: Black dengan opacity-50
  - Close button: Top right (X icon)
  - Animation: Fade in + slide up

## 3. UX Flow Recommendations

### A. Navigasi Antar Halaman
1. **Primary Navigation**: Navbar dengan menu items
2. **Secondary Navigation**: Breadcrumbs untuk deep pages
3. **Quick Actions**: Floating action button untuk "Tambah Makanan"
4. **Back Navigation**: Browser back button + explicit back button

### B. Prioritas Elemen Dashboard
**Order (Top to Bottom):**
1. **Header**: Welcome message + date
2. **Quick Stats**: 4 metric cards (kalori, protein, carbs, fat)
3. **Progress Indicator**: Circular atau linear progress bar
4. **Today's Meals**: Grouped by meal type
5. **Quick Actions**: "Tambah Makanan" button
6. **Recent Activity**: Last 3-5 entries

### C. Memudahkan User Menambah Makanan
1. **Multiple Entry Points**:
   - Floating action button (FAB) di dashboard
   - "Tambah Makanan" button di food diary
   - Quick add dari search results
2. **Smart Search**:
   - Autocomplete suggestions
   - Recent searches
   - Popular foods
3. **Quick Add Flow**:
   - Search → Select → Choose meal type → Add (3 clicks max)
4. **Barcode Scanner** (future): Quick add via barcode

### D. UX Grafik Riwayat
1. **Time Period Selector**: Tabs atau dropdown (7d, 30d, 90d, custom)
2. **Chart Type Toggle**: Switch antara kalori dan berat badan
3. **Interactive Elements**:
   - Hover untuk detail
   - Click untuk drill-down
   - Zoom/pan untuk detail view
4. **Summary Stats**: Average, total, min, max di atas chart
5. **Export**: Download as image atau PDF

### E. UX Profil & Target Kalori
1. **Edit Mode Toggle**: Switch between view and edit
2. **Form Validation**: Real-time validation dengan clear errors
3. **Save Confirmation**: Toast notification saat berhasil
4. **Target Calculator**: Helper untuk calculate target berdasarkan goals
5. **Visual Feedback**: Progress indicator untuk target vs actual

## 4. Wireframe Concepts (Text-Based)

### A. Login Page
```
┌─────────────────────────────────────┐
│  [Navbar: Logo | Masuk | Daftar]   │
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │  Masuk ke Akun  │         │
│         │                 │         │
│         │  [Email Input]  │         │
│         │  [Password]     │         │
│         │                 │         │
│         │  [Button: Masuk]│         │
│         │                 │         │
│         │  Daftar akun baru│        │
│         └─────────────────┘         │
│                                     │
└─────────────────────────────────────┘
```

### B. Register Page
```
┌─────────────────────────────────────┐
│  [Navbar: Logo | Masuk | Daftar]   │
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────────┐         │
│         │  Daftar Akun Baru│         │
│         │                 │         │
│         │  [Nama]         │         │
│         │  [Email]        │         │
│         │  [Password]     │         │
│         │  [Confirm Pass] │         │
│         │                 │         │
│         │  [Button: Daftar]│        │
│         │                 │         │
│         │  Sudah punya akun│        │
│         └─────────────────┘         │
└─────────────────────────────────────┘
```

### C. Dashboard
```
┌─────────────────────────────────────────────┐
│ [Navbar: Logo | Dashboard | Food | Progress]│
├─────────────────────────────────────────────┤
│                                             │
│  Dashboard                    [Date Picker]│
│  Ringkasan nutrisi harian Anda              │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │Kalori│ │Protein│ │Carbs │ │ Fat  │      │
│  │ 1800 │ │ 120g │ │ 200g │ │ 60g  │      │
│  │/2000 │ │/150g │ │/250g │ │/65g  │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
│  ┌──────────────────┐ ┌──────────────┐    │
│  │ Jurnal Makanan   │ │ Statistik    │    │
│  │ Hari Ini         │ │ Cepat        │    │
│  │                 │ │              │    │    │
│  │ 🍳 Sarapan       │ │ Sisa: 200    │    │
│  │ - Nasi Goreng    │ │ Total: 5     │    │
│  │                  │ │              │    │
│  │ 🍽️ Makan Siang   │ │ [Lihat Progres]│  │
│  │ - Ayam Bakar     │ │              │    │
│  │                  │ │              │    │
│  │ [Lihat Semua]    │ │              │    │
│  └──────────────────┘ └──────────────┘    │
│                                             │
│  [+ Floating Action: Tambah Makanan]       │
└─────────────────────────────────────────────┘
```

### D. Food Diary Page
```
┌─────────────────────────────────────────────┐
│ [Navbar: Logo | Dashboard | Food | Progress]│
├─────────────────────────────────────────────┤
│                                             │
│  Jurnal Makanan                             │
│  Catat makanan Anda hari ini                │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ [Date Picker]  [+ Tambah Makanan]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Cari Makanan                         │   │
│  │ [Search Input] [Button: Cari]       │   │
│  │                                     │   │
│  │ [Sarapan] [Makan Siang] [Makan Malam]│  │
│  │                                     │   │
│  │ Results:                            │   │
│  │ - Nasi Goreng (250 kkal) [Tambah]   │   │
│  │ - Ayam Bakar (300 kkal) [Tambah]    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🍳 Sarapan                                 │
│  ┌─────────────────────────────────────┐   │
│  │ Nasi Goreng          [X]            │   │
│  │ 250 kkal | P: 10g | C: 30g | F: 5g  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  🍽️ Makan Siang                            │
│  ┌─────────────────────────────────────┐   │
│  │ Ayam Bakar           [X]            │   │
│  │ 300 kkal | P: 25g | C: 15g | F: 12g │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### E. Progress Page
```
┌─────────────────────────────────────────────┐
│ [Navbar: Logo | Dashboard | Food | Progress]│
├─────────────────────────────────────────────┤
│                                             │
│  Progres & Laporan                          │
│  Pantau perkembangan kesehatan Anda         │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ [7d] [30d] [90d]  [Kalori ▼]       │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐              │
│  │Rata2 │ │Total │ │Max   │              │
│  │ 2000 │ │14000 │ │ 2200 │              │
│  └──────┘ └──────┘ └──────┘              │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Grafik Asupan Kalori - 7 Hari       │   │
│  │                                     │   │
│  │     ▁▃▅▇█▇▅                         │   │
│  │     │ │ │ │ │ │ │                    │   │
│  │     M T W T F S S                    │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Data Detail                          │   │
│  │ ┌─────────────────────────────────┐ │   │
│  │ │ Senin, 1 Jan 2024    │ 1800 kkal│ │   │
│  │ │ Selasa, 2 Jan 2024   │ 2100 kkal│ │   │
│  │ │ ...                  │ ...      │ │   │
│  │ └─────────────────────────────────┘ │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### F. Profile Page
```
┌─────────────────────────────────────────────┐
│ [Navbar: Logo | Dashboard | Food | Progress]│
├─────────────────────────────────────────────┤
│                                             │
│  Profil Pengguna                             │
│  Kelola informasi profil Anda               │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Informasi Pribadi        [Edit]     │   │
│  │                                     │   │
│  │ [Nama Lengkap Input]                │   │
│  │ [Email Input]                       │   │
│  │ [Tinggi Badan] [Berat Badan]        │   │
│  │ [Usia] [Jenis Kelamin ▼]            │   │
│  │ [Target Kalori]                     │   │
│  │                                     │   │
│  │ [Simpan Perubahan] [Batal]         │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Ringkasan Profil                    │   │
│  │ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │   │
│  │ │BMI │ │Ting│ │Berat│ │Targ│        │   │
│  │ │22.5│ │170 │ │ 70 │ │2000│        │   │
│  │ └────┘ └────┘ └────┘ └────┘        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Pengaturan Akun                     │   │
│  │ [Keluar dari Akun]                  │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

## 5. Responsive Layout Recommendations

### Desktop View (>1024px)
- **Layout**: Full width dengan max-width container
- **Navigation**: Horizontal navbar dengan all menu items
- **Grid**: 4-column untuk metric cards, 3-column untuk content
- **Sidebar**: Optional sidebar untuk quick stats

### Tablet View (768px - 1024px)
- **Layout**: 2-column grid untuk metrics
- **Navigation**: Horizontal dengan fewer items atau hamburger
- **Cards**: Stack vertically dengan full width
- **Forms**: 2-column grid untuk form fields

### Mobile View (<768px)
- **Layout**: Single column, full width
- **Navigation**: Hamburger menu
- **Cards**: Stack vertically
- **Forms**: Single column
- **Buttons**: Full width untuk primary actions
- **FAB**: Floating action button untuk quick add

## 6. Design Rationale

### Why Card-Based Design?
- **Visual Grouping**: Cards clearly separate different information
- **Scannable**: Users can quickly scan and find what they need
- **Modern**: Card-based design is current and familiar
- **Flexible**: Easy to rearrange and responsive

### Why Blue as Primary?
- **Trust**: Blue conveys trust and reliability (important for health apps)
- **Calm**: Blue is calming, good for health/wellness apps
- **Professional**: Blue is professional and medical
- **Accessibility**: Good contrast ratios

### Why Generous Spacing?
- **Readability**: More space = easier to read
- **Focus**: Whitespace helps users focus on important elements
- **Breathing Room**: Prevents visual clutter
- **Mobile-Friendly**: Easier to tap on mobile devices

### Why Metric Cards?
- **Quick Glance**: Users can see key metrics at a glance
- **Visual Hierarchy**: Large numbers draw attention
- **Color Coding**: Different colors for different metrics aid recognition
- **Progress Indicators**: Show progress toward goals

## 7. Consistency Tips

1. **Component Reuse**: Use the same button, card, input components everywhere
2. **Spacing System**: Always use the spacing scale (xs, sm, md, lg, xl)
3. **Color System**: Stick to the defined color palette
4. **Typography**: Use the type scale consistently
5. **Icons**: Use the same icon library and sizes
6. **Shadows**: Use consistent shadow levels
7. **Border Radius**: Consistent rounded corners (8px buttons, 12px cards)

## 8. Scalability Considerations

1. **Component Library**: Build reusable components in `/components/common`
2. **Design Tokens**: Store colors, spacing, typography in CSS variables or config
3. **Theme Support**: Structure for future dark mode
4. **Internationalization**: Leave room for translations
5. **Accessibility**: Always consider a11y from the start


