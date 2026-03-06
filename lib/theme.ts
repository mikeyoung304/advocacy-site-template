// ============================================================================
// Theme Configuration — visual branding for this deployment
// TODO(fork): Update colors to match your project's brand
// ============================================================================
// Controls colors and glass transparency values only.
// Shadows, animations, and fonts stay in globals.css.
// Font swaps require editing both layout.tsx import and globals.css --font-sans.

export const theme = {
  colors: {
    primary: '#1E3A8A',
    primaryHover: '#1E40AF',
    primaryLight: '#EFF6FF',
    primaryDark: '#172554',
    accent: '#166534',
    accentHover: '#15803D',
    accentLight: '#F0FDF4',
    ink: '#0B1220',
    inkMuted: 'oklch(0.40 0.03 257.28)',
    inkSubtle: '#6B7280',
    surface: '#FFFFFF',
    surfaceMuted: '#F6F7FB',
    surfaceElevated: '#FFFFFF',
    border: '#E6E8F0',
    borderMuted: '#F1F5F9',
    // Chart colors (single-hue blue ramp)
    chart1: '#1E3A8A',
    chart2: '#3B82F6',
    chart3: '#60A5FA',
    chart4: '#93C5FD',
    chartAccent: '#166534',
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.85)',
    bgScrolled: 'rgba(255, 255, 255, 0.95)',
  },
};
