import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ComprehensiveConsent from '../components/ComprehensiveConsent';

export default function ConsentScreen() {
  const navigation = useNavigation();

  const handleConsentComplete = (signatures: {client: string; stylist: string}) => {
    // Process signature data here if needed
    console.log('Signatures captured:', signatures);

    Alert.alert(
      'Consent Form Complete',
      'The service agreement has been signed and saved.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to home or to patch test if needed
            navigation.navigate('Home' as never);
          },
        },
      ]
    );
  };

  return (
    <ComprehensiveConsent
      clientName="Sarah Martinez"
      stylistName="Alex Rivera"
      serviceDescription="Warm Caramel Balayage with toner refresh"
      formula="Redken Shades EQ 06NB + Wella Blondor Multi-Blonde + Wella Color Touch toner"
      cost={207.50}
      onComplete={handleConsentComplete}
    />
  );
}
