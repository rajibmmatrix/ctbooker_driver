import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {checkLogin, getUser, login, logout, signup, forgot} from './authAction';

export interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  company_name?: string;
  crn?: string;
  user_type?: string;
  customer_type?: string; //Indi or Pro
}

export interface AuthState {
  isLoggedin: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedin: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkLogin.fulfilled, (state: AuthState, action: any) => {
      state.isLoggedin = action.payload?.isLogin;
      state.user = action.payload?.user;
      state.error = null;
    });
    builder.addCase(
      getUser.fulfilled,
      (state: AuthState, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction<IUser>) => {
        state.isLoggedin = true;
        state.user = action.payload;
        state.error = null;
      },
    );
    builder.addCase(signup.fulfilled, (state: AuthState, action: any) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(forgot.fulfilled, (state: AuthState, action: any) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(
      logout.fulfilled,
      (state: AuthState, action: PayloadAction<boolean>) => {
        state.isLoggedin = action.payload;
        state.user = null;
        state.error = null;
      },
    );
  },
});

export default authSlice.reducer;
