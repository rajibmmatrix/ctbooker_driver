import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Container, Header} from '~common';
import {Icons, IMAGES} from '~constants';
import {useTranslations} from '~translation';
import {useSelector} from '~app';
import {COLORS, FONTS, fontSize, _styles} from '~styles';
import {TabScreenProps} from 'types';

export default function HomeScreen({navigation}: TabScreenProps<'Home'>) {
  const {translation} = useTranslations();

  const user = useSelector(state => state.auth.user);

  const fullname = useMemo(
    () =>
      user?.customer_type === '0'
        ? `${user.first_name} ${user.last_name}`
        : user?.company_name,
    [user],
  );

  return (
    <Container>
      <Header title={translation.welcome} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={_styles.rowCenter}>
          <Avatar uri={user?.profile} style={styles.headerLogo} />
          <View style={styles.headerBody}>
            <Text style={styles.title}>{fullname}</Text>
            <View style={_styles.rowCenter}>
              <Icons.SmallCar />
              <Text style={styles.description}>Honda WR-V</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Booking')}
          style={styles.body}>
          <Icons.BigDriving width={74} height={74} />
          <Text style={styles.bigTitle}>{translation.summary}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <View style={_styles.container}>
            <Text style={styles.footerTitle}>
              Économiser 20% sur la réservation
            </Text>
            <View style={styles.footerButton}>
              <Text style={styles.buttonTitle}>Réservez maintenant</Text>
            </View>
          </View>
          <Image source={IMAGES.Ads} style={styles.ads} />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerLogo: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: COLORS.Primary_Modal,
    resizeMode: 'cover',
  },
  headerBody: {
    marginLeft: 10,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    lineHeight: 21,
    color: COLORS.Dark,
  },
  description: {
    fontSize: fontSize(14),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    marginLeft: 5,
  },
  body: {
    height: 178,
    marginTop: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.Primary,
  },
  bigTitle: {
    fontSize: fontSize(22),
    fontWeight: '700',
    fontFamily: FONTS.Secondary_Bold,
    lineHeight: 33,
    color: COLORS.Light,
    marginTop: 18,
  },
  footer: {
    height: 180,
    marginTop: 33,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.Others[0],
    borderRadius: 15,
    paddingLeft: 20,
  },
  footerTitle: {
    fontSize: fontSize(22),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 26,
    color: COLORS.Others[1],
  },
  footerButton: {
    height: 40,
    marginTop: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.Primary_Link,
  },
  buttonTitle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 16,
    color: COLORS.Light,
  },
  ads: {
    right: -10,
    width: 166,
    height: 136,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
