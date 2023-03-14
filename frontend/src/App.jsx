/* eslint-disable react/prop-types */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import ChatPage from './Components/ChatPage';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import AuthContext from './contexts/index';
import useAuth from './hooks';

function AuthProvider({ children }) {
  const initialState = Boolean(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(initialState);
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const foo = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={foo}>
      {children}
    </AuthContext.Provider>
  );
}

function ChatRoute({ children }) {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
}

function AuthButton() {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login">Log in</Button>
  );
}

function App() {
  return (
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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
