import React, {FC, memo, useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {IMAGES} from '~constants';
import {COLORS, FONTS, fontSize, SIZES, _styles} from '~styles';

const NetError: FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Modal visible={!isConnected} transparent style={_styles.container}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={IMAGES.NoInternet} style={styles.logo} />
          <Text style={styles.title}>No connection</Text>
          <Text style={styles.description}>
            Please check your internet connectivity and try again
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(NetError);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.H22 * 1.5,
    backgroundColor: COLORS.Primary_Modal,
  },
  content: {
    width: '100%',
    padding: SIZES.H15,
    paddingHorizontal: SIZES.H38,
    borderRadius: 15,
    backgroundColor: COLORS.Light,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: SIZES.V10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: fontSize(14),
    fontWeight: '500',
    fontFamily: FONTS.Primary_Medium,
    color: COLORS.Primary_Text,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSize(13),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Primary_Text,
    textAlign: 'center',
    marginVertical: SIZES.V5,
  },
});
