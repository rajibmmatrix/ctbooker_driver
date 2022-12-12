import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SideScreenProps} from 'types';

export default function VehicleDocumentsScreen({}: SideScreenProps<'VehicleDocuments'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon</Text>
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
