import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ControleEstacionamento from './ControleEstacionamento';

export default function App() {
  return (
    <View style={styles.container}>
      <ControleEstacionamento></ControleEstacionamento>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100
  },
});
