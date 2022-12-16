import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Header} from '~common';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, FONTS, fontSize} from '~styles';
import {TabScreenProps} from 'types';

export default function ProfileScreen({navigation}: TabScreenProps<'Profile'>) {
  const {translation} = useTranslations();

  return (
    <Container>
      <Header
        title={translation.my_profile}
        RightIcon={Icons.EditProfile}
        onRightPress={() => navigation.navigate('EditProfile')}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Coming soon</Text>
      </View>
    </Container>
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
