import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert} from 'react-native';
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

export default function ComprehensiveConsent({clientName, stylistName, serviceDescription, formula, cost, onComplete}) {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HAIR COLOR SERVICE AGREEMENT</Text>
        <Text style={styles.subtitle}>& LIABILITY WAIVER</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>CLIENT: {clientName}</Text>
        <Text style={styles.label}>STYLIST: {stylistName}</Text>
        <Text style={styles.label}>DATE: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SERVICE:</Text>
        <Text style={styles.value}>{serviceDescription}</Text>
        <Text style={styles.sectionTitle}>FORMULA:</Text>
        <Text style={styles.value}>{formula}</Text>
        <Text style={styles.cost}>TOTAL: ${cost.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACKNOWLEDGMENTS (Initial each):</Text>
        {ACKNOWLEDGMENTS.map((ack, i) => (
          <TouchableOpacity key={i} style={styles.row} onPress={() => {
            const newChecked = [...checkedItems];
            newChecked[i] = !newChecked[i];
            setCheckedItems(newChecked);
          }}>
            <View style={[styles.checkbox, checkedItems[i] && styles.checked]}>
              {checkedItems[i] && <Text style={styles.check}>✓</Text>}
            </View>
            <Text style={styles.ackText}>{ack}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {!showClientSig ? (
        <TouchableOpacity style={styles.sigButton} onPress={() => setShowClientSig(true)}>
          <Text style={styles.sigButtonText}>{clientSignature ? '✓ Client Signed' : 'CLIENT SIGNATURE'}</Text>
        </TouchableOpacity>
      ) : (
        <SignatureCapture onSigned={(sig) => {setClientSignature(sig); setShowClientSig(false);}} />
      )}

      {!showStylistSig ? (
        <TouchableOpacity style={styles.sigButton} onPress={() => setShowStylistSig(true)}>
          <Text style={styles.sigButtonText}>{stylistSignature ? '✓ Stylist Signed' : 'STYLIST SIGNATURE'}</Text>
        </TouchableOpacity>
      ) : (
        <SignatureCapture onSigned={(sig) => {setStylistSignature(sig); setShowStylistSig(false);}} />
      )}

      <TouchableOpacity
        style={[styles.submit, (!allChecked || !clientSignature || !stylistSignature) && styles.disabled]}
        onPress={handleSubmit}
        disabled={!allChecked || !clientSignature || !stylistSignature}
      >
        <Text style={styles.submitText}>FINALIZE & PROCEED</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {padding: 20, backgroundColor: '#2C2C2C', alignItems: 'center'},
  title: {fontSize: 20, fontWeight: 'bold', color: '#D4AF37'},
  subtitle: {fontSize: 14, color: '#fff', marginTop: 4},
  section: {padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee'},
  label: {fontSize: 14, color: '#333', marginBottom: 8},
  sectionTitle: {fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 4},
  value: {fontSize: 14, color: '#666', marginBottom: 8},
  cost: {fontSize: 20, fontWeight: 'bold', color: '#D4AF37', marginTop: 8},
  row: {flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12},
  checkbox: {width: 24, height: 24, borderWidth: 2, borderColor: '#D4AF37', borderRadius: 4, marginRight: 8},
  checked: {backgroundColor: '#D4AF37'},
  check: {color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
  ackText: {flex: 1, fontSize: 13, color: '#333'},
  sigButton: {margin: 20, padding: 16, backgroundColor: '#D4AF37', borderRadius: 8, alignItems: 'center'},
  sigButtonText: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  submit: {margin: 20, padding: 20, backgroundColor: '#D4AF37', borderRadius: 8},
  disabled: {backgroundColor: '#ccc'},
  submitText: {fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center'},
});
