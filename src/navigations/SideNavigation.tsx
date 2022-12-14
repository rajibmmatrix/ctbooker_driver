import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  ChangePasswordScreen,
  EditProfileScreen,
  NotificationScreen,
  PaymentScreen,
  VehicleDocumentsScreen,
} from '~screens';
import {Sidebar} from '~components';
import TabNavigation from './TabNavigation';
import {SideParamList} from 'types';

const Drawer = createDrawerNavigator<SideParamList>();

export default function SideNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {backgroundColor: 'transparent'},
      }}>
      <Drawer.Screen name="Tab" component={TabNavigation} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen
        name="VehicleDocuments"
        component={VehicleDocumentsScreen}
      />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
    </Drawer.Navigator>
  );
}
