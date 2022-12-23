import moment from 'moment';

export function toTime(params: any) {
  return moment(params).locale('fr').format('LT');
}

export function toDate(params: any) {
  return moment(params).locale('fr').format('ll');
}
