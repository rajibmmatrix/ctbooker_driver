import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  title,
  textStyle,
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 185,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary,
    borderRadius: 100,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.Light,
    lineHeight: 16,
  },
});
