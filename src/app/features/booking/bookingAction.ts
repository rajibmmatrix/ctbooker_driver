import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, showToaster} from '~utils';

//For Get Booking
export const getBooking = createAsyncThunk(
  'booking/getBooking',
  async (_, thunkAPI) => {
    try {
      const {data}: any = await api.getBooking();
      return data?.booking;
    } catch (error: any) {
      showToaster(error, 'error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);
