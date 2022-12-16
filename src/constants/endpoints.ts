import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-chauffeur.json',
  details: '/api/lang-json?type=chauffeur',

  //Auth
  getUser: '/api/driver/v1/auth/get-user',
  login: '/api/driver/v1/auth/login-driver',
  signup: '/api/driver/v1/auth/signup',
  forgot: '/api/driver/v1/auth/forgot-password',
  edit_profile: '/driver/v1/auth/edit-profile',
  change_password: '/api/driver/v1/auth/change-password',
};
