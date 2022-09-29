import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  isRejectedWithValue,
  isFulfilled,
} from '@reduxjs/toolkit';

import { accessTokenService } from '../../services/accessTokenService';
import {
  authService,
  TLoginData,
  TUserData,
} from '../../services/authService';
import { userService } from '../../services/userService';

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
    userData: TUserData,
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

export const reset = createAsyncThunk(
  'user/reset',
  async (
    email: string,
    { rejectWithValue },
  ) => {
    const {
      message,
      errors,
    } = await authService.reset(email);

    if (message) {
      const errorValue: IError = {
        message,
        errors,
      };

      return rejectWithValue(errorValue);
    }

    return true;
  },
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (
    resetData: {
      password: string,
      resetToken: string,
    },
    { rejectWithValue },
  ) => {
    const {
      accessToken,
      user,
      message,
      errors,
    } = await authService.setPassword(resetData.password, resetData.resetToken);

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

export const patch = createAsyncThunk(
  'user/patch',
  async (
    patchData: {
      userId: number,
      userData: TUserData & { passwordNew: string },
    },
    { rejectWithValue },
  ) => {
    try {
      const {
        user,
        message,
        errors,
      } = await userService.patch(patchData.userId, patchData.userData);

      if (!user) {
        const errorValue: IError = {
          message,
          errors,
        };

        return rejectWithValue(errorValue);
      }

      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const remove = createAsyncThunk(
  'user/remove',
  async (
    userData: {
      userId: number,
      password: string,
    },
    { rejectWithValue },
  ) => {
    try {
      const {
        user,
        message,
        errors,
      } = await userService.remove(userData.userId, userData.password);

      if (user !== null) {
        const errorValue: IError = {
          message,
          errors,
        };

        return rejectWithValue(errorValue);
      }

      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
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

type TStatuses = {
  patch: EStatus;
  activate: EStatus;
  remove: EStatus;
  register: EStatus;
  login: EStatus;
  logout: EStatus;
  reset: EStatus;
  resetPassword: EStatus;
};

type TUserState = {
  user: IUser | null;
  isChecked: boolean;
  error: IError;
  status: TStatuses;
};

const initialState: TUserState = {
  user: null,
  isChecked: false,
  error: {},
  status: {
    patch: EStatus.IDLE,
    activate: EStatus.IDLE,
    remove: EStatus.IDLE,
    register: EStatus.IDLE,
    login: EStatus.IDLE,
    logout: EStatus.IDLE,
    reset: EStatus.IDLE,
    resetPassword: EStatus.IDLE,
  },
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
      .addCase(patch.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(activate.rejected, state => {
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isChecked = true;
      })
      .addCase(checkAuth.rejected, state => {
        state.user = null;
        state.isChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, state => {
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      .addCase(logout.rejected, state => {
        state.user = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
      });

    builder
      .addMatcher(isFulfilled, (state, action) => {
        const type: string = action.type.split('/').slice(-1)[0];

        if (type === 'checkAuth') {
          return;
        }

        state.error = {};

        if (type in state.status) {
          state.status[type as keyof TStatuses] = EStatus.SUCCESS;
        }
      });

    builder
      .addMatcher(isRejected, (state, action) => {
        const type: string = action.type.split('/').slice(-1)[0];

        if (type === 'checkAuth') {
          return;
        }

        if (type in state.status) {
          state.status[type as keyof TStatuses] = EStatus.ERROR;
        }
      });

    builder
      .addMatcher(isRejectedWithValue, (state, action) => {
        const type: string = action.type.split('/').slice(-1)[0];

        if (type === 'checkAuth') {
          return;
        }

        state.error = (action.payload || {}) as IError;

        if (type in state.status) {
          state.status[type as keyof TStatuses] = EStatus.ERROR;
        }
      });

    builder
      .addMatcher(isPending, (state, action) => {
        const type: string = action.type.split('/').slice(-1)[0];

        if (type === 'checkAuth') {
          return;
        }

        state.error = {};

        if (type in state.status) {
          state.status[type as keyof TStatuses] = EStatus.PENDING;
        }
      });
  },
});
/* eslint-enable no-param-reassign */

export const {
  setUser,
  setIsChecked,
  setAuthError,
} = userSlice.actions;
export default userSlice.reducer;
