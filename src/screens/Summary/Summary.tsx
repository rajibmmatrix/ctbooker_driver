import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Container, Header, NoDataFound} from '~components';
import {Icons} from '~constants';
import {useTranslations} from '~translation';
import {getSummary, loading, useDispatch, useSelector} from '~app';
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';
import {SideScreenProps} from 'types';

export default function SummaryScreen({}: SideScreenProps<'Summary'>) {
  const dispatch = useDispatch();
  const {translation} = useTranslations();
  const {summary} = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(loading(true));
    dispatch(getSummary()).finally(() => dispatch(loading(false)));

    return () => {};
  }, [dispatch]);

  return (
    <Container>
      <Header title={translation.summary} isBack />
      {!summary ? (
        <NoDataFound />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.header}>
            <View style={styles.card}>
              <Text style={[styles.title, styles.mb7]}>
                {translation.date_of_withdrawal}
              </Text>
              <View style={_styles.rowCenter}>
                <Icons.SmallCalendar width={16} height={16} />
                <Text style={[styles.description, styles.ml4]}>
                  6 août 2022
                </Text>
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
          </View>
        </ScrollView>
      )}
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
});
