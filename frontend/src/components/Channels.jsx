import React from 'react';
import cn from 'classnames';
import Dropdown from './Dropdown';

const Channels = (props) => {
  const {
    channel,
    currentChannel,
    setActiveChannelId,
    setDeleteChannelModal,
    setRenameChannelModal,
    setClickedDropdown,
  } = props;
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {currentChannel && channel.map((item) => {
        if (!item.removable) {
          return (
            <li key={item.id} className="nav-item w-100">
              <button
                type="button"
                className={cn(
                  'w-100',
                  'rounded-0',
                  'text-start',
                  'border-0',
                  'btn',
                  {
                    'btn-secondary': item.id === currentChannel.id,
                  },
                )}
                onClick={() => setActiveChannelId(item.id)}
              >
                <span className="me-1">#</span>
                {item.name}
              </button>
            </li>
          );
        } return (
          <li key={item.id} className="nav-item w-100">
            <Dropdown
              item={item}
              currentChannel={currentChannel}
              setActiveChannelId={(id) => setActiveChannelId(id)}
              setDeleteChannelModal={setDeleteChannelModal}
              setRenameChannelModal={setRenameChannelModal}
              setClickedDropdown={setClickedDropdown}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
