import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotScreen, LoginScreen, SignupScreen, SplashScreen} from '~screens';
import SideNavigation from './SideNavigation';
import {useTranslations} from '~translation';
import {StackParamList} from 'types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function Navigation() {
  const {updateLanguage} = useTranslations();

  useEffect(() => {
    //Update language if not updated.
    updateLanguage();

    return () => {};
  }, [updateLanguage]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgot" component={ForgotScreen} />
        </Stack.Group>
        <Stack.Screen name="Sidebar" component={SideNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
