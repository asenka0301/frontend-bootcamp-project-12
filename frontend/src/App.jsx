import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import { useDispatch } from 'react-redux';
import AuthProvider from './context/AuthProvider';
import MainContent from './MainContent';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as currentChannelIdActions } from './slices/currentChannelSlice';
import { SocketContext } from './context/context';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'testenv',
};

const App = () => {
  leoProfanity.loadDictionary('ru');
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannels(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
  });

  const socketApi = useMemo(() => (
    {
      sendMessage: (data) => socket.emit('newMessage', data),
      addChannel: (name, callback) => {
        // eslint-disable-next-line consistent-return
        socket.emit('newChannel', { name }, (response) => {
          const { status, data } = response;
          if (status === 'ok') {
            dispatch(currentChannelIdActions.setCurrentChannelId(data.id));
            callback();
            return data;
          }
        });
      },
      // deleteChannel: (id) => {
      //   socket.emit('removeChannel', { id }, (response) => {
      //     const { status } = response;
      //     if (status === 'ok') {
      //       dispatch(channelsActions.removeChannel(id));
      //     }
      //   });
      // },
      // renameChannel: (name, id) => {
      //   socket.emit('renameChannel', { name, id });
      // },
    }), [dispatch, socket]);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <SocketContext.Provider value={socketApi}>
            <MainContent />
          </SocketContext.Provider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
