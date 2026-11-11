# Shared UI Components (`src/app/shared/ui`)

Generic, domain-agnostic UI library based on **Angular 22**, **PrimeNG v22**, and **Tailwind CSS v4**.

---

## Expected CSS Variables from Consuming Projects

Consuming projects must provide the following CSS variables (typically defined on `:root` or role-specific `html[data-role='...']` attributes):

### 1. Primary Palette Scale (`50`–`950`)
Used by Tailwind utilities (`bg-primary-500`, etc.) and mapped into `UiThemePreset` / `MozAuraPreset`:
- `--moz-primary-50` / `--primary-50`: Ultra-light tint for backgrounds / chips.
- `--moz-primary-100` / `--primary-100`: Very light tint for hover states on light surfaces.
- `--moz-primary-200` / `--primary-200`: Light accent borders.
- `--moz-primary-300` / `--primary-300`: Decorative borders and secondary highlights.
- `--moz-primary-400` / `--primary-400`: Subtle primary interactive elements.
- `--moz-primary-500` / `--primary-500`: **Authoritative brand base color**.
- `--moz-primary-600` / `--primary-600`: Filled primary buttons and interactive surfaces.
- `--moz-primary-700` / `--primary-700`: Hover states for primary filled buttons.
- `--moz-primary-800` / `--primary-800`: Active / pressed states.
- `--moz-primary-900` / `--primary-900`: Deep tone for dark text or accents.
- `--moz-primary-950` / `--primary-950`: Ultra-deep tone for highest contrast.

### 2. Primary Foreground & Contrast Tokens
- `--primary-contrast`: Accessible text / icon color on top of `--primary-500` (must guarantee `≥ 4.5:1` WCAG AA contrast).
- `--moz-on-primary`: Accessible text color on top of `--primary-600` interactive controls (typically `#FFFFFF`).
- `--moz-on-primary-500`: Alias for `--primary-contrast`.
- `--primary-gradient`: Linear gradient for primary button surfaces (e.g., `linear-gradient(135deg, var(--moz-primary-500) 0%, var(--moz-primary-600) 100%)`).

### 3. Typography & Theme Tokens
- `--font-sans`: Primary font family token for `body` and form controls (PrimeNG inherits font from body).

---

## Global Styles Setup

In the consuming project's entry `src/styles.css`:

```css
@layer theme, base, tailwind-base, primeng, components, utilities, tailwind-utilities;

@import 'tailwindcss';
@import 'tailwindcss-primeui';
@import 'primeicons/primeicons.css';
@import './styles/fonts.css';
@import './styles/roles.css';
@import './styles/theme.css';
@import './styles/ui-library.css';

@custom-variant dark (&:where(.app-dark, .app-dark *));
```

And in `appConfig` / `providePrimeNG`:
```ts
providePrimeNG({
  theme: {
    preset: UiThemePreset,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, tailwind-base, primeng, components, utilities, tailwind-utilities',
      },
    },
  },
})
```

