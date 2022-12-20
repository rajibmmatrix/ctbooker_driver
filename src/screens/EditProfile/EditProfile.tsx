import React, {useMemo, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Input, RadioButton} from '~common';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {editProfile, loading, useDispatch, useSelector} from '~app';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {showToaster} from '~utils';
import {IUserEdit, SideScreenProps} from 'types';

export default function EditProfileScreen({}: SideScreenProps<'EditProfile'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const user = useSelector(state => state.auth.user);

  const [form, setForm] = useState<IUserEdit>({
    first_name: user?.first_name,
    last_name: user?.last_name,
    company_name: user?.company_name,
    crn: user?.crn,
    customer_type: user?.customer_type,
    address: user?.address,
    phone: user?.phone,
  });

  const fullname = useMemo(
    () =>
      user?.customer_type === '0'
        ? `${user.first_name} ${user.last_name}`
        : user?.company_name,
    [user],
  );

  const chackValidation = (): boolean => {
    if (
      form.customer_type === '0' &&
      (!form.first_name?.trim() || !form.last_name?.trim())
    ) {
      return true;
    } else if (
      form.customer_type === '1' &&
      (!form.company_name?.trim() || !form.crn?.trim())
    ) {
      return true;
    } else if (
      !form.address?.trim() ||
      !form.phone?.trim() ||
      form.phone.trim().length < 10
    ) {
      return true;
    }
    return false;
  };

  const handleEditProfile = () => {
    if (chackValidation()) {
      return showToaster(translation.signup_error, 'error');
    }
    dispatch(loading(true));
    dispatch(editProfile(form))
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

  return (
    <Container>
      <Header title={translation.edit_profile} isBack />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Image source={IMAGES.Logo} style={styles.logo} />
          <Text style={styles.title}>{fullname}</Text>
          <Text style={styles.description}>{user?.email}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyTop}>
            <RadioButton
              title={translation.individual}
              isSelected={user?.customer_type === '0'}
              disabled={true}
            />
            <RadioButton
              title={translation.profesonal}
              disabled={true}
              isSelected={user?.customer_type === '1'}
            />
          </View>
          {form.customer_type === '0' ? (
            <>
              <Input
                Icon={Icons.User}
                title={translation.fname}
                placeholder={translation.fname}
                onChangeText={(e: string) => {
                  setForm(prev => ({...prev, first_name: e}));
                }}
                value={form.first_name}
              />
              <Input
                Icon={Icons.User}
                title={translation.lname}
                placeholder={translation.fname}
                onChangeText={(e: string) => {
                  setForm(prev => ({...prev, last_name: e}));
                }}
                value={form.last_name}
              />
            </>
          ) : (
            <>
              <Input
                Icon={Icons.User}
                title={translation.company_name}
                placeholder={translation.company_name}
                onChangeText={(e: string) => {
                  setForm(prev => ({...prev, company_name: e}));
                }}
                value={form.company_name}
              />
              <Input
                Icon={Icons.User}
                title={translation.crn}
                placeholder={translation.crn}
                onChangeText={(e: string) => {
                  setForm(prev => ({...prev, crn: e}));
                }}
                value={form.crn}
              />
            </>
          )}
          <Input
            Icon={Icons.Mobile}
            title={translation.mobile}
            placeholder={translation.mobile}
            onChangeText={(e: string) => {
              setForm(prev => ({...prev, phone: e}));
            }}
            maxLength={10}
            keyboardType="number-pad"
            value={form.phone}
          />
          <Input
            Icon={Icons.Location}
            title={translation.address}
            placeholder={translation.address}
            onChangeText={(e: string) => {
              setForm(prev => ({...prev, address: e}));
            }}
            value={form.address}
          />
          <Button
            title={translation.save}
            onPress={handleEditProfile}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.V45,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.Primary_Border,
    backgroundColor: COLORS.Gray,
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Primary_Text,
    marginTop: SIZES.V15,
  },
  description: {
    fontSize: fontSize(13),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    marginTop: SIZES.V15,
  },
  body: {
    flex: 1,
    paddingTop: SIZES.V12,
    paddingHorizontal: SIZES.H28,
  },
  bodyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: SIZES.V22,
  },
  button: {
    marginTop: SIZES.V22,
    alignSelf: 'center',
  },
});
