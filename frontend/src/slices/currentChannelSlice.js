import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = currentChannelIdSlice;
export default currentChannelIdSlice.reducer;
