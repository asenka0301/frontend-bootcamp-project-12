import axios from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../routes';
// import { Link } from 'react-router-dom';

function getAuthHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return { Authorization: `Bearer ${token.token}` };
  }
  return {};
}

function ChatPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      console.log(data);
      setContent(data);
      console.log(content);
    };
    fetchContent();
  }, []);
  return <div>Get data</div>;
}

export default ChatPage;
