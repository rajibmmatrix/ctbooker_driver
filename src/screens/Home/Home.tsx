import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabScreenProps} from 'types';
import {Container, Header} from '~common';
import {useTranslations} from '~translation';

export default function HomeScreen({}: TabScreenProps<'Home'>) {
  const translations = useTranslations();

  return (
    <Container>
      <Header title={translations.welcome} />
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
      </View>
    </Container>
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
