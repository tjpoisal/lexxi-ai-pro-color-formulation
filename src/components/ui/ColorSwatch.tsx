import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, Animated, Vibration} from 'react-native';
import {COLORS} from '../../config/theme';

interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export function ColorSwatch({
  color,
  selected = false,
  onPress,
  size = 60,
  style,
  disabled = false,
}: ColorSwatchProps) {
  const animatedValue = React.useRef(new Animated.Value(selected ? 1 : 0)).current;
  const pressAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false, // Cannot use native driver for borderWidth animation
      tension: 100,
      friction: 8,
    }).start();
  }, [selected, animatedValue]);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const pressScale = pressAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  const borderWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 4],
  });

  const handlePressIn = () => {
    Animated.spring(pressAnimatedValue, {
      toValue: 1,
      useNativeDriver: false, // Consistent with selection animation
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnimatedValue, {
      toValue: 0,
      useNativeDriver: false, // Consistent with selection animation
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePress = () => {
    if (onPress && !disabled) {
      // Haptic feedback
      Vibration.vibrate(50);

      // Call the onPress handler
      onPress();
    }
  };

  const combinedScale = Animated.multiply(scale, pressScale);

  const swatchStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    borderColor: selected ? COLORS.champagneGold : COLORS.lightGray,
    transform: [{scale: combinedScale}],
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1} // We handle opacity with animations
      style={style}
    >
      <Animated.View style={[styles.swatch, swatchStyle]}>
        {selected && (
          <Animated.View
            style={[
              styles.selectedRing,
              {
                width: size + 8,
                height: size + 8,
                borderRadius: (size + 8) / 2,
                borderWidth,
              },
            ]}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  swatch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRing: {
    position: 'absolute',
    borderColor: COLORS.champagneGold,
  },
});