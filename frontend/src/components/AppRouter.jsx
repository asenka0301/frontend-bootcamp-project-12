import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from './Nav';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from '../hooks';
import routes from '../routes';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to={`${routes.login()}`} />
  );
};

const AppRouter = () => (
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
    <ToastContainer />
  </BrowserRouter>
);

export default AppRouter;
