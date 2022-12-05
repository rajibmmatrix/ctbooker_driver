import React, {FC, memo} from 'react';
import {
  View,
  Text,
  TextInputProps,
  ViewStyle,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {COLORS, FONTS} from '~styles';

interface Props extends TextInputProps {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  Icon: FC<SvgProps>;
}

const Input: FC<Props> = ({
  title,
  titleStyle,
  containerStyle,
  Icon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Icon width={14} height={14} />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
  },
  input: {
    height: 35,
    width: '100%',
    paddingLeft: 19,
    fontWeight: '300',
    fontFamily: FONTS.Primary_Medium,
    color: COLORS.Primary_Text,
  },
});
