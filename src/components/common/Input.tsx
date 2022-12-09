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
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';

interface Props extends TextInputProps {
  title?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  Icon: FC<SvgProps>;
}

const Input: FC<Props> = ({
  title,
  secureTextEntry = false,
  titleStyle,
  containerStyle,
  Icon,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        secureTextEntry ? styles.border : _styles.shadow,
        containerStyle,
      ]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={styles.body}>
        <Icon width={20} height={20} />
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={COLORS.Primary_Placeholder}
          style={[styles.input, styles.inputText]}
        />
      </View>
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.Light,
    marginVertical: 5,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.Primary_Border,
    backgroundColor: COLORS.Primary_Card,
  },
  title: {
    fontSize: fontSize(12),
    lineHeight: 14,
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    textTransform: 'uppercase',
    marginLeft: 46,
    marginTop: SIZES.V12,
  },
  body: {
    paddingBottom: 5,
    paddingHorizontal: SIZES.H15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 35,
    width: '100%',
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
  inputText: {
    fontSize: fontSize(14),
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Dark,
  },
});
