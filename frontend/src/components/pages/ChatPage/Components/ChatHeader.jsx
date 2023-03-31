import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = (props) => {
  const { activeChannelId, message, currentChannels } = props;
  const { t } = useTranslation();
  const numberOfMessages = message.filter((item) => item.channelId === activeChannelId).length;
  const currentChannel = currentChannels.find((channel) => channel.id === activeChannelId);
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
