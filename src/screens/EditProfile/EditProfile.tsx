import React, {useMemo} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Container, Header, Input} from '~common';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {useSelector} from '~app';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {SideScreenProps} from 'types';

export default function EditProfileScreen({}: SideScreenProps<'EditProfile'>) {
  const {translation} = useTranslations();
  const user = useSelector(state => state.auth.user);

  const fullname = useMemo(
    () =>
      user?.customer_type === '0'
        ? `${user.first_name} ${user.last_name}`
        : user?.company_name,
    [user],
  );

  const handleEditProfile = () => {};

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
          <Input
            Icon={Icons.Unlock}
            title={translation.fname}
            placeholder={translation.fname}
          />
          <Input
            Icon={Icons.Unlock}
            title={translation.lname}
            placeholder={translation.fname}
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
    paddingTop: SIZES.V22,
    paddingHorizontal: SIZES.H28,
  },
  button: {
    marginTop: SIZES.V22,
    alignSelf: 'center',
  },
});
