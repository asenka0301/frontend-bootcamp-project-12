/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: '',
  id: null,
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { modalType, id } = payload;
      state.isOpen = true;
      state.modalType = modalType;
      state.id = null ?? id;
    },
    // eslint-disable-next-line no-unused-vars
    closeModal: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpen = false;
      state.modalType = null;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = modalsReducer.actions;
export default modalsReducer.reducer;
