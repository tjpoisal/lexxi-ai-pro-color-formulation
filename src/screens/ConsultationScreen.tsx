import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Card, ColorSwatch} from '../components/ui';
import {COLORS, TYPOGRAPHY, SPACING, LAYOUT, IS_IPAD} from '../config/theme';

const {width, height} = Dimensions.get('window');

// Mock color data
const colorCategories = ['All', 'Blonde', 'Brown', 'Red', 'Black', 'Fashion'];
const brands = ['Wella', 'Redken', 'L\'Oréal', 'Clairol', 'Garnier'];

const mockColors = [
  {id: '1', name: 'Warm Caramel', brand: 'Redken', line: 'Shades EQ', hex: '#8B4513'},
  {id: '2', name: 'Golden Honey', brand: 'Wella', line: 'Color Touch', hex: '#DAA520'},
  {id: '3', name: 'Chestnut Brown', brand: 'L\'Oréal', line: 'Preference', hex: '#654321'},
  {id: '4', name: 'Ash Blonde', brand: 'Clairol', line: 'Nice\'n Easy', hex: '#F5F5DC'},
  {id: '5', name: 'Copper Red', brand: 'Garnier', line: 'Nutrisse', hex: '#B87333'},
  {id: '6', name: 'Jet Black', brand: 'Dark & Lovely', line: 'Beautiful Beginnings', hex: '#000000'},
];

export default function ConsultationScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('Wella');
  const [selectedColor, setSelectedColor] = useState(mockColors[0]);
  const [beforeAfterMode, setBeforeAfterMode] = useState<'before' | 'after'>('after');

  const cameraWidth = IS_IPAD ? width * LAYOUT.cameraWidthRatio : width;
  const controlsWidth = IS_IPAD ? width * LAYOUT.controlsWidthRatio : width;

  const handleColorSelect = (color: typeof mockColors[0]) => {
    setSelectedColor(color);
  };

  const handleGenerateFormula = () => {
    // Navigate to formula output screen
    navigation.navigate('Formula' as never);
  };

  const handleSave = () => {
    // Save current consultation
  };

  const handleEmailPreview = () => {
    // Show email preview
  };

  const CameraSection = () => (
    <View style={[styles.cameraSection, {width: cameraWidth}]}>
      {/* Camera Feed Placeholder */}
      <View style={styles.cameraFeed}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.cameraText}>📹 LIVE CAMERA</Text>
          <Text style={styles.cameraSubtext}>Position face in frame</Text>
          {/* AR Color Overlay would go here */}
          <View style={styles.arOverlay}>
            <Text style={styles.overlayText}>AR Color Preview</Text>
          </View>
        </View>

        {/* Before/After Toggle */}
        <View style={styles.beforeAfterToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, beforeAfterMode === 'before' && styles.toggleActive]}
            onPress={() => setBeforeAfterMode('before')}
          >
            <Text style={styles.toggleText}>Before</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, beforeAfterMode === 'after' && styles.toggleActive]}
            onPress={() => setBeforeAfterMode('after')}
          >
            <Text style={styles.toggleText}>After</Text>
          </TouchableOpacity>
        </View>

        {/* Capture Button */}
        <TouchableOpacity style={styles.captureButton}>
          <Text style={styles.captureIcon}>📸</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ControlsSection = () => (
    <View style={[styles.controlsSection, {width: controlsWidth}]}>
      <ScrollView
        style={styles.controlsScroll}
        contentContainerStyle={styles.controlsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Client Header */}
        <View style={styles.clientHeader}>
          <View style={styles.clientAvatar}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>Sarah Martinez</Text>
            <Text style={styles.consultationType}>New Consultation</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.actionIcon}>💾</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.actionIcon}>⋯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Color Display */}
        <Card style={styles.selectedColorCard}>
          <Text style={styles.selectedColorName}>{selectedColor.name}</Text>
          <Text style={styles.selectedColorBrand}>{selectedColor.brand} {selectedColor.line}</Text>
        </Card>

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
          {colorCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === category && styles.categoryTabTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand Filter */}
        <View style={styles.brandSection}>
          <Text style={styles.sectionLabel}>Brand:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandScroll}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.brandPill,
                  selectedBrand === brand && styles.brandPillActive,
                ]}
                onPress={() => setSelectedBrand(brand)}
              >
                <Text
                  style={[
                    styles.brandPillText,
                    selectedBrand === brand && styles.brandPillTextActive,
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Color Picker */}
        <View style={styles.colorPicker}>
          <Text style={styles.sectionLabel}>Colors:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.colorsScroll}
          >
            {mockColors.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color.hex}
                selected={selectedColor.id === color.id}
                onPress={() => handleColorSelect(color)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Compare Mode */}
        <View style={styles.compareSection}>
          <Text style={styles.sectionLabel}>Compare Mode:</Text>
          <View style={styles.compareGrid}>
            {[1, 2, 3, 4].map((num) => (
              <TouchableOpacity key={num} style={styles.compareCell}>
                <Text style={styles.compareCellText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="GENERATE FORMULA"
            onPress={handleGenerateFormula}
            style={styles.generateButton}
          />
          <View style={styles.secondaryButtons}>
            <Button
              title="Save"
              onPress={handleSave}
              variant="secondary"
              style={styles.secondaryButton}
            />
            <Button
              title="Email Preview"
              onPress={handleEmailPreview}
              variant="secondary"
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );

  if (IS_IPAD) {
    // Split-screen layout for iPad
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.splitContainer}>
          <CameraSection />
          <ControlsSection />
        </View>
      </SafeAreaView>
    );
  } else {
    // Stacked layout for iPhone
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stackedContainer}>
          <CameraSection />
          <ControlsSection />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deepCharcoal,
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  stackedContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cameraSection: {
    backgroundColor: COLORS.pureWhite,
  },
  cameraFeed: {
    flex: 1,
    position: 'relative',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.sm,
  },
  cameraSubtext: {
    ...TYPOGRAPHY.regular,
    color: COLORS.slateGray,
  },
  arOverlay: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: LAYOUT.borderRadius.md,
  },
  overlayText: {
    ...TYPOGRAPHY.regular,
    color: COLORS.pureWhite,
    fontWeight: '600',
  },
  beforeAfterToggle: {
    position: 'absolute',
    top: SPACING.xl,
    left: SPACING.xl,
    flexDirection: 'row',
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.xs,
    ...LAYOUT.shadow.light,
  },
  toggleButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: LAYOUT.borderRadius.sm,
  },
  toggleActive: {
    backgroundColor: COLORS.champagneGold,
  },
  toggleText: {
    ...TYPOGRAPHY.small,
    fontWeight: '600',
    color: COLORS.deepCharcoal,
  },
  captureButton: {
    position: 'absolute',
    bottom: SPACING.xl,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.champagneGold,
    justifyContent: 'center',
    alignItems: 'center',
    ...LAYOUT.shadow.heavy,
  },
  captureIcon: {
    fontSize: 32,
    color: COLORS.pureWhite,
  },
  controlsSection: {
    backgroundColor: COLORS.softCream,
  },
  controlsScroll: {
    flex: 1,
  },
  controlsContent: {
    padding: LAYOUT.screenPadding,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.sectionSpacing,
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.champagneGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.pureWhite,
    fontSize: 18,
    fontWeight: '600',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.deepCharcoal,
  },
  consultationType: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
  },
  selectedColorCard: {
    alignItems: 'center',
    marginBottom: LAYOUT.sectionSpacing,
  },
  selectedColorName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.xs,
  },
  selectedColorBrand: {
    ...TYPOGRAPHY.regular,
    color: COLORS.slateGray,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: LAYOUT.sectionSpacing,
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.xs,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: LAYOUT.borderRadius.sm,
    alignItems: 'center',
  },
  categoryTabActive: {
    backgroundColor: COLORS.champagneGold,
  },
  categoryTabText: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: COLORS.pureWhite,
    fontWeight: '600',
  },
  brandSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  sectionLabel: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  brandScroll: {
    marginBottom: SPACING.sm,
  },
  brandPill: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: LAYOUT.borderRadius.lg,
    backgroundColor: COLORS.pureWhite,
    marginRight: SPACING.sm,
    ...LAYOUT.shadow.light,
  },
  brandPillActive: {
    backgroundColor: COLORS.champagneGold,
  },
  brandPillText: {
    ...TYPOGRAPHY.small,
    fontWeight: '500',
    color: COLORS.deepCharcoal,
  },
  brandPillTextActive: {
    color: COLORS.pureWhite,
    fontWeight: '600',
  },
  colorPicker: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  colorsScroll: {
    marginTop: SPACING.sm,
  },
  compareSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  compareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  compareCell: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...LAYOUT.shadow.light,
  },
  compareCellText: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  actionButtons: {
    marginTop: SPACING.xl,
  },
  generateButton: {
    marginBottom: SPACING.lg,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  secondaryButton: {
    flex: 1,
  },
});
