import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthContainer, Button, Input, SignupButton} from '~components';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';
import {StackScreenProps} from 'types';
import {loading, useDispatch} from '~app';

export default function SignupScreen({navigation}: StackScreenProps<'Signup'>) {
  const dispatch = useDispatch();
  const translations = useTranslations();
  const [form, setForm] = useState({email: '', password: ''});

  const handleSignup = () => {
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
      title={translations.register}
      description={translations.please_register_to_continue}>
      <View style={styles.container}>
        <SignupButton
          Icon={Icons.Profile}
          isSelected={false}
          color={COLORS.Buttons[1]}
          title={translations.individual}
          onPress={() => {}}
        />
        <SignupButton
          Icon={Icons.UserSquare}
          isSelected={false}
          color={COLORS.Buttons[0]}
          title={translations.profesonal}
          style={styles.topButton}
          onPress={() => {}}
        />
        <Input
          Icon={Icons.User}
          title={translations.fname}
          placeholder="Jhone"
          onChangeText={value => setForm(prev => ({...prev, email: value}))}
          value={form.email}
        />
        <Input
          Icon={Icons.User}
          placeholder="Doe"
          onChangeText={value => setForm(prev => ({...prev, email: value}))}
          value={form.email}
        />
        <Input
          Icon={Icons.SMS}
          placeholder="user@email.com"
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
          title={translations.register}
          onPress={handleSignup}
          style={styles.button}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            {translations.already_have_an_account_login}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 31,
  },
  topButton: {
    marginBottom: 24,
  },
  button: {
    marginTop: 22,
    marginBottom: 35,
    alignSelf: 'center',
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Dark,
    lineHeight: 16,
    textAlign: 'center',
  },
});
