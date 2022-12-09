import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthContainer, Button, Input} from '~components';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize} from '~styles';
import {StackScreenProps} from 'types';
import {loading, useDispatch} from '~app';

export default function LoginScreen({navigation}: StackScreenProps<'Login'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const [form, setForm] = useState({email: '', password: ''});

  const handleLogin = () => {
    dispatch(loading(true));
    setTimeout(() => {
      dispatch(loading(false));
      navigation.dispatch(
        CommonActions.reset({index: 1, routes: [{name: 'Sidebar'}]}),
      );
    }, 3000);
  };

  return (
    <AuthContainer
      title={translation.to_login}
      description={translation.please_login_to_continue}>
      <View style={styles.container}>
        <Input
          Icon={Icons.SMS}
          title={translation.email}
          placeholder={translation.email}
          autoCapitalize="none"
          onChangeText={value => setForm(prev => ({...prev, email: value}))}
          value={form.email}
        />
        <Input
          Icon={Icons.Unlock}
          placeholder="********"
          secureTextEntry={true}
          onChangeText={value => setForm(prev => ({...prev, password: value}))}
          value={form.password}
        />
        <Button
          title={translation.login}
          onPress={handleLogin}
          style={styles.button}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.link}>{translation.forgot_password}</Text>
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
