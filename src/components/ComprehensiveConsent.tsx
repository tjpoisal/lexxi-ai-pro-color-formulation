import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {Button, Card} from './ui';
import {COLORS, TYPOGRAPHY, SPACING, LAYOUT} from '../config/theme';
import SignatureCapture from './SignatureCapture';

const ACKNOWLEDGMENTS = [
  'I have provided complete hair history including all treatments.',
  'I understand results may vary based on hair condition.',
  'I reviewed and approved the AR preview simulation.',
  'I understand lightening may cause dryness or damage.',
  'I agree to follow aftercare instructions for 48 hours.',
  'I must contact within 7 days if dissatisfied.',
  'I acknowledge fashion colors fade quickly.',
  'I release stylist from liability for adverse reactions.',
  'I understand corrections may incur additional charges.',
];

interface ComprehensiveConsentProps {
  clientName: string;
  stylistName: string;
  serviceDescription: string;
  formula: string;
  cost: number;
  onComplete: (signatures: {client: string; stylist: string}) => void;
}

export default function ComprehensiveConsent({
  clientName,
  stylistName,
  serviceDescription,
  formula,
  cost,
  onComplete,
}: ComprehensiveConsentProps) {
  const [checkedItems, setCheckedItems] = useState(new Array(9).fill(false));
  const [clientSignature, setClientSignature] = useState('');
  const [stylistSignature, setStylistSignature] = useState('');
  const [showClientSig, setShowClientSig] = useState(false);
  const [showStylistSig, setShowStylistSig] = useState(false);

  const allChecked = checkedItems.every(item => item);

  const handleSubmit = () => {
    if (!allChecked || !clientSignature || !stylistSignature) {
      Alert.alert('Incomplete', 'All fields required');
      return;
    }
    onComplete({client: clientSignature, stylist: stylistSignature});
  };

  const toggleAcknowledgment = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hair Color Service Agreement</Text>
          <Text style={styles.subtitle}>& Liability Waiver</Text>
        </View>

        {/* Client Info Section */}
        <Card style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Client:</Text>
            <Text style={styles.infoValue}>{clientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stylist:</Text>
            <Text style={styles.infoValue}>{stylistName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
          </View>
        </Card>

        {/* Service Summary */}
        <Card style={styles.serviceSection}>
          <Text style={styles.sectionTitle}>Service Summary</Text>
          <Text style={styles.serviceDescription}>{serviceDescription}</Text>
          <Text style={styles.formulaTitle}>Formula:</Text>
          <Text style={styles.formulaText}>{formula}</Text>
          <View style={styles.costHighlight}>
            <Text style={styles.costLabel}>Cost:</Text>
            <Text style={styles.costValue}>${cost.toFixed(2)}</Text>
          </View>
        </Card>

        {/* Acknowledgments */}
        <Card style={styles.acknowledgmentsSection}>
          <Text style={styles.sectionTitle}>Acknowledgments</Text>
          <Text style={styles.acknowledgmentsNote}>Please check each acknowledgment:</Text>

          {ACKNOWLEDGMENTS.map((ack, i) => (
            <TouchableOpacity
              key={i}
              style={styles.acknowledgmentRow}
              onPress={() => toggleAcknowledgment(i)}
            >
              <View style={[styles.checkbox, checkedItems[i] && styles.checkboxChecked]}>
                {checkedItems[i] && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.acknowledgmentText, checkedItems[i] && styles.acknowledgmentTextChecked]}>
                {ack}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Signature Areas */}
        <View style={styles.signaturesSection}>
          <View style={styles.signatureContainer}>
            {!showClientSig ? (
              <TouchableOpacity
                style={[styles.signatureButton, clientSignature && styles.signatureButtonSigned]}
                onPress={() => setShowClientSig(true)}
              >
                <Text style={[styles.signatureButtonText, clientSignature && styles.signatureButtonTextSigned]}>
                  {clientSignature ? '✓ Client Signature Complete' : 'Client Signature'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.signatureCapture}>
                <Text style={styles.signatureLabel}>Client Signature:</Text>
                <SignatureCapture
                  onSigned={(sig) => {
                    setClientSignature(sig);
                    setShowClientSig(false);
                  }}
                />
              </View>
            )}
          </View>

          <View style={styles.signatureContainer}>
            {!showStylistSig ? (
              <TouchableOpacity
                style={[styles.signatureButton, stylistSignature && styles.signatureButtonSigned]}
                onPress={() => setShowStylistSig(true)}
              >
                <Text style={[styles.signatureButtonText, stylistSignature && styles.signatureButtonTextSigned]}>
                  {stylistSignature ? '✓ Stylist Signature Complete' : 'Stylist Signature'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.signatureCapture}>
                <Text style={styles.signatureLabel}>Stylist Signature:</Text>
                <SignatureCapture
                  onSigned={(sig) => {
                    setStylistSignature(sig);
                    setShowStylistSig(false);
                  }}
                />
              </View>
            )}
          </View>
        </View>

        {/* Finalize Button */}
        <View style={styles.finalizeSection}>
          <Button
            title="FINALIZE & PROCEED"
            onPress={handleSubmit}
            disabled={!allChecked || !clientSignature || !stylistSignature}
            style={styles.finalizeButton}
          />
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
    paddingVertical: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.deepCharcoal,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.regular,
    color: COLORS.slateGray,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    flex: 2,
  },
  serviceSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h5,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.sm,
  },
  serviceDescription: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.md,
  },
  formulaTitle: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  formulaText: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  costHighlight: {
    backgroundColor: COLORS.champagneGold,
    borderRadius: LAYOUT.borderRadius.sm,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    ...TYPOGRAPHY.h6,
    color: COLORS.pureWhite,
    fontWeight: '600',
  },
  costValue: {
    ...TYPOGRAPHY.h4,
    color: COLORS.pureWhite,
    fontWeight: '700',
  },
  acknowledgmentsSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  acknowledgmentsNote: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
    marginBottom: SPACING.md,
  },
  acknowledgmentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.champagneGold,
    borderRadius: 4,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.pureWhite,
  },
  checkboxChecked: {
    backgroundColor: COLORS.champagneGold,
  },
  checkmark: {
    color: COLORS.pureWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  acknowledgmentText: {
    ...TYPOGRAPHY.small,
    color: COLORS.deepCharcoal,
    flex: 1,
    lineHeight: 20,
  },
  acknowledgmentTextChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.slateGray,
  },
  signaturesSection: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  signatureContainer: {
    marginBottom: SPACING.lg,
  },
  signatureButton: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
  },
  signatureButtonSigned: {
    borderColor: COLORS.successGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  signatureButtonText: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  signatureButtonTextSigned: {
    color: COLORS.successGreen,
  },
  signatureCapture: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  signatureLabel: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  finalizeSection: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  finalizeButton: {
    width: '100%',
  },
});
