import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.containerLogo}>
      <Image
        style={styles.logo}
        source={require('../imagens/react-native-logo.png')}
      />
      <Image 
        style={styles.logo} 
        source={require('../imagens/firebase-logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  containerLogo: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 25,
  },
});