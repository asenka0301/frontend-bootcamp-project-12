import { Link } from 'react-router-dom';
import React from 'react';

function MainPage() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Page One</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainPage;
