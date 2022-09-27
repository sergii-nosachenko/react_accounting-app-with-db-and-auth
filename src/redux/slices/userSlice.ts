/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { accessTokenService } from '../../services/accessTokenService';
import {
  authService,
  TLoginData,
  TRegisterData,
} from '../../services/authService';

import { IError } from '../../types/Error.interface';
import { EStatus } from '../../types/Status.enum';
import { IUser } from '../../types/User.interface';

export const activate = createAsyncThunk(
  'user/activate',
  async (activationToken: string, { rejectWithValue }) => {
    const {
      accessToken,
      user,
      message,
      errors,
    } = await authService.activate(activationToken);

    if (!user || !accessToken) {
      const errorValue: IError = {
        message,
        errors,
      };

      return rejectWithValue(errorValue);
    }

    accessTokenService.save(accessToken);

    return user;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (
    userData: TRegisterData,
    { rejectWithValue },
  ) => {
    const {
      user,
      message,
      errors,
    } = await authService.register(userData);

    if (!user) {
      const errorValue: IError = {
        message,
        errors,
      };

      return rejectWithValue(errorValue);
    }

    return user;
  },
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    const {
      accessToken,
      user,
      message,
      errors,
    } = await authService.refresh();

    if (!user || !accessToken) {
      const errorValue: IError = {
        message,
        errors,
      };

      return rejectWithValue(errorValue);
    }

    accessTokenService.save(accessToken);

    return user;
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (
    userData: TLoginData,
    { rejectWithValue },
  ) => {
    const {
      accessToken,
      user,
      message,
      errors,
    } = await authService.login(userData);

    if (!user || !accessToken) {
      const errorValue: IError = {
        message,
        errors,
      };

      return rejectWithValue(errorValue);
    }

    accessTokenService.save(accessToken);

    return user;
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await authService.logout();

    accessTokenService.remove();

    return null;
  },
);

type TUserState = {
  user: IUser | null;
  isChecked: boolean;
  error: IError;
  status: EStatus;
};

const initialState: TUserState = {
  user: null,
  isChecked: false,
  error: {},
  status: EStatus.IDLE,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: { type: string, payload: IUser | null },
    ) => {
      state.user = action.payload;
    },
    setAuthError: (
      state,
      action: { type: string, payload: IError },
    ) => {
      state.error = action.payload;
    },
    setIsChecked: (
      state,
      action: { type: string, payload: boolean },
    ) => {
      state.isChecked = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, state => {
        state.error = {};
        state.status = EStatus.PENDING;
      })
      .addCase(register.fulfilled, state => {
        state.error = {};
        state.status = EStatus.SUCCESS;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as IError;
        state.status = EStatus.ERROR;
      })
      .addCase(activate.pending, state => {
        state.error = {};
        state.status = EStatus.PENDING;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = {};
        state.status = EStatus.SUCCESS;
      })
      .addCase(activate.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload as IError;
        state.status = EStatus.ERROR;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isChecked = true;
      })
      .addCase(checkAuth.rejected, state => {
        state.user = null;
        state.isChecked = true;
      })
      .addCase(login.pending, state => {
        state.error = {};
        state.status = EStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = {};
        state.status = EStatus.SUCCESS;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload as IError;
        state.status = EStatus.ERROR;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      .addCase(logout.rejected, state => {
        state.user = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const { setUser, setIsChecked, setAuthError } = userSlice.actions;
export default userSlice.reducer;
