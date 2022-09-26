import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../types/User.interface';

type TExpenseState = {
  user: IUser | null,
};

const initialState: TExpenseState = {
  user: null,
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
  },
});
/* eslint-enable no-param-reassign */

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
