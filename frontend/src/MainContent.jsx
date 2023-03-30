import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import ChatPage from './components/pages/ChatPage/ChatPage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';
import SignUpPage from './components/pages/SignUpPage';
import { useAuth } from './hooks';
import routes from './routes';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to={`${routes.login()}`} />
  );
};

const MainContent = () => (
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

export default MainContent;
