import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  showNotification?: boolean;
  isBack?: boolean;
}

const Header: FC<Props> = ({title, isBack = false}) => {
  const navigation = useNavigation() as any;

  return (
    <View style={styles.header}>
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
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Icons.Notification width={19} height={19} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    textAlign: 'center',
  },
});
