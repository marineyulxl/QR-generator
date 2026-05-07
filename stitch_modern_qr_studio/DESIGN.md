---
name: Modern Utility Interface
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h2:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  small:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  layout_split: 40/60
---

## Brand & Style

This design system is anchored in the principles of **Modern Minimalism** and **Corporate Professionalism**. It is designed for a utility-first product where efficiency, clarity, and precision are paramount. The aesthetic avoids decorative fluff in favor of functional elegance, ensuring that the user's primary task—generating and customizing QR codes—remains the focal point.

The visual language communicates reliability and sophistication through generous white space, a restrained color palette, and a clear information hierarchy. By avoiding trendy effects like glassmorphism or high-saturation neons, the design system maintains a timeless, high-end tool feel that appeals to developers, marketers, and business professionals alike.

## Colors

The color strategy uses a structured hierarchy to guide user attention. The **Primary Blue** is reserved for main actions and brand presence, while the **Secondary Indigo** provides subtle accents for interactive elements or progressive disclosure. 

The neutral palette is specifically tuned for a professional software environment. We utilize a very light grey (`#F8FAFC`) for the global canvas to reduce eye strain, while slightly darker surface colors (`#F1F5F9`) define input areas. Text contrast ratios are strictly maintained to ensure accessibility, with the main text appearing in a deep navy-black (`#0F172A`) for maximum legibility.

## Typography

The design system exclusively utilizes **Inter**, a typeface engineered for user interfaces. The typographic scale is compact and systematic, optimized for dense information displays and technical workflows. 

Emphasis is created through weight transitions—moving from SemiBold for primary headers to Medium for interactive labels—rather than dramatic size changes. This keeps the interface feeling grounded and professional. All line heights are set to a 4px baseline grid to ensure vertical rhythm across multi-column layouts.

## Layout & Spacing

The design system employs a **Fixed Split-Screen Layout** with a 40/60 ratio. 
- **The Left Pane (40%)**: Contains the configuration controls, inputs, and customization options. It uses a vertical scrolling model with content grouped in clear logical sections.
- **The Right Pane (60%)**: Acts as the "Stage" or preview area. It is fixed or "sticky," ensuring the generated QR code is always visible during the editing process.

Spacing follows a strict 4px base unit. Internal card padding is set to 24px (`lg`), while smaller gaps between input fields and their respective labels use 8px (`xs`).

## Elevation & Depth

This system avoids high-contrast shadows or skeuomorphic depth. Instead, it uses **Tonal Layers** and **Subtle Ambient Shadows** to communicate hierarchy.

- **Level 0 (Canvas)**: Background color `#F8FAFC`.
- **Level 1 (Cards/Containers)**: White `#FFFFFF` with a 1px border in `#CBD5E1`. A very soft shadow (0px 1px 3px rgba(15, 23, 42, 0.08)) is applied to separate the work area from the background.
- **Level 2 (Dropdowns/Modals)**: Increased shadow spread to indicate temporary overlay status, but maintaining the same neutral tint.

Interaction depth is handled through color shifts (e.g., button hover states) rather than physical "lifting" of elements.

## Shapes

The shape language is "Soft-Modern," utilizing varying radii to distinguish between different types of UI objects:
- **Inputs**: 6px radius for a precise, technical look.
- **Buttons**: 8px radius to provide a comfortable, clickable appearance.
- **Cards & Major Containers**: 12px radius to frame the primary content areas with a modern, friendly touch.

This hierarchical approach to roundedness ensures that smaller functional elements feel "sharper" and more precise, while larger layout pieces feel more structural and approachable.

## Components

### Buttons
- **Primary**: 44px height, `#2563EB` background, White text. SemiBold weight.
- **Secondary**: 44px height, White background, `#CBD5E1` border, `#0F172A` text.
- **Ghost/Tertiary**: No border or background until hover. Used for low-priority actions.

### Input Fields
- **Height**: 40px.
- **Background**: `#F1F5F9`.
- **Border**: 1px solid `#CBD5E1`.
- **Focus State**: 2px solid `#2563EB` with no outer glow.
- **Labels**: Positioned 8px above the field in `#334155` Medium.

### Cards
- **Structure**: White background, 12px radius, subtle shadow.
- **Usage**: Used to group QR code customization categories (e.g., "Colors", "Logo", "Patterns").

### QR Code Preview
- A specialized component within the 60% split section.
- Framed in a high-contrast white card with 24px padding.
- Includes a bottom action bar for "Download PNG", "SVG", and "Print" as secondary button styles.

### Feedback Elements
- **Success Toasts**: Background `#10B981` (10% opacity) with solid green text/icon.
- **Error States**: Input borders turn `#EF4444` with a supporting text label below the field.