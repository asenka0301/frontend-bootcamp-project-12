import React, { useEffect } from 'react';

const Messages = (props) => {
  const { message, activeChannelId } = props;
  console.log(message);

  useEffect(() => {
    const container = document.getElementById('messages-box');
    console.log(container);
    container.scrolTop = container.scrollHeight;
  }, []);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      { message && message
        .filter((item) => item.channelId === activeChannelId)
        .map((el) => (
          <div key={el.id} className="text-break mb-2">
            <b>{JSON.parse(localStorage.getItem('userData')).username}</b>
            :
            { el.body }
          </div>
        ))}
    </div>
  );
};

export default Messages;
