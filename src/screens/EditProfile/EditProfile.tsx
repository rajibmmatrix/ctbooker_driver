import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Container,
  Header,
  ImagePicker,
  Input,
  RadioButton,
} from '~components';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {
  editProfile,
  editProfilePic,
  loading,
  useDispatch,
  useSelector,
} from '~app';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';
import {showToaster} from '~utils';
import {IUserEdit, SideScreenProps} from 'types';

export default function EditProfileScreen({}: SideScreenProps<'EditProfile'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const user = useSelector(state => state.auth.user);

  const [showPickup, setShowPickup] = useState<boolean>(false);
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

  const handleProfilePic = (image: string) => {
    dispatch(loading(true));
    dispatch(editProfilePic({profile: image}))
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(loading(false)));
  };

  return (
    <Container>
      <Header title={translation.edit_profile} isBack />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <Avatar uri={user?.profile} style={styles.logo} />
            <TouchableOpacity
              onPress={() => setShowPickup(true)}
              style={styles.headerButton}>
              <Icons.EditProfilePic width={16} height={16} />
            </TouchableOpacity>
          </View>
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
      <ImagePicker
        show={showPickup}
        onClose={() => setShowPickup(false)}
        onChose={handleProfilePic}
      />
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
  headerLogo: {
    width: 125,
    height: 125,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: COLORS.Gray,
    borderColor: COLORS.Primary_Border,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
  headerButton: {
    right: 3,
    bottom: 3,
    padding: SIZES.H5,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.Primary_Border,
    backgroundColor: COLORS.Primary_Card,
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
