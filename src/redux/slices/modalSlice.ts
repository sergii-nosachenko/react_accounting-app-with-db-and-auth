import { createSlice } from '@reduxjs/toolkit';

import { EModal } from '../../types/Modal.enum';

type TModalState = {
  variant: EModal,
};

const initialState: TModalState = {
  variant: EModal.NONE,
};

/* eslint-disable no-param-reassign */
// Raason of this disabled rule is that Redux toolkit uses "Immer Library"
// for state management. It allows mutating the state inside reducers.
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (
      state,
      action: { type: string, payload: EModal },
    ) => {
      state.variant = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
