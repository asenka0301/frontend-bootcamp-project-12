import React from 'react';
import filter from 'leo-profanity';

const Messages = (props) => {
  const { message, activeChannelId } = props;
  filter.loadDictionary('ru');

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      { message && message
        .filter((item) => item.channelId === activeChannelId)
        .map((el) => (
          <div key={el.id} className="text-break mb-2">
            <b>{JSON.parse(localStorage.getItem('userData')).username}</b>
            :
            {filter.clean(`${el.body}`)}
          </div>
        ))}
    </div>
  );
};

export default Messages;
