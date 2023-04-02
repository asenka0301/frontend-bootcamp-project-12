import React from 'react';
import chatLogo from '../images/chat-logo.svg';

const Img = () => (
  <div className="imgContainer">
    <img className="img-fluid" src={chatLogo} alt="logo" width="250" height="250" />
  </div>
);

export default Img;
