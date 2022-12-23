import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getBookings, getSummary} from './bookingAction';

export interface IBooking {
  id: number;
  booking_status: string | 'requested';
  booking_type: 'technical' | 'control' | 'repair' | string;
  datetime: Date;
  pickuptime: string;
  pickup_address: string;
  pickup_latitude: string;
  pickup_longitude: string;
  drop_address: string;
  drop_latitude?: string;
  drop_longitude?: string;
  graycard_attachment: string;
  insurance_attachment: string;
  techcontrol_attachment: string;
  issue_description: string;
  same_address: boolean;
  terms_conditions_verified: boolean;
  total_cost: number;
  unit_cost: number;
}

export interface BookingState {
  bookings: IBooking[];
  summary: IBooking | null;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  summary: null,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getSummary.fulfilled,
      (state: BookingState, action: PayloadAction<IBooking>) => {
        state.summary = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      getBookings.fulfilled,
      (state: BookingState, action: PayloadAction<IBooking[]>) => {
        state.bookings = action.payload;
        state.error = null;
      },
    );
  },
});

export default bookingSlice.reducer;
