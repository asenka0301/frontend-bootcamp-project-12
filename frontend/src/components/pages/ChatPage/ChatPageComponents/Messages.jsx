import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../../../slices/messagesSlice';

const Messages = () => {
  const MessageEndRef = useRef(null);
  const messages = useSelector(messagesSelectors.selectAll);
  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.currentChannelId;
    return currentChannelId;
  });

  useEffect(() => {
    MessageEndRef.current?.scrollIntoView();
  }, [messages, activeChannelId]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      { messages && messages
        .filter((item) => item.channelId === activeChannelId)
        .map((el) => (
          <div key={el.id} className="text-break mb-2">
            <b>{el.userName}</b>
            :
            { el.body }
          </div>
        ))}
      <div ref={MessageEndRef} />
    </div>
  );
};

export default Messages;
