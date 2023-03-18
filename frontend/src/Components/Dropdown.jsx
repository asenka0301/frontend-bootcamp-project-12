/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import cn from 'classnames';

function Dropdown(props) {
  const {
    item,
    currentChannel,
    setActiveChannelId,
    setDeleteChannelModal,
    setRenameChannelModal,
    setClickedDropdown,
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const dropDownRef = useRef();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropDownRef.current && isMenuOpen && !dropDownRef.current.contains(event.target)) {
  //       setIsMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isMenuOpen]);

  return (
    <div
      role="group"
      className={cn(
        'd-flex',
        'dropdown',
        'btn-group',
        {
          show: isMenuOpen,
        },
      )}
    >
      <button
        type="button"
        className={cn(
          'w-100',
          'rounded-0',
          'text-start',
          'text-truncate',
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
      <button
        type="button"
        id="react-aria5503719851-1"
        aria-expanded={isMenuOpen}
        className={cn(
          'flex-grow-0',
          'dropdown-toggle',
          'dropdown-toggle-split',
          'btn',
          {
            'btn-secondary': item.id === currentChannel.id,
          },
        )}
        onClick={() => {
          setClickedDropdown(item.id);
          toggleMenu();
        }}
        ref={dropDownRef}
      >
        <span className="visually-hidden">Channel control</span>
      </button>
      <div
        aria-labelledby="react-aria5503719851-1"
        className={cn(
          'dropdown-menu',
          {
            show: isMenuOpen,
          },
        )}
        data-popper-reference-hidden="false"
        data-popper-escaped="false"
        data-popper-placement="bottom-end"
        style={{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate(0px, 40px)' }}
      >
        <button
          data-rr-ui-dropdown-item
          type="button"
          className="dropdown-item"
          tabIndex="0"
          onClick={() => {
            setDeleteChannelModal(true);
            toggleMenu();
          }}
        >
          Delete
        </button>
        <button
          id={currentChannel.id}
          data-rr-ui-dropdown-item
          type="button"
          className="dropdown-item"
          tabIndex="0"
          onClick={() => {
            setRenameChannelModal(true);
            toggleMenu();
          }}
        >
          Rename
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
