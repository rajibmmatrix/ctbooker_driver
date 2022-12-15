import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthContainer, Button, Input} from '~components';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {COLORS, FONTS, fontSize} from '~styles';
import {forgot, loading, useDispatch} from '~app';
import {showToaster} from '~utils';
import {StackScreenProps} from 'types';

export default function ForgotScreen({navigation}: StackScreenProps<'Forgot'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();

  const [email, setEmail] = useState('');

  const handleForgot = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (!email.trim() || !reg.test(email.trim())) {
      return showToaster(translation.enter_email, 'error');
    }
    dispatch(loading(true));
    dispatch(forgot({email}))
      .unwrap()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({index: 1, routes: [{name: 'Login'}]}),
        );
      })
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

  return (
    <AuthContainer
      scrollEnabled={false}
      title={`${translation.forgot_password}?`}
      description={translation.forgot_description}>
      <View style={styles.container}>
        <Input
          Icon={Icons.SMS}
          title={translation.email}
          placeholder={translation.email}
          autoCapitalize="none"
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <Button
          title={translation.send}
          onPress={handleForgot}
          style={styles.button}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            {translation.already_have_an_account_login}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.footer}>
          <Text style={styles.footerLink}>{translation.signup}</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  button: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  link: {
    fontSize: fontSize(12),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary,
    lineHeight: 14,
    textAlign: 'center',
  },
  footer: {
    marginTop: 50,
  },
  footerLink: {
    fontSize: fontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Dark,
    lineHeight: 16,
    textAlign: 'center',
  },
});
