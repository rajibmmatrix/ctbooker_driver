import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Container, Header, IconButton} from '~common';
import {useTranslations} from '~translation';
import {TabScreenProps} from 'types';
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';
import {Icons} from '~constants';

export default function BookingScreen({}: TabScreenProps<'Booking'>) {
  const {translation} = useTranslations();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Container>
      <Header
        title={
          isSelected ? translation.summary : translation.new_reservation_request
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.card}>
            <Text style={[styles.title, styles.mb7]}>
              {translation.date_of_withdrawal}
            </Text>
            <View style={_styles.rowCenter}>
              <Icons.SmallCalendar width={16} height={16} />
              <Text style={[styles.description, styles.ml4]}>6 août 2022</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={[styles.title, styles.mb7]}>
              {translation.withdrawal_time}
            </Text>
            <View style={_styles.rowCenter}>
              <Icons.SmallClock width={16} height={16} />
              <Text style={[styles.description, styles.ml4]}>9h</Text>
            </View>
          </View>
        </View>
        <View style={styles.ph9}>
          <Text style={[styles.title, styles.mt26]}>
            {translation.type_of_assignment}
          </Text>
          <Text style={[styles.description, styles.mt15]}>
            Contrôle technique
          </Text>
          <Text style={[styles.title, styles.mt26]}>
            {translation.pick_up_location}
          </Text>
          <View style={[_styles.rowCenter, styles.mt15]}>
            <Icons.SmallLocation />
            <Text style={[styles.description, styles.ml10]}>
              15 rue Curnonsky 75017 Paris
            </Text>
          </View>
          <Text style={[styles.title, styles.mt26]}>
            {translation.drop_off_point}
          </Text>
          <View style={[_styles.rowCenter, styles.mt15]}>
            <Icons.SmallRouting />
            <Text style={[styles.description, styles.ml10]}>
              15 rue Curnonsky 75017 Paris
            </Text>
          </View>
          <View style={[_styles.allCenter, styles.icon]}>
            <Icons.BigWallet width={52} height={52} />
          </View>
          <Text style={styles.price}>{translation.price}: 40 €</Text>
          {!isSelected && (
            <View style={styles.footer}>
              <IconButton
                title={translation.accept}
                Icon={Icons.RadioSelected}
                onPress={() => setIsSelected(true)}
              />
              <IconButton
                title={translation.to_refuse}
                Icon={Icons.Radio}
                color={COLORS.Buttons[3]}
                onPress={() => setIsSelected(true)}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.V15,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: SIZES.V18,
    paddingHorizontal: SIZES.H15 * 2,
    borderColor: COLORS.Secondary_Border,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    lineHeight: 21,
    color: COLORS.Primary_Link,
  },
  description: {
    fontSize: fontSize(14),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 16,
    color: COLORS.Dark,
  },
  ml4: {marginLeft: SIZES.H2 * 2},
  ml10: {marginLeft: SIZES.H10},
  mb7: {marginBottom: 7},
  mt26: {marginTop: 26},
  mt15: {marginTop: SIZES.V15},
  ph9: {paddingHorizontal: 9},
  icon: {
    width: 79,
    height: 79,
    marginTop: 58,
    alignSelf: 'center',
    backgroundColor: COLORS.Others[3],
    borderRadius: 100,
  },
  price: {
    fontSize: fontSize(19),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    lineHeight: 22,
    color: COLORS.Primary_Text,
    textAlign: 'center',
    marginTop: 13,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
