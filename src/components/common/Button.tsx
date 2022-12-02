import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS, _styles} from '~styles';

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
      <Text style={[_styles.link, styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 135,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Primary_Button[0],
    borderRadius: 50,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.Primary_Link,
  },
});
