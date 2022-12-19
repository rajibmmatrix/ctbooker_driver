import axios from 'axios';
import config from '~config';
import {URL} from '~constants';
import {deleteToken} from './storage';
import * as navigation from './navigationRef';
import {ICPassword, IForgot, ILogin, ISignup, IUserEdit} from 'types';

const API = axios.create({
  baseURL: config.baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  function (response) {
    if (response.data?.status && response.data.status !== 0) {
      return response.data;
    } else {
      const message = response.data?.message;
      return Promise.reject(message);
    }
  },
  async function (error) {
    const message = error.response?.data?.message || error.message;
    if (error?.response?.status === 401) {
      removeApiToken();
      await deleteToken();
      navigation.reset('Login');
    }
    return Promise.reject(message);
  },
);

export const setLang = (LANG: string) => {
  return (API.defaults.headers.common.lang = LANG);
};

export const setApiToken = (AUTH_TOKEN: string) => {
  return (API.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`);
};

export const removeApiToken = () => {
  return (API.defaults.headers.common.Authorization = '');
};

//For Common API
export const getDetails = () => axios.get(config.baseURL + URL.details);
export const getLanguage = () => axios.get(config.baseURL + URL.lang);

//Auth API
export const getUser = () => API.get(URL.getUser);
export const signIn = (params: ILogin) => API.post(URL.login, params);
export const signUp = (params: ISignup) => API.post(URL.signup, params);
export const forgot = (params: IForgot) => API.post(URL.forgot, params);
export const editProfile = (params: IUserEdit) =>
  API.post(URL.edit_profile, params);

export const changePassword = (params: ICPassword) =>
  API.post(URL.change_password, params);

export default API;
