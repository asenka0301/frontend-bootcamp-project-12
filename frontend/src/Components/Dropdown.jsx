/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
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
  const buttonDeleteRef = useRef();
  const buttonRenameRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current
        && isMenuOpen
        && !dropDownRef.current.contains(event.target)
        && !buttonDeleteRef.current.contains(event.target)
        && !buttonRenameRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
      <button
        type="button"
        aria-expanded={isMenuOpen}
        className={cn(
          'flex-grow-0',
          'dropdown-toggle',
          'dropdown-toggle-split',
          'border-0',
          'btn',
          {
            'btn-secondary': item.id === currentChannel.id,
          },
        )}
        ref={dropDownRef}
        onClick={() => {
          setClickedDropdown(item);
          toggleMenu();
        }}

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
          ref={buttonDeleteRef}
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
          ref={buttonRenameRef}
        >
          Rename
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
