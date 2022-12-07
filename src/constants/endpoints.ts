import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-chauffeur.json',
  details: '/api/lang-json?type=chauffeur',

  //Auth
  getUser: '/auth/customer',
  login: '/auth/login',
  signup: '/auth/signup',
  forgot: '/auth/forgot',
};
