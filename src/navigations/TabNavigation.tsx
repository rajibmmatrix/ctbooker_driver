import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookingScreen, HomeScreen, ProfileScreen} from '~screens';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';
import {useTranslations} from '~translation';
import {TabParamList} from 'types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  const translations = useTranslations();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          lineHeight: 16,
          fontFamily: FONTS.Primary_Medium,
          color: COLORS.Light,
          textAlign: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: translations.welcome,
          tabBarIcon: () => <Icons.Menu width={20} height={20} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: translations.reservation,
          tabBarIcon: () => <Icons.Menu width={63} height={63} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: translations.my_account,
          tabBarIcon: () => <Icons.Menu width={18} height={18} />,
        }}
      />
    </Tab.Navigator>
  );
}
