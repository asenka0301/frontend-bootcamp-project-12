import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
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

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const foo = useMemo(() => ({ loggedIn, logIn }), []);

  return (
    <AuthContext.Provider value={foo}>
      {children}
    </AuthContext.Provider>
  );
}

function ChatRoute({ children }) {
  const result = localStorage.getItem('admin') !== null;

  ChatRoute.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return (
    result ? children : <Navigate to="/login" />
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
