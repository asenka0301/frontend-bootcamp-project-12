import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import currentChannelIdReducer from './currentChannelSlice';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    currentChannelId: currentChannelIdReducer,
  },
});
