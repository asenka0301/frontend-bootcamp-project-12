import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import { useDispatch } from 'react-redux';
import AuthProvider from './context/AuthProvider';
import MainContent from './components/AppRouter';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
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
    dispatch(channelsActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  const socketApi = useMemo(() => (
    {
      sendMessage: (data) => socket.emit('newMessage', data),
      addChannel: (name, callback) => {
        // eslint-disable-next-line consistent-return
        socket.emit('newChannel', { name }, (response) => {
          const { status, data } = response;
          if (status === 'ok') {
            callback(data.id);
          }
        });
      },
      deleteChannel: (id, callback) => {
        socket.emit('removeChannel', { id }, (response) => {
          const { status } = response;
          if (status === 'ok') {
            callback();
          }
        });
      },
      renameChannel: ({ id, name }) => {
        socket.emit('renameChannel', { id, name });
      },
    }), [socket]);

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
