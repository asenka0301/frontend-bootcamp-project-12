import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useMemo } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Nav from './components/Nav';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import AuthContext from './contexts/index';
import useAuth from './hooks';
import routes from './routes';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'testenv',
};

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
    auth.loggedIn ? children : <Navigate to={`${routes.login()}`} />
  );
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path={`${routes.root()}`}
              element={(
                <ChatRoute>
                  <ChatPage />
                </ChatRoute>
              )}
            />
            <Route path={`${routes.notFoundPage()}`} element={<NotFoundPage />} />
            <Route path={`${routes.signUp()}`} element={<SignUpPage />} />
            <Route path={`${routes.login()}`} element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
