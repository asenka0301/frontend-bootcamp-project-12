import React from 'react';
import { Link } from 'react-router-dom';
// import useAuth from '../hooks/index';

function MainPage() {
  // const auth = useAuth();
  // const result = localStorage.getItem('admin') !== null;
  // if (result) {
  //   auth.logIn();
  // }
  return <Link to="/login">Page One</Link>;
}

export default MainPage;
