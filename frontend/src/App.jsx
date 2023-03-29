import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
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
import AuthProvider from './context/AuthProvider';
import { useAuth } from './hooks';
import routes from './routes';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'testenv',
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
