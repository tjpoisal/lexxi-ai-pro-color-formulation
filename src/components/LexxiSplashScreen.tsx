import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Canvas,
  Rect,
  vec,
  useClockValue,
  useComputedValue,
  LinearGradient,
  Path,
  Skia,
  Group,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

// Lexxi Pro Color Usage Guide:
// Off White:    #FAFAFA  (backgrounds, cards, inputs)
// Dark Charcoal:#374151  (all primary text)
// Emerald Green:#0F6B5A  (primary / brand, malachite core)
// Sapphire Blue:#0F52BA  (secondary / links)
// Ruby Red:     #E0115F  (errors, destructive)
// Metallic Gold:#B8860B  (icons, borders, large headings)

interface LexxiSplashScreenProps {
  onDone: () => void;
}

export const LexxiSplashScreen: React.FC<LexxiSplashScreenProps> = ({onDone}) => {
  const clock = useClockValue();

  // Overall 0–1 progress over ~4s
  const progress = useSharedValue(0);

  // "Pro" animation
  const proScale = useSharedValue(0.8);
  const proOpacity = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(
      1,
      {duration: 4000},
      finished => {
        if (finished) {
          setTimeout(onDone, 600);
        }
      },
    );

    const proTimer = setTimeout(() => {
      proScale.value = withSpring(1, {damping: 14, stiffness: 160});
      proOpacity.value = withTiming(1, {duration: 260});
    }, 3500);

    return () => clearTimeout(proTimer);
  }, [onDone, progress, proScale, proOpacity]);

  // Animated Emerald + Sapphire + Metallic Gold gradient
  const gradient = useComputedValue(() => {
    const t = (clock.current % 10000) / 10000; // 0–1 over 10s
    const vividness = 0.4 + 0.6 * progress.value; // 0.4 → 1.0

    // Base stops: Emerald, Sapphire, soft Off White, soft Gold
    const baseColors = [
      '#0F6B5A', // Emerald Green (malachite core)
      '#0F52BA', // Sapphire Blue
      '#FAFAFA', // Off White lightening the blend
      '#B8860B', // Metallic Gold
    ].map(c => Skia.Color(c));

    // Slight highlight shimmer for gold
    const goldHighlightPhase = (clock.current % 6000) / 6000;
    const goldHighlightMix = 0.3 + 0.7 * Math.abs(Math.sin(Math.PI * 2 * goldHighlightPhase));
    const highlightGold = Skia.Color('#FFF2C2');

    const vividColors = baseColors.map((col, idx) => {
      const [r, g, b, a] = col.toBytes();
      const mix = vividness;
      const nr = r * mix + 250 * (1 - mix);
      const ng = g * mix + 250 * (1 - mix);
      const nb = b * mix + 250 * (1 - mix);
      let base = Skia.Color((nr << 24) | (ng << 16) | (nb << 8) | a);

      // Boost the last (gold) stop with a moving highlight
      if (idx === baseColors.length - 1) {
        const [hr, hg, hb, ha] = highlightGold.toBytes();
        const [br, bg, bb] = base.toBytes();
        const mr = br * (1 - goldHighlightMix) + hr * goldHighlightMix;
        const mg = bg * (1 - goldHighlightMix) + hg * goldHighlightMix;
        const mb = bb * (1 - goldHighlightMix) + hb * goldHighlightMix;
        base = Skia.Color((mr << 24) | (mg << 16) | (mb << 8) | ha);
      }

      return base;
    });

    const radius = width * 0.3;
    const angle = Math.PI * 2 * t;
    const start = vec(
      width / 2 + radius * Math.cos(angle),
      height / 2 + radius * Math.sin(angle),
    );
    const end = vec(
      width / 2 - radius * Math.cos(angle),
      height / 2 - radius * Math.sin(angle),
    );

    return {start, end, colors: vividColors};
  }, [clock, progress]);

  // "Lexxi" stroke path – placeholder; swap with real SVG path later
  const lexxiPath = Skia.Path.Make();
  lexxiPath.moveTo(0, 40);
  lexxiPath.cubicTo(20, 0, 60, 0, 80, 30);
  lexxiPath.cubicTo(110, 60, 150, 20, 190, 40);
  lexxiPath.cubicTo(210, 60, 240, 60, 260, 40);
  const lexxiLength = lexxiPath.length();

  const dashOffset = useComputedValue(
    () => (1 - progress.value) * lexxiLength,
    [progress],
  );

  const proStyle = useAnimatedStyle(() => ({
    opacity: proOpacity.value,
    transform: [{scale: proScale.value}],
  }));

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill}>
        {/* Flowing Emerald + Sapphire + Metallic Gold gradient */}
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={gradient.current.start}
            end={gradient.current.end}
            colors={gradient.current.colors}
          />
        </Rect>

        {/* Metallic Gold vein behind logo */}
        <Group
          transform={[
            {translateX: width * 0.1},
            {translateY: height * 0.32},
          ]}>
          <Rect x={0} y={0} width={width * 0.8} height={8} opacity={0.45}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width * 0.8, 0)}
              colors={[
                Skia.Color('#B8860B'),
                Skia.Color('#FFF2C2'),
                Skia.Color('#B8860B'),
              ]}
            />
          </Rect>
        </Group>

        {/* "Lexxi" handwriting in Dark Charcoal */}
        <Path
          path={lexxiPath}
          style="stroke"
          strokeWidth={6}
          color="#374151"
          strokeCap="round"
          strokeJoin="round"
          dash={[lexxiLength, lexxiLength]}
          dashOffset={dashOffset}
          transform={[
            {translateX: width / 2 - 130},
            {translateY: height / 2 - 30},
          ]}
        />
      </Canvas>

      {/* "Pro" label in Dark Charcoal with subtle gold underline */}
      <Animated.View
        style={[
          styles.proContainer,
          {
            top: height / 2 + 6,
            left: width / 2 + 44,
          },
          proStyle,
        ]}>
        <Animated.Text style={styles.proText}>Pro</Animated.Text>
        <View style={styles.proUnderline} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Off White base
  },
  proContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
  },
  proText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151', // Dark Charcoal
    letterSpacing: 1,
  },
  proUnderline: {
    marginTop: 2,
    height: 2,
    width: 32,
    backgroundColor: '#B8860B', // Metallic Gold accent
    borderRadius: 999,
  },
});
