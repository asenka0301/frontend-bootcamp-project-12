import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import DropdownChannel from './DropdownChannel';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice';
import { actions as currentChannelIdActions } from '../../../../slices/currentChannelSlice';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.currentChannelId;
    return currentChannelId;
  });

  const handleClick = (id) => {
    dispatch(currentChannelIdActions.setCurrentChannelId(id));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels && channels.map((item) => {
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
                    'btn-secondary': item.id === activeChannelId,
                  },
                )}
                onClick={() => handleClick(item.id)}
              >
                <span className="me-1">#</span>
                {item.name}
              </button>
            </li>
          );
        } return (
          <li key={item.id} className="nav-item w-100">
            <DropdownChannel
              item={item}
              activeChannelId={activeChannelId}
              handleClick={(id) => handleClick(id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
