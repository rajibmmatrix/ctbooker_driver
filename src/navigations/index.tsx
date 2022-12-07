import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotScreen, LoginScreen, SignupScreen, SplashScreen} from '~screens';
import SideNavigation from './SideNavigation';
import {useTranslations} from '~translation';
import config from '~config';
import {api, log} from '~utils';
import {StackParamList} from 'types';

interface IResponse {
  android_link: URL;
  file: URL;
  ios_link: URL;
  version: string;
  versionLatest: string;
}

const Stack = createNativeStackNavigator<StackParamList>();

export default function Navigation() {
  const {updateLanguage} = useTranslations();

  useEffect(() => {
    api
      .getDetails()
      .then(({data}: {data: IResponse}) => {
        if (data.version !== config.version) {
          Alert.alert(
            'Please Update',
            'Your app is outdated, Please update to continue.',
            [
              {
                text: 'OK',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
          );
        } else if (config.lang_version !== data.versionLatest) {
          //Update Language from Server if not updated.
          updateLanguage();
        }
      })
      .catch(err => log(err));

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
