import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import AuthProvider from './context/AuthProvider';
import MainContent from './MainContent';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'testenv',
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
