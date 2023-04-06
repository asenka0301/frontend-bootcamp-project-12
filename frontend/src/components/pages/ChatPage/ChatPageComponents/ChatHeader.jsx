import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice';
import { selectors as messagesSelectors } from '../../../../slices/messagesSlice';

const ChatHeader = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return currentChannelId;
  });
  const numberOfMessages = messages.filter((item) => item.channelId === activeChannelId).length;
  const currentChannel = channels.find((channel) => channel.id === activeChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          { currentChannel && `# ${currentChannel.name}`}
        </b>
      </p>
      <span className="text-muted">
        { t('message', { count: numberOfMessages }) }
      </span>
    </div>
  );
};

export default ChatHeader;
