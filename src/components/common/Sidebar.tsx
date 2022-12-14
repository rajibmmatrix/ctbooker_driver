import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {SvgProps} from 'react-native-svg';
import {Icons} from '~constants';
import {COLORS, FONTS, fontSize} from '~styles';
import {useTranslations} from '~translation';

interface Props {
  title: string;
  Icon?: FC<SvgProps>;
  onPress: () => void;
  style?: ViewStyle;
}

const Item: FC<Props> = memo(({title, Icon, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
      {Icon && <Icon width={18} height={18} />}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
});

const Sidebar: FC<DrawerContentComponentProps> = props => {
  const {translation} = useTranslations();

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Icons.MenuClose width={24} height={24} />
      </TouchableOpacity>
      <Item
        title={translation.welcome}
        Icon={Icons.MenuHouse}
        onPress={() => props.navigation.navigate('Tab', {screen: 'Home'})}
      />
      <Item
        title={translation.my_profile}
        Icon={Icons.MenuUser}
        onPress={() => props.navigation.navigate('Tab', {screen: 'Profile'})}
      />
      <Item
        title={translation.change_password}
        Icon={Icons.MenuLock}
        onPress={() => props.navigation.navigate('ChangePassword')}
      />
      <Item
        title={translation.vehicle_documents}
        Icon={Icons.MenuDocument}
        onPress={() => props.navigation.navigate('VehicleDocuments')}
      />
      <Item
        title={translation.payment}
        Icon={Icons.MenuWallet}
        onPress={() => props.navigation.navigate('Payment')}
      />
      <Item
        title={translation.signout}
        Icon={Icons.MenuExport}
        onPress={() => {
          props.navigation.dispatch(
            CommonActions.reset({index: 1, routes: [{name: 'Login'}]}),
          );
        }}
        style={styles.logout}
      />
    </DrawerContentScrollView>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 31,
    paddingLeft: 33,
    backgroundColor: COLORS.Light,
  },
  item: {
    marginTop: 35,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize(13),
    fontWeight: '400',
    fontFamily: FONTS.Primary_Regular,
    color: COLORS.Dark,
    lineHeight: 20,
    marginLeft: 14,
  },
  logout: {
    marginTop: 90,
  },
});
