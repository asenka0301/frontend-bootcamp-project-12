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
} from 'react-router-dom';
import MainPage from './Pages/MainPage';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import Nav from './Components/Nav';
import AuthContext from './contexts/index';
import useAuth from './hooks';

function AuthProvider({ children }) {
  const initialState = Boolean(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(initialState);
  const logIn = () => {
    setLoggedIn(true);
  };

  const foo = useMemo(() => ({ loggedIn, logIn }), [loggedIn]);

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={(
              <ChatRoute>
                <MainPage />
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
