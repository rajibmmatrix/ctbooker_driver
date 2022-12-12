import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotScreen, LoginScreen, SignupScreen, SplashScreen} from '~screens';
import {UpdateModal} from '~components';
import SideNavigation from './SideNavigation';
import config from '~config';
import {useTranslations} from '~translation';
import {api, log} from '~utils';
import {loading, useDispatch} from '~app';
import {StackParamList} from 'types';

const Stack = createNativeStackNavigator<StackParamList>();

interface IResponse {
  android_link: URL;
  file: URL;
  ios_link: URL;
  version: string;
  versionLatest: string;
}

export default function Navigation() {
  const dispatch = useDispatch();
  const [newVersion, setNewVersion] = useState('');
  const [isForLang, setIsForLang] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {updateLanguage, version} = useTranslations();

  useEffect(() => {
    api
      .getDetails()
      .then(({data}: {data: IResponse}) => {
        if (data.version !== config.version) {
          setShowModal(true);
          setIsForLang(false);
        } else if (version !== data.versionLatest) {
          setShowModal(true);
          setIsForLang(true);
          setNewVersion(data.versionLatest);
        }
      })
      .catch(err => log(err));

    return () => {};
  }, [updateLanguage, version, dispatch]);

  const handleUpdate = async () => {
    setShowModal(false);
    if (isForLang) {
      //Update Language from Server if not updated.
      dispatch(loading(true));
      updateLanguage(newVersion, () => {
        dispatch(loading(false));
      });
    } else {
      BackHandler.exitApp();
    }
  };

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
      <UpdateModal
        show={showModal}
        isForLang={isForLang}
        onPress={handleUpdate}
      />
    </NavigationContainer>
  );
}
