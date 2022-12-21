import {Platform} from 'react-native';

export const FONTS = {
  Primary_Bold: Platform.OS === 'ios' ? 'Roboto-Bold' : 'Roboto', //700
  Primary_Semibold: 'Roboto Mono SemiBold', //600
  Primary_Medium: 'Roboto-Medium', //500
  Primary_Regular: Platform.OS === 'ios' ? 'Roboto-Regular' : 'Roboto', //400

  Secondary_Bold: 'Poppins', //700
  Secondary_Semibold: 'Poppins SemiBold', //600
};
