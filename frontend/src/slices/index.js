import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice.js';
import channelsReducer from './channelsSlice.js';
import modalsReducer from './modalsSlice';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    modals: modalsReducer,
  },
});
