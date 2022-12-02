import React, {FC, memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {COLORS, FONTS} from '~styles';

const NetError: FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No connection</Text>
    </View>
  );
};

export default memo(NetError);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: COLORS.Primary_Background[0],
  },
  title: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: FONTS.Secondary_Regular,
    color: COLORS.Light,
    textAlign: 'center',
  },
});
