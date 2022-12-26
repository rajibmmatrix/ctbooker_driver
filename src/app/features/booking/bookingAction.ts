import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster} from '~utils';
import {IACBooking, ICRBooking} from 'types';

//For Get Booking Summary
export const getSummary = createAsyncThunk(
  'booking/getSummary',
  async (_, thunkAPI) => {
    try {
      const {data}: any = await api.getSummary();
      return data?.booking;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For Get Bookings
export const getBookings = createAsyncThunk(
  'booking/getBookings',
  async (params: ICRBooking, thunkAPI) => {
    try {
      const {data}: any = await api.getBookings(params);
      return data?.bookings;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//For Accept Booking
export const acceptBooking = createAsyncThunk(
  'booking/acceptBooking',
  async (params: IACBooking, thunkAPI) => {
    try {
      const {message}: any = await api.acceptBooking(params);
      showToaster(message, 'success');
      return params.booking_id;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);
