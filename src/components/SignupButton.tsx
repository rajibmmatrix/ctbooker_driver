import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  style?: ViewStyle;
  Icon: FC<SvgProps>;
  isSelected: boolean;
  onPress: () => void;
  color?: string;
}

const SignupButton: FC<Props> = ({
  title,
  style,
  Icon,
  isSelected,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        style,
        {backgroundColor: color ? color : COLORS.Buttons[2]},
      ]}>
      <View style={styles.body}>
        <Icon width={28} height={28} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {isSelected ? (
        <Icons.RadioSelected height={13} width={13} />
      ) : (
        <Icons.Radio height={13} width={13} />
      )}
    </TouchableOpacity>
  );
};

export default memo(SignupButton);

const styles = StyleSheet.create({
  container: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 23,
    borderRadius: 22,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
    fontWeight: '600',
    fontFamily: FONTS.Primary_Semibold,
    color: COLORS.Primary_Link,
  },
});
