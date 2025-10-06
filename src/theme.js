/**
 * UnderwritePro Color Theme
 * 
 * Psychology-driven color palette for commercial lending:
 * - Navy Blue: Trust, stability, professionalism (primary)
 * - Deep Green: Money, growth, approval (success)
 * - Gold/Amber: Premium, value, success (accent)
 * - Charcoal: Sophistication, seriousness (text)
 */

const colors = {
  // Primary Colors (Trust & Authority)
  primary: {
    50: '#EFF6FF',   // Very light blue (backgrounds)
    100: '#DBEAFE',  // Light blue
    200: '#BFDBFE',  // Lighter blue
    300: '#93C5FD',  // Medium light blue
    400: '#60A5FA',  // Medium blue
    500: '#3B82F6',  // Standard blue
    600: '#2563EB',  // Darker blue
    700: '#1D4ED8',  // Deep blue
    800: '#1E40AF',  // Navy blue
    900: '#1E3A8A',  // Dark navy (main brand color)
  },
  
  // Success Colors (Money, Growth, Approval)
  success: {
    50: '#ECFDF5',   // Very light green
    100: '#D1FAE5',  // Light green
    200: '#A7F3D0',  // Lighter green
    300: '#6EE7B7',  // Medium light green
    400: '#34D399',  // Medium green
    500: '#10B981',  // Standard green (approved)
    600: '#059669',  // Darker green
    700: '#047857',  // Deep green
    800: '#065F46',  // Forest green
    900: '#064E3B',  // Dark forest green
  },
  
  // Warning Colors (Pending, Review Needed)
  warning: {
    50: '#FFFBEB',   // Very light amber
    100: '#FEF3C7',  // Light amber
    200: '#FDE68A',  // Lighter amber
    300: '#FCD34D',  // Medium light amber
    400: '#FBBF24',  // Medium amber
    500: '#F59E0B',  // Standard amber (pending)
    600: '#D97706',  // Darker amber
    700: '#B45309',  // Deep amber
    800: '#92400E',  // Dark amber
    900: '#78350F',  // Very dark amber
  },
  
  // Danger Colors (Declined, Issues)
  danger: {
    50: '#FEF2F2',   // Very light red
    100: '#FEE2E2',  // Light red
    200: '#FECACA',  // Lighter red
    300: '#FCA5A5',  // Medium light red
    400: '#F87171',  // Medium red
    500: '#EF4444',  // Standard red (declined)
    600: '#DC2626',  // Darker red
    700: '#B91C1C',  // Deep red
    800: '#991B1B',  // Dark red
    900: '#7F1D1D',  // Very dark red
  },
  
  // Info Colors (Neutral Information)
  info: {
    50: '#EFF6FF',   // Very light blue
    100: '#DBEAFE',  // Light blue
    200: '#BFDBFE',  // Lighter blue
    300: '#93C5FD',  // Medium light blue
    400: '#60A5FA',  // Medium blue
    500: '#3B82F6',  // Standard blue (info)
    600: '#2563EB',  // Darker blue
    700: '#1D4ED8',  // Deep blue
    800: '#1E40AF',  // Navy blue
    900: '#1E3A8A',  // Dark navy
  },
  
  // Accent Colors (Premium, Value)
  accent: {
    50: '#FFFBEB',   // Very light gold
    100: '#FEF3C7',  // Light gold
    200: '#FDE68A',  // Lighter gold
    300: '#FCD34D',  // Medium light gold
    400: '#FBBF24',  // Medium gold
    500: '#F59E0B',  // Standard gold (premium)
    600: '#D97706',  // Darker gold
    700: '#B45309',  // Deep gold
    800: '#92400E',  // Dark gold
    900: '#78350F',  // Very dark gold
  },
  
  // Neutral Colors (Text, Backgrounds)
  neutral: {
    50: '#F9FAFB',   // Very light gray (backgrounds)
    100: '#F3F4F6',  // Light gray
    200: '#E5E7EB',  // Lighter gray
    300: '#D1D5DB',  // Medium light gray
    400: '#9CA3AF',  // Medium gray
    500: '#6B7280',  // Standard gray
    600: '#4B5563',  // Darker gray
    700: '#374151',  // Deep gray
    800: '#1F2937',  // Charcoal (text)
    900: '#111827',  // Very dark charcoal
  },
  
  // Semantic Colors (Quick Access)
  white: '#FFFFFF',
  black: '#000000',
  
  // Status Colors (Quick Access)
  approved: '#10B981',    // Success green
  pending: '#F59E0B',     // Warning amber
  declined: '#EF4444',    // Danger red
  underReview: '#3B82F6', // Info blue
  
  // Background Colors
  background: {
    primary: '#FFFFFF',   // White
    secondary: '#F9FAFB', // Light gray
    tertiary: '#EFF6FF',  // Very light blue
    dark: '#1F2937',      // Charcoal
  },
  
  // Text Colors
  text: {
    primary: '#111827',   // Very dark charcoal
    secondary: '#4B5563', // Darker gray
    tertiary: '#6B7280',  // Standard gray
    light: '#9CA3AF',     // Medium gray
    white: '#FFFFFF',     // White
  },
  
  // Border Colors
  border: {
    light: '#E5E7EB',     // Lighter gray
    medium: '#D1D5DB',    // Medium light gray
    dark: '#9CA3AF',      // Medium gray
  },
};

// Gradients for premium feel
export const gradients = {
  primary: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
  success: 'linear-gradient(135deg, #065F46 0%, #10B981 100%)',
  premium: 'linear-gradient(135deg, #92400E 0%, #F59E0B 100%)',
  hero: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)',
};

// Shadows for depth
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Border radius for consistency
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Fully rounded
};

// Spacing scale
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// Typography
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Export everything as default theme
export const theme = {
  colors,
  gradients,
  shadows,
  borderRadius,
  spacing,
  typography,
};

export default theme;
