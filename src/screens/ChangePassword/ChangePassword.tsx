import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Container, Header, Input} from '~common';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {loading, useDispatch} from '~app';
import {SIZES} from '~styles';
import {ICPassword, SideScreenProps} from 'types';
import {api, showToaster} from '~utils';

export default function ChangePasswordScreen({
  navigation,
}: SideScreenProps<'ChangePassword'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();

  const [form, setForm] = useState<ICPassword>({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const checkValidation = (): boolean => {
    return true;
  };

  const handleChangePassword = () => {
    if (checkValidation()) {
      return showToaster(translation.signup_error, 'error');
    }
    dispatch(loading(true));
    api
      .changePassword(form)
      .then((res: any) => {
        showToaster(res.message, 'success');
        navigation.goBack();
      })
      .catch(err => showToaster(err, 'error'))
      .finally(() => dispatch(loading(false)));
  };

  return (
    <Container>
      <Header title={translation.change_password} isBack />
      <View style={styles.body}>
        <Input
          Icon={Icons.Unlock}
          title={translation.old_password}
          placeholder="******"
          secureTextEntry={true}
          onChangeText={e => setForm(prev => ({...prev, old_password: e}))}
          value={form.old_password}
        />
        <Input
          Icon={Icons.Unlock}
          title={translation.new_password}
          placeholder="******"
          secureTextEntry={true}
          onChangeText={e => setForm(prev => ({...prev, new_password: e}))}
          value={form.new_password}
        />
        <Input
          Icon={Icons.Unlock}
          title={translation.confirm_password}
          placeholder="******"
          secureTextEntry={true}
          onChangeText={e => setForm(prev => ({...prev, confirm_password: e}))}
          value={form.confirm_password}
        />
        <Button
          title={translation.save}
          onPress={handleChangePassword}
          style={styles.button}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: SIZES.V22,
    paddingHorizontal: SIZES.H28,
  },
  button: {
    marginTop: SIZES.V22,
    alignSelf: 'center',
  },
});
