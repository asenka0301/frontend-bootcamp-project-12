/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: '',
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { modalType } = payload;
      state.isOpen = true;
      state.modalType = modalType;
    },
    // eslint-disable-next-line no-unused-vars
    closeModal: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalsReducer.actions;
export default modalsReducer.reducer;
