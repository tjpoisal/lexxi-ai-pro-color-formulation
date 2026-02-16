import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {COLORS, COMPONENT_STYLES, LAYOUT} from '../../config/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const getCardStyle = () => {
    const baseStyle = [styles.base];

    switch (variant) {
      case 'default':
        baseStyle.push(styles.default);
        break;
      case 'elevated':
        baseStyle.push(styles.elevated);
        break;
    }

    // Add padding
    switch (padding) {
      case 'sm':
        baseStyle.push({padding: SPACING.sm});
        break;
      case 'md':
        baseStyle.push({padding: SPACING.md});
        break;
      case 'lg':
        baseStyle.push({padding: LAYOUT.sectionSpacing});
        break;
      case 'xl':
        baseStyle.push({padding: LAYOUT.screenPadding});
        break;
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  return <View style={getCardStyle()}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: LAYOUT.borderRadius.lg,
  },
  default: {
    ...COMPONENT_STYLES.card,
  },
  elevated: {
    ...COMPONENT_STYLES.elevatedCard,
  },
});