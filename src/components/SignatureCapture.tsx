import React, {useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

export default function SignatureCapture({onSigned}) {
  const ref = useRef(null);

  const handleEnd = (signature) => {
    onSigned(signature);
  };

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={ref}
        onEnd={handleEnd}
        webStyle={`
          .m-signature-pad {border: 2px solid #D4AF37; border-radius: 8px;}
          .m-signature-pad--footer {display: none;}
        `}
      />
      <TouchableOpacity style={styles.clear} onPress={() => ref.current?.clearSignature()}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {height: 200, margin: 20},
  clear: {marginTop: 10, padding: 10, backgroundColor: '#ccc', borderRadius: 4},
  clearText: {textAlign: 'center', fontWeight: 'bold'},
});
