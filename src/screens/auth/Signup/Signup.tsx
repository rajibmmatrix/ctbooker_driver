import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {AuthContainer, Button, Input, SignupButton} from '~components';
import {useTranslations} from '~translation';
import {Icons} from '~constants';
import {loading, signup, useDispatch} from '~app';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {showToaster} from '~utils';
import {StackScreenProps} from 'types';

interface INPUT {
  customer_type: '0' | '1';
  first_name?: string;
  last_name?: string;
  company_name?: string;
  crn?: string;
  email: string;
  password: string;
}

export default function SignupScreen({navigation}: StackScreenProps<'Signup'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const [form, setForm] = useState<INPUT>({
    customer_type: '0',
    first_name: '',
    last_name: '',
    company_name: '',
    crn: '',
    email: '',
    password: '',
  });

  const checkValidation = () => {
    let status = false;
    let isEmailValide = true;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (form.customer_type === '0' && !form?.first_name?.trim()) {
      status = true;
    } else if (form.customer_type === '0' && !form?.last_name?.trim()) {
      status = true;
    } else if (form.customer_type === '1' && !form?.company_name?.trim()) {
      status = true;
    } else if (form.customer_type === '1' && !form?.crn?.trim()) {
      status = true;
    } else if (!form.email.trim()) {
      status = true;
    } else if (!reg.test(form.email.trim())) {
      status = true;
      isEmailValide = false;
    } else if (!form.password.trim() || form.password.length < 8) {
      status = true;
    }
    return {status, isEmailValide};
  };

  const handleSignup = () => {
    const {status, isEmailValide} = checkValidation();
    if (status) {
      return showToaster(
        !isEmailValide ? translation.enter_email : translation.signup_error,
        'error',
      );
    }
    let params = {...form};
    if (form.customer_type === '0') {
      delete params.company_name;
      delete params.crn;
    } else if (form.customer_type === '1') {
      delete params.first_name;
      delete params.last_name;
    }
    dispatch(loading(true));
    dispatch(signup(params))
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
      title={translation.register}
      description={translation.please_register_to_continue}>
      <View style={styles.container}>
        <SignupButton
          Icon={Icons.Profile}
          isSelected={form.customer_type === '0'}
          color={COLORS.Buttons[1]}
          title={translation.individual}
          onPress={() => setForm(prev => ({...prev, customer_type: '0'}))}
        />
        <SignupButton
          Icon={Icons.UserSquare}
          isSelected={form.customer_type === '1'}
          color={COLORS.Buttons[0]}
          title={translation.profesonal}
          style={styles.topButton}
          onPress={() => setForm(prev => ({...prev, customer_type: '1'}))}
        />
        {form.customer_type === '0' ? (
          <>
            <Input
              Icon={Icons.User}
              title={translation.fname}
              placeholder="Jhone"
              onChangeText={value => {
                setForm(prev => ({...prev, first_name: value}));
              }}
              value={form.first_name}
            />
            <Input
              Icon={Icons.User}
              placeholder="Doe"
              onChangeText={value =>
                setForm(prev => ({...prev, last_name: value}))
              }
              value={form.last_name}
            />
          </>
        ) : (
          <>
            <Input
              Icon={Icons.User}
              title={translation.company_name}
              placeholder="Jhone"
              onChangeText={value => {
                setForm(prev => ({...prev, company_name: value}));
              }}
              value={form.company_name}
            />
            <Input
              Icon={Icons.User}
              title={translation.crn}
              placeholder="CR001"
              onChangeText={value => setForm(prev => ({...prev, crn: value}))}
              value={form.crn}
            />
          </>
        )}
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
          title={translation.register}
          onPress={handleSignup}
          style={styles.button}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            {translation.already_have_an_account_login}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.V15 * 2,
  },
  topButton: {
    marginBottom: 24,
  },
  button: {
    marginTop: SIZES.V22,
    marginBottom: 35,
    alignSelf: 'center',
  },
  link: {
    fontSize: fontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Dark,
    lineHeight: 16,
    textAlign: 'center',
  },
});
