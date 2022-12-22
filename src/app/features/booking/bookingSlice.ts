import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getBooking} from './bookingAction';

export interface IBooking {
  id: number;
}

export interface BookingState {
  booking: IBooking | null;
  error: string | null;
}

const initialState: BookingState = {
  booking: null,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getBooking.fulfilled,
      (state: BookingState, action: PayloadAction<IBooking>) => {
        state.booking = action.payload;
        state.error = null;
      },
    );
  },
});

export default bookingSlice.reducer;
