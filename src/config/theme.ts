import {Dimensions} from 'react-native';

// Device dimensions
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const IS_IPAD = SCREEN_WIDTH >= 768;

// Color Palette
export const COLORS = {
  // Primary Colors
  deepCharcoal: '#2C2C2C',
  champagneGold: '#D4AF37',
  pureWhite: '#FFFFFF',
  softCream: '#F9F7F4',

  // Secondary Colors
  slateGray: '#64748B',
  lightGray: '#E2E8F0',
  successGreen: '#10B981',
  warningYellow: '#FBBF24',
  errorRed: '#E57373',
  infoBlue: '#3B82F6',

  // Gradients
  goldGradient: ['#D4AF37', '#F4E5C3'],
  darkGradient: ['#2C2C2C', '#1A1A1A'],
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  // Headings (Cormorant Garamond - Serif)
  h1: {
    fontFamily: 'serif', // Will be replaced with Cormorant Garamond
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as const,
  },
  h2: {
    fontFamily: 'serif',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '600' as const,
  },
  h3: {
    fontFamily: 'serif',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
  },
  h4: {
    fontFamily: 'serif',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
  },
  h5: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500' as const,
  },
  h6: {
    fontFamily: 'serif',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500' as const,
  },

  // Body Text (Inter - Sans-Serif)
  large: {
    fontFamily: 'sans-serif', // Will be replaced with Inter
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const,
  },
  regular: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  small: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  // Special Cases
  button: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  formula: {
    fontFamily: 'monospace', // SF Mono
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  price: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
  },
} as const;

// Spacing System (Base unit: 4px)
export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Layout Constants
export const LAYOUT = {
  // Screen Layouts
  headerHeight: 60,
  tabBarHeight: 80,

  // Split Screen Ratios (for iPad)
  cameraWidthRatio: IS_IPAD ? 0.6 : 1, // 60% for iPad, 100% for iPhone
  controlsWidthRatio: IS_IPAD ? 0.4 : 1, // 40% for iPad, 100% for iPhone

  // Component Spacing
  screenPadding: SPACING.xxl,
  sectionSpacing: SPACING.xl,
  componentSpacing: SPACING.md,

  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },

  // Shadows
  shadow: {
    light: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    heavy: {
      shadowColor: COLORS.champagneGold,
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // Animations
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'ease-in-out',
      cubic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// Component Styles
export const COMPONENT_STYLES = {
  // Primary Button
  primaryButton: {
    backgroundColor: COLORS.champagneGold,
    borderRadius: LAYOUT.borderRadius.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    height: 48,
    ...LAYOUT.shadow.heavy,
  },

  // Secondary Button
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.champagneGold,
    borderRadius: LAYOUT.borderRadius.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    height: 48,
  },

  // Icon Button
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: LAYOUT.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Card
  card: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: SPACING.xl,
    ...LAYOUT.shadow.light,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  // Elevated Card
  elevatedCard: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: SPACING.xl,
    ...LAYOUT.shadow.medium,
    borderWidth: 2,
    borderColor: COLORS.champagneGold,
  },

  // Input Field
  input: {
    height: 48,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.md,
    backgroundColor: COLORS.pureWhite,
    fontSize: TYPOGRAPHY.regular.fontSize,
    color: COLORS.deepCharcoal,
  },

  // Input Focus
  inputFocus: {
    borderWidth: 2,
    borderColor: COLORS.champagneGold,
    shadowColor: COLORS.champagneGold,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Color Swatch
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: SPACING.xs,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },

  colorSwatchSelected: {
    borderWidth: 4,
    borderColor: COLORS.champagneGold,
    transform: [{scale: 1.1}],
  },
} as const;

// Brand Assets
export const BRAND = {
  name: 'Lexxi AI Pro Color Formulation',
  tagline: 'Show them. Don\'t tell them.',
  logo: {
    fontFamily: 'serif',
    fontSize: 24,
    color: COLORS.champagneGold,
  },
} as const;

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  LAYOUT,
  COMPONENT_STYLES,
  BRAND,
  IS_IPAD,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};