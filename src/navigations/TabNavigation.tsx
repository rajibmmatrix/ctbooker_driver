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
          //borderTopWidth: 0,
          //elevation: 0,
          height: 60,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: COLORS.Light,
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
          tabBarIcon: () => <Icons.House width={24} height={24} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: translations.reservation,
          tabBarIcon: () => <Icons.Driving width={24} height={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: translations.my_profile,
          tabBarIcon: () => <Icons.SmallUser width={24} height={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
