import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

//For Stack Navigations
export type StackParamList = {
  Splash: undefined;
  //auth Screens
  Login: undefined;
  Signup: undefined;
  Forgot: undefined;

  //app Screens
  Sidebar: NavigatorScreenParams<SideParamList> | undefined;
};

//For Side Navigations
export type SideParamList = {
  Tab: NavigatorScreenParams<TabParamList> | undefined;
  VehicleDocuments: undefined;
  ChangePassword: undefined;
  Payment: undefined;
  EditProfile: undefined;
  Notification: undefined;
  Summary: undefined;
};

//For Tab Navigations
export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Profile: undefined;
};

//For Stack Screens
export type StackScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;

//For Side Screens
export type SideScreenProps<Screen extends keyof SideParamList> =
  CompositeScreenProps<
    DrawerScreenProps<SideParamList, Screen>,
    NativeStackScreenProps<StackParamList>
  >;

//For Tab Screens
export type TabScreenProps<Screen extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, Screen>,
    //DrawerScreenProps<SideParamList>
    CompositeScreenProps<
      DrawerScreenProps<SideParamList>,
      NativeStackScreenProps<StackParamList>
    >
  >;

type MODE = 'Production' | 'Development';

export type ILANG = 'en' | 'fr';

export interface CONFIG {
  name: string;
  mode: MODE;
  lang: ILANG;
  version: string;
  lang_version: string;
  baseURL: string;
  termsURL: string;
  policyURL: string;
  androidURL: string;
  iosURL: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgot {
  email: string;
}

export interface ISignup {
  email: string;
  password: string;
}

export interface ICPassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface IPPic {
  profile: string;
}

export interface IUserEdit {
  company_name?: string;
  crn?: string;
  first_name?: string;
  last_name?: string;
  customer_type?: '0' | '1' | string;
  address?: string;
  phone?: string;
  latitude?: string;
  longitude?: string;
}

export interface ICRBooking {
  latitude: string | number;
  longitude: string | number;
}

export interface IACBooking {
  booking_id: string | number;
}

export interface ITranslation {
  welcome: string;
  my_profile: string;
  change_password: string;
  vehicle_documents: string;
  payment: string;
  signout: string;
  to_login: string;
  please_login_to_continue: string;
  email: string;
  password: string;
  login: string;
  forgot_password: string;
  forgot_description: string;
  send: string;
  enter_email: string;
  password_error: string;
  signup: string;
  individual: string;
  profesonal: string;
  fname: string;
  lname: string;
  company_name: string;
  crn: string;
  please_register_to_continue: string;
  register: string;
  already_have_an_account_login: string;
  login_error: string;
  signup_error: string;
  reserve_now: string;
  date_of_withdrawal: string;
  withdrawal_time: string;
  type_of_assignment: string;
  pick_up_location: string;
  drop_off_point: string;
  accept: string;
  to_refuse: string;
  price: string;
  reservation: string;
  summary: string;
  new_reservation_request: string;
  save: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
  edit_profile: string;
  address: string;
  mobile: string;
  no_connection: string;
  internet_error: string;
  no_data: string;
}
