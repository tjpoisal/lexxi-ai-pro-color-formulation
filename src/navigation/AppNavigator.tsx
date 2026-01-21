import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ConsultationScreen from '../screens/ConsultationScreen';
import FormulaScreen from '../screens/FormulaScreen';
import ConsentScreen from '../screens/ConsentScreen';
import PatchTestScreen from '../screens/PatchTestScreen';
import ArTryOnScreen from '../screens/ArTryOnScreen';

export type RootStackParamList = {
  Home: undefined;
  Consultation: undefined;
  Formula: undefined;
  ArTryOn: undefined;
  Consent: undefined;
  PatchTest: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Consultation" component={ConsultationScreen} />
        <Stack.Screen name="Formula" component={FormulaScreen} />
        <Stack.Screen name="ArTryOn" component={ArTryOnScreen} />
        <Stack.Screen name="Consent" component={ConsentScreen} />
        <Stack.Screen name="PatchTest" component={PatchTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
