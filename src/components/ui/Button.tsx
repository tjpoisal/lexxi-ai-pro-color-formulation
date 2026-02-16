import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLORS, TYPOGRAPHY, COMPONENT_STYLES} from '../../config/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.base];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'icon':
        baseStyle.push(styles.icon);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text];

    switch (variant) {
      case 'primary':
        baseTextStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseTextStyle.push(styles.secondaryText);
        break;
      case 'icon':
        baseTextStyle.push(styles.iconText);
        break;
    }

    if (disabled) {
      baseTextStyle.push(styles.disabledText);
    }

    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.pureWhite : COLORS.champagneGold}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    ...COMPONENT_STYLES.primaryButton,
  },
  secondary: {
    ...COMPONENT_STYLES.secondaryButton,
  },
  icon: {
    ...COMPONENT_STYLES.iconButton,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...TYPOGRAPHY.button,
  },
  primaryText: {
    color: COLORS.pureWhite,
  },
  secondaryText: {
    color: COLORS.champagneGold,
  },
  iconText: {
    color: COLORS.deepCharcoal,
  },
  disabledText: {
    color: COLORS.slateGray,
  },
});