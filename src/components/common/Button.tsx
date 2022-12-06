import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
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

interface IBProps extends Props {
  Icon: FC<SvgProps>;
  color?: string;
}

export const IconButton: FC<IBProps> = memo(
  ({Icon, title, disabled, onPress, color, style, textStyle}) => {
    const bg = color ? {backgroundColor: color} : null;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.iconButton, style, bg]}>
        <Icon width={20} height={20} />
        <Text style={[styles.buttonTitle, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

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
  iconButton: {
    height: 48,
    width: 144,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Buttons[2],
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: FONTS.Primary_Bold,
    lineHeight: 20,
    color: COLORS.Light,
    marginLeft: 6,
  },
});
