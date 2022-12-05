import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from 'types';

export default function SignupScreen({}: StackScreenProps<'Signup'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
});
