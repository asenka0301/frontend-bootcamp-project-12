import { Link } from 'react-router-dom';
import React from 'react';

const  NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
