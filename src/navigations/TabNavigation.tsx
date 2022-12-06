import React, {FC, memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import {BookingScreen, HomeScreen, ProfileScreen} from '~screens';
import {Icons} from '~constants';
import {COLORS, FONTS} from '~styles';
import {useTranslations} from '~translation';
import {TabParamList} from 'types';

const Tab = createBottomTabNavigator<TabParamList>();

interface Props extends BottomTabBarButtonProps {
  title: string;
  icons: Array<FC<SvgProps>>;
}

const Tabs: FC<Props> = memo(({title, onPress, accessibilityState, icons}) => {
  const isSelected = accessibilityState?.selected;

  const Icon = isSelected ? icons[0] : icons[1];

  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      <View style={[styles.body, isSelected ? styles.active : null]}>
        <Icon width={24} height={24} color="#fff" />
        {isSelected && <Text style={styles.title}>{title}</Text>}
      </View>
    </Pressable>
  );
});

export default function TabNavigation() {
  const translations = useTranslations();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: translations.welcome,
          tabBarButton: props => (
            <Tabs
              {...props}
              title={translations.welcome}
              icons={[Icons.HouseActive, Icons.House]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: translations.reservation,
          tabBarButton: props => (
            <Tabs
              {...props}
              title={translations.reservation}
              icons={[Icons.DrivingActive, Icons.Driving]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: translations.my_profile,
          tabBarButton: props => (
            <Tabs
              {...props}
              title={translations.my_profile}
              icons={[Icons.SmallUser, Icons.SmallUser]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.Light,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: 40,
    minWidth: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  active: {
    borderRadius: 100,
    backgroundColor: COLORS.Primary_Link,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.Primary_Regular,
    lineHeight: 16,
    color: COLORS.Light,
    marginLeft: 3,
  },
});
