import React, {FC, memo, ReactNode} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IMAGES} from '~constants';
import {COLORS, FONTS} from '~styles';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

const AuthContainer: FC<Props> = ({title, description, children}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground source={IMAGES.Background} style={styles.image}>
        <Image source={IMAGES.Logo} style={styles.logo} />
      </ImageBackground>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {children}
      </View>
    </ScrollView>
  );
};

export default memo(AuthContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Primary_Card,
  },
  image: {
    height: 400,
    width: '100%',
    backgroundColor: COLORS.Primary,
  },
  logo: {
    width: 114,
    height: 114,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    padding: 45,
    paddingTop: 63,
    marginTop: -80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.Primary_Card,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    fontFamily: FONTS.Primary_Bold,
    color: COLORS.Primary_Text,
    marginLeft: 63 - 45,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    marginTop: 10,
    marginLeft: 63 - 45,
  },
});
