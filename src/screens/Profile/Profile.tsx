import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabScreenProps} from 'types';
import {COLORS, FONTS, fontSize} from '~styles';

export default function ProfileScreen({}: TabScreenProps<'Profile'>) {
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
    backgroundColor: COLORS.Light,
  },
  title: {
    fontSize: fontSize(14),
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Dark,
  },
});
