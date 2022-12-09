import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize, _styles} from '~styles';

interface Props {
  title: string;
  showNotification?: boolean;
  isBack?: boolean;
}

const Header: FC<Props> = ({
  title,
  showNotification = true,
  isBack = false,
}) => {
  const navigation = useNavigation() as any;

  return (
    <View style={[styles.header, _styles.rowCenterSpace]}>
      <View style={[styles.button, _styles.allCenter]}>
        <TouchableOpacity
          onPress={() =>
            isBack ? navigation.goBack() : navigation.openDrawer()
          }>
          {!isBack ? (
            <Icons.Menu width={24} height={24} />
          ) : (
            <Icons.ArrowLeft width={24} height={24} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.button, _styles.allCenter]}>
        {showNotification && !isBack && (
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icons.Notification width={19} height={19} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  button: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '500',
    lineHeight: 21,
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    textAlign: 'center',
  },
});
