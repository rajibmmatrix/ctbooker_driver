import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster} from '~utils';
import {ICRBooking} from 'types';

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
