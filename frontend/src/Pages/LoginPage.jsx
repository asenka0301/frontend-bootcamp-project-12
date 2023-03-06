import React from 'react';
import LoginForm from '../Components/LoginForm';
import chatLogo from '../Images/chat-logo.svg';

function LoginPage() {
  return (
    <main className="main">
      <div className="loginContainer">
        <div className="imgContainer">
          <img className="img-fluid" src={chatLogo} alt="logo" width="250" height="250" />
        </div>
        <LoginForm />
        <footer>
          <span>No account? </span>
          <a href="/signup"> Sign up</a>
        </footer>
      </div>
    </main>
  );
}

export default LoginPage;
