import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {Camera, useCameraDevice, useFrameProcessor} from 'react-native-vision-camera';
import {Canvas, Group, Image as SkiaImage, Paint} from '@shopify/react-native-skia';
import {runAsync, useSharedValue} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROFESSIONAL_COLORS, type HairColor} from './src/data/colors';
import {
  fetchColorDetail,
  fetchConversions,
  type HairColorDetail,
  type ConversionSuggestion,
} from './src/api/haircolor';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ALLERGEN_FILTERS = ['PPD', 'PTDS', 'resorcinol', 'fragrance'];

const HAIR_COLORS: HairColor[] = PROFESSIONAL_COLORS;

export default function LexxiColorTryOnApp() {
  const [selectedColor, setSelectedColor] = useState<HairColor>(HAIR_COLORS[0]);
  const [hasPermission, setHasPermission] = useState(false);
  const [hairMask, setHairMask] = useState<unknown | null>(null);
  const [beforePhoto, setBeforePhoto] = useState<unknown | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [colorDetail, setColorDetail] = useState<HairColorDetail | null>(null);
  const [conversions, setConversions] = useState<ConversionSuggestion[]>([]);
  const [openSection, setOpenSection] = useState<'technical' | 'safety' | 'conversions' | null>('technical');
  const [hiddenAllergens, setHiddenAllergens] = useState<string[]>([]);

  const device = useCameraDevice('front');
  const hairMaskImage = useSharedValue(null);

  useEffect(() => {
    requestCameraPermission();
    loadSavedColor();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const detail = await fetchColorDetail(selectedColor.id);
      const conv = await fetchConversions(selectedColor.id);
      if (!cancelled) {
        setColorDetail(detail);
        setConversions(conv);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedColor.id]);

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    setHasPermission(permission === 'granted');
  };

  const loadSavedColor = async () => {
    const savedColorId = await AsyncStorage.getItem('lastUsedColor');
    if (savedColorId) {
      const color = HAIR_COLORS.find(c => c.id === savedColorId);
      if (color) setSelectedColor(color);
    }
  };

  const saveColor = async (colorId: string) => {
    await AsyncStorage.setItem('lastUsedColor', colorId);
  };

  const handleColorSelect = (color: HairColor) => {
    setSelectedColor(color);
    saveColor(color.id);
  };

  // MediaPipe Hair Segmentation Frame Processor
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    runAsync(frame, () => {
      'worklet';
      // Hair segmentation using MediaPipe
      // This runs on every frame for real-time tracking
      const segmentedHair = segmentHair(frame);
      hairMaskImage.value = segmentedHair;
    });
  }, []);

  const captureBeforePhoto = async () => {
    // Capture current frame as "before" image
    setBeforePhoto(hairMask); // Placeholder - implement actual capture
    Alert.alert('Before Photo Saved', 'Apply a color to see the comparison!');
  };

  const showBeforeAfter = () => {
    if (!beforePhoto) {
      Alert.alert('No Before Photo', 'Capture a before photo first!');
      return;
    }
    setShowComparison(true);
  };

  const toggleAllergen = (allergen: string) => {
    setHiddenAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen],
    );
  };

  const visibleColors = HAIR_COLORS.filter(color => {
    if (!color.allergens || color.allergens.length === 0) return true;
    return !color.allergens.some(a => hiddenAllergens.includes(a));
  });

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Feed */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />

      {/* AR Color Overlay Canvas */}
      <Canvas style={StyleSheet.absoluteFill}>
        {hairMaskImage.value && (
          <Group>
            <SkiaImage
              image={hairMaskImage.value}
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fit="cover"
            >
              <Paint color={selectedColor.hex} blendMode="multiply" opacity={0.7} />
            </SkiaImage>
          </Group>
        )}
      </Canvas>

      {/* Top UI - Brand Info */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>Lexxi</Text>
        <Text style={styles.subtitle}>AR Color Try-On</Text>
      </View>

      {/* Bottom UI - Color Picker + Metadata */}
      <View style={styles.bottomContainer}>
        <View style={styles.selectedColorInfo}>
          <Text style={styles.colorName}>{selectedColor.name}</Text>
          <Text style={styles.brandName}>
            {selectedColor.brand}
            {selectedColor.line ? ` • ${selectedColor.line}` : ''}
          </Text>
        </View>

        {/* Metadata Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabButton, openSection === 'technical' && styles.tabButtonActive]}
            onPress={() => setOpenSection(openSection === 'technical' ? null : 'technical')}>
            <Text
              style={[styles.tabButtonText, openSection === 'technical' && styles.tabButtonTextActive]}>
              Technical / Formula
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, openSection === 'safety' && styles.tabButtonActive]}
            onPress={() => setOpenSection(openSection === 'safety' ? null : 'safety')}>
            <Text
              style={[styles.tabButtonText, openSection === 'safety' && styles.tabButtonTextActive]}>
              Safety & Allergens
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, openSection === 'conversions' && styles.tabButtonActive]}
            onPress={() => setOpenSection(openSection === 'conversions' ? null : 'conversions')}>
            <Text
              style={[styles.tabButtonText, openSection === 'conversions' && styles.tabButtonTextActive]}>
              Conversions
            </Text>
          </TouchableOpacity>
        </View>

        {openSection && (
          <View style={styles.tabContent}>
            {openSection === 'technical' && (
              <>
                {colorDetail && (
                  <Text style={styles.tabText}>
                    {colorDetail.level && `Level: ${colorDetail.level} `}
                    {colorDetail.tone && `Tone: ${colorDetail.tone}`}
                  </Text>
                )}
                {selectedColor.usageNotes && (
                  <Text style={styles.tabText}>{selectedColor.usageNotes}</Text>
                )}
                {colorDetail?.developerGuidance && (
                  <Text style={styles.tabText}>{colorDetail.developerGuidance}</Text>
                )}
              </>
            )}
            {openSection === 'safety' && (
              <>
                {selectedColor.ingredientsSummary && (
                  <Text style={styles.tabText}>{selectedColor.ingredientsSummary}</Text>
                )}
                <Text style={styles.tabText}>
                  Allergens:{' '}
                  {selectedColor.allergens && selectedColor.allergens.length
                    ? selectedColor.allergens.join(', ')
                    : 'None listed'}
                </Text>
                {selectedColor.msdsUrl && (
                  <Text style={styles.tabText} numberOfLines={1}>
                    MSDS/SDS: {selectedColor.msdsUrl}
                  </Text>
                )}
              </>
            )}
            {openSection === 'conversions' && (
              <>
                {conversions.length === 0 ? (
                  <Text style={styles.tabText}>No conversions available for this shade.</Text>
                ) : (
                  conversions.map(conv => {
                    const target = HAIR_COLORS.find(c => c.id === conv.targetId);
                    if (!target) return null;
                    return (
                      <Text key={conv.targetId} style={styles.tabText}>
                        → {target.brand} {target.name} ({target.line ?? ''})
                      </Text>
                    );
                  })
                )}
              </>
            )}
          </View>
        )}

        {/* Allergen Filters */}
        <View style={styles.allergenRow}>
          <Text style={styles.allergenLabel}>Hide allergens:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.allergenChipsRow}>
              {ALLERGEN_FILTERS.map(allergen => {
                const active = hiddenAllergens.includes(allergen);
                return (
                  <TouchableOpacity
                    key={allergen}
                    style={[styles.allergenChip, active && styles.allergenChipActive]}
                    onPress={() => toggleAllergen(allergen)}>
                    <Text
                      style={[styles.allergenChipText, active && styles.allergenChipTextActive]}>
                      {allergen}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorPicker}>
          {visibleColors.map(color => (
            <TouchableOpacity
              key={color.id}
              style={[
                styles.colorSwatch,
                {backgroundColor: color.hex},
                selectedColor.id === color.id && styles.selectedSwatch,
              ]}
              onPress={() => handleColorSelect(color)}
              activeOpacity={0.8}>
              {selectedColor.id === color.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button} onPress={captureBeforePhoto}>
            <Text style={styles.buttonText}>📸 Before</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={showBeforeAfter}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Compare
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>💾 Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comparison Modal */}
      {showComparison && (
        <View style={styles.comparisonModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowComparison(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.comparisonTitle}>Before & After</Text>
          <View style={styles.comparisonImages}>
            <View style={styles.comparisonImageContainer}>
              <Text style={styles.comparisonLabel}>BEFORE</Text>
              {/* Before image goes here */}
            </View>
            <View style={styles.comparisonImageContainer}>
              <Text style={styles.comparisonLabel}>AFTER</Text>
              {/* After image goes here */}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// Hair segmentation function (placeholder - implement with MediaPipe)
function segmentHair(frame) {
  'worklet';
  // MediaPipe Hair Segmentation integration
  // Returns binary mask of hair region
  // This is a placeholder - actual implementation uses @mediapipe/tasks-vision
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingBottom: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  selectedColorInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  colorName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  brandName: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  colorPicker: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSwatch: {
    borderColor: '#FFD700',
    borderWidth: 4,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#000',
  },
  comparisonModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  comparisonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  comparisonImages: {
    flexDirection: 'row',
    gap: 20,
  },
  comparisonImageContainer: {
    flex: 1,
    aspectRatio: 3 / 4,
    backgroundColor: '#222',
    borderRadius: 12,
    overflow: 'hidden',
  },
  comparisonLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabButtonActive: {
    backgroundColor: '#FFD700',
  },
  tabButtonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#000',
  },
  tabContent: {
    marginBottom: 10,
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  allergenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  allergenLabel: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  allergenChipsRow: {
    flexDirection: 'row',
  },
  allergenChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginRight: 6,
  },
  allergenChipActive: {
    backgroundColor: '#FF6B6B',
  },
  allergenChipText: {
    color: '#fff',
    fontSize: 11,
  },
  allergenChipTextActive: {
    color: '#000',
    fontWeight: '700',
  },
});
