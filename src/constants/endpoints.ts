import config from '~config';

export const baseURL = config.baseURL;

export const URL = {
  //Common
  lang: '/upload/json/lang-chauffeur.json',
  details: '/api/lang-json?type=chauffeur',
  image: baseURL + '/upload/dp/',

  //Auth
  getUser: '/api/driver/v1/auth/get-user',
  login: '/api/driver/v1/auth/login-driver',
  signup: '/api/driver/v1/auth/signup',
  forgot: '/api/driver/v1/auth/forgot-password',
  edit_profile: '/api/driver/v1/auth/edit-profile-driver',
  edit_profilePic: '/api/driver/v1/auth/profile-img',
  change_password: '/api/driver/v1/auth/change-password',

  //Booking
  get_summary: '/api/driver/v1/booking/current-booking',
  get_bookings: '/api/driver/v1/booking/available-booking',
};
