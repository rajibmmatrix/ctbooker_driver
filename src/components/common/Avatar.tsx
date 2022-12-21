import React, {FC, memo} from 'react';
import {Image, ImageStyle, StyleSheet} from 'react-native';
import {IMAGES, URL} from '~constants';
import {COLORS} from '~styles';

interface Props {
  uri?: string;
  style?: ImageStyle;
  size?: number;
  source?: any;
}

const Avatar: FC<Props> = ({uri, style = {}, size, source}) => {
  const sizes = {width: size, height: size};

  return (
    <Image
      source={uri ? {uri: URL.image + uri} : source ? source : IMAGES.Logo}
      style={[styles.image, style, size ? sizes : {}]}
    />
  );
};

export default memo(Avatar);

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: COLORS.Primary_Modal,
    resizeMode: 'cover',
  },
});
