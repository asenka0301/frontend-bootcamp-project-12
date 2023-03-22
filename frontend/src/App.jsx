/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChatPage from './Components/ChatPage';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import SignUpPage from './Components/SignUpPage';
import AuthContext from './contexts/index';
import useAuth from './hooks';

const rollbarConfig = {
  accessToken: 'e89f87479d264f0d912cda06016c4c56',
  environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const AuthProvider = ({ children }) => {
  const initialState = Boolean(localStorage.getItem('userData'));
  const [loggedIn, setLoggedIn] = useState(initialState);
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };

  const foo = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={foo}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('logOut')}</Button>
      : null
  );
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Navbar className="shadow-sm" bg="white" expand="lg" variant="white">
            <Container>
              <Navbar.Brand as={Link} to="/">
                Hexlet Chat
              </Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route
              path="/"
              element={(
                <ChatRoute>
                  <ChatPage />
                </ChatRoute>
              )}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <TestError /> */}
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
