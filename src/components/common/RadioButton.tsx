import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize, SIZES} from '~styles';

interface Props {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const RadioButton: FC<Props> = ({
  isSelected,
  title,
  style,
  disabled = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}>
      {!isSelected ? <Icons.RadioBtton /> : <Icons.SelectedRadioButton />}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(RadioButton);

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.V10 / 2,
    marginBottom: SIZES.V10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize(13),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    marginLeft: SIZES.H10,
  },
});
