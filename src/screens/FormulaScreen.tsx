import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Card} from '../components/ui';
import {COLORS, TYPOGRAPHY, SPACING, LAYOUT} from '../config/theme';

// Mock formula data
const mockFormula = {
  clientName: 'Sarah Martinez',
  desiredColor: 'Warm Caramel Balayage',
  startingLevel: 'Level 5',
  technique: 'Hand-painted balayage',
  processingTime: '2.5 hours total',
  baseColor: {
    product: 'Redken Shades EQ 06NB',
    amount: '60g',
    developer: 'Processing Solution 20vol',
    developerAmount: '90ml',
    ratio: '1:1.5',
    processing: '20 min',
  },
  highlightFormula: {
    product: 'Wella Blondor Multi-Blonde',
    amount: '30g',
    developer: 'Welloxon Perfect 30vol',
    developerAmount: '90ml',
    olaplex: 'Olaplex No.1',
    olaplexAmount: '7.5ml',
    ratio: '1:3 + bond',
    processing: '25-30 min',
  },
  tonerFormula: {
    product1: 'Wella Color Touch 9/16',
    amount1: '30g',
    product2: 'Wella Color Touch 8/3',
    amount2: '15g',
    emulsion: 'Emulsion 1.9%',
    emulsionAmount: '90ml',
    ratio: '1:2',
    processing: '20 min',
  },
  costAnalysis: {
    products: 42.50,
    serviceFee: 165.00,
    total: 207.50,
    margin: 77,
  },
  maintenance: 'Toner refresh in 6-8 weeks',
  alternatives: [
    'Full Highlights $245',
    'Single Process $135',
  ],
};

export default function FormulaScreen() {
  const navigation = useNavigation();

  const handleApproveContinue = () => {
    navigation.navigate('Consent' as never);
  };

  const handleModifyFormula = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Save to library
  };

  const FormulaSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.formulaSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>COLOR FORMULA</Text>
          <Text style={styles.clientName}>{mockFormula.clientName}</Text>
          <Text style={styles.desiredColor}>{mockFormula.desiredColor}</Text>
          <Text style={styles.startingLevel}>Starting Level: {mockFormula.startingLevel}</Text>
        </View>

        <Card style={styles.formulaCard}>
          {/* Technique */}
          <FormulaSection title="🎨 TECHNIQUE">
            <Text style={styles.sectionContent}>{mockFormula.technique}</Text>
          </FormulaSection>

          {/* Processing Time */}
          <FormulaSection title="⏱️ PROCESSING">
            <Text style={styles.sectionContent}>{mockFormula.processingTime}</Text>
          </FormulaSection>

          {/* Formula Breakdown */}
          <View style={styles.formulaDivider} />

          {/* Base Color */}
          <FormulaSection title="BASE COLOR (Roots)">
            <View style={styles.formulaItem}>
              <Text style={styles.productText}>• {mockFormula.baseColor.product} ............ {mockFormula.baseColor.amount}</Text>
              <Text style={styles.productText}>• {mockFormula.baseColor.developer} ........ {mockFormula.baseColor.developerAmount}</Text>
              <Text style={styles.productText}>• Ratio: {mockFormula.baseColor.ratio} | Processing: {mockFormula.baseColor.processing}</Text>
            </View>
          </FormulaSection>

          {/* Highlight Formula */}
          <FormulaSection title="HIGHLIGHT FORMULA (Mid-lengths)">
            <View style={styles.formulaItem}>
              <Text style={styles.productText}>• {mockFormula.highlightFormula.product} ....... {mockFormula.highlightFormula.amount}</Text>
              <Text style={styles.productText}>• {mockFormula.highlightFormula.developer} ........... {mockFormula.highlightFormula.developerAmount}</Text>
              <Text style={styles.productText}>• {mockFormula.highlightFormula.olaplex} ..................... {mockFormula.highlightFormula.olaplexAmount}</Text>
              <Text style={styles.productText}>• Ratio: {mockFormula.highlightFormula.ratio} | Processing: {mockFormula.highlightFormula.processing}</Text>
            </View>
          </FormulaSection>

          {/* Toner Formula */}
          <FormulaSection title="TONER (Ends)">
            <View style={styles.formulaItem}>
              <Text style={styles.productText}>• {mockFormula.tonerFormula.product1} ........... {mockFormula.tonerFormula.amount1}</Text>
              <Text style={styles.productText}>• {mockFormula.tonerFormula.product2} ............ {mockFormula.tonerFormula.amount2}</Text>
              <Text style={styles.productText}>• {mockFormula.tonerFormula.emulsion} .................... {mockFormula.tonerFormula.emulsionAmount}</Text>
              <Text style={styles.productText}>• Ratio: {mockFormula.tonerFormula.ratio} | Processing: {mockFormula.tonerFormula.processing}</Text>
            </View>
          </FormulaSection>

          <View style={styles.formulaDivider} />

          {/* Cost Analysis */}
          <FormulaSection title="COST ANALYSIS">
            <View style={styles.costTable}>
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Color Products</Text>
                <Text style={styles.costValue}>${mockFormula.costAnalysis.products}</Text>
              </View>
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Service Fee</Text>
                <Text style={styles.costValue}>${mockFormula.costAnalysis.serviceFee}</Text>
              </View>
              <View style={[styles.costRow, styles.costTotalRow]}>
                <Text style={[styles.costLabel, styles.costTotalLabel]}>TOTAL</Text>
                <Text style={[styles.costValue, styles.costTotalValue]}>${mockFormula.costAnalysis.total}</Text>
              </View>
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>PROFIT MARGIN</Text>
                <Text style={styles.costValue}>{mockFormula.costAnalysis.margin}%</Text>
              </View>
            </View>
          </FormulaSection>

          {/* Maintenance */}
          <FormulaSection title="MAINTENANCE">
            <Text style={styles.sectionContent}>{mockFormula.maintenance}</Text>
          </FormulaSection>

          {/* Alternatives */}
          <View style={styles.alternativesSection}>
            <Text style={styles.alternativesTitle}>Alternatives:</Text>
            <View style={styles.alternativesChips}>
              {mockFormula.alternatives.map((alternative, index) => (
                <TouchableOpacity key={index} style={styles.alternativeChip}>
                  <Text style={styles.alternativeChipText}>{alternative}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="✓ APPROVE & CONTINUE"
            onPress={handleApproveContinue}
            style={styles.approveButton}
          />
          <View style={styles.secondaryButtons}>
            <Button
              title="✎ Modify"
              onPress={handleModifyFormula}
              variant="secondary"
              style={styles.secondaryButton}
            />
            <Button
              title="💾 Save"
              onPress={handleSave}
              variant="secondary"
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softCream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginBottom: LAYOUT.sectionSpacing,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.sm,
  },
  clientName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.champagneGold,
    marginBottom: SPACING.xs,
  },
  desiredColor: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  startingLevel: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
  },
  formulaCard: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  formulaSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h5,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.sm,
  },
  sectionContent: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    lineHeight: 24,
  },
  formulaDivider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.lg,
  },
  formulaItem: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  productText: {
    ...TYPOGRAPHY.formula,
    color: COLORS.deepCharcoal,
    fontFamily: 'monospace',
    marginBottom: SPACING.xs,
  },
  costTable: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  costTotalRow: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.softCream,
  },
  costLabel: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    flex: 1,
  },
  costValue: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  costTotalLabel: {
    fontWeight: '700',
  },
  costTotalValue: {
    ...TYPOGRAPHY.h4,
    color: COLORS.champagneGold,
  },
  alternativesSection: {
    marginTop: SPACING.lg,
  },
  alternativesTitle: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  alternativesChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  alternativeChip: {
    backgroundColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  alternativeChipText: {
    ...TYPOGRAPHY.small,
    color: COLORS.deepCharcoal,
    fontWeight: '500',
  },
  actionButtons: {
    marginTop: SPACING.xl,
  },
  approveButton: {
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