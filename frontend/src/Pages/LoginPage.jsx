import React from 'react';
import LoginForm from '../Components/LoginForm';
import chatLogo from '../Images/chat-logo.svg';

function LoginPage() {
  return (
    <main className="mainContainer">
      <div className="logoContainer">
        <img src={chatLogo} alt="logo" width="350" height="200" />
      </div>
      <LoginForm />
      <div>
        <span>No account?</span>
        <a href="/signup"> Sign up</a>
      </div>
    </main>
  );
}

export default LoginPage;
