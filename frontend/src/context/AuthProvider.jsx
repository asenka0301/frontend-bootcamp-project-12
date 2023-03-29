import React, { useCallback, useMemo, useState } from 'react';
import AuthContext from './context';

const AuthProvider = ({ children }) => {
  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };
  const initialState = Boolean(localStorage.getItem('userData'));

  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  }, []);

  const data = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  }), [loggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
