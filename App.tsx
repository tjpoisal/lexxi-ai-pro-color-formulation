import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LexxiSplashScreen} from './src/components/LexxiSplashScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function AppRoot() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashChecked, setSplashChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenLexxiSplash');
        if (!cancelled) {
          if (seen === 'true') {
            setShowSplash(false);
          } else {
            setShowSplash(true);
          }
          setSplashChecked(true);
        }
      } catch (e) {
        if (!cancelled) {
          setShowSplash(false);
          setSplashChecked(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSplashDone = () => {
    setShowSplash(false);
    AsyncStorage.setItem('hasSeenLexxiSplash', 'true').catch(() => {
      // non-critical
    });
  };

  if (!splashChecked) {
    // Initial blank state while we determine if splash has been seen
    return null;
  }

  if (showSplash) {
    return <LexxiSplashScreen onDone={handleSplashDone} />;
  }

  return <AppNavigator />;
}
