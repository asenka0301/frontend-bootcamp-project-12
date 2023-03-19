/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { actions as channelsActions } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

const socket = io();

function ModalDeleteChannel(props) {
  const {
    deleteChannelModal,
    setDeleteChannelModal,
    clickedDropdown,
    activeChannelId,
    setActiveChannelId,
  } = props;
  const dispatch = useDispatch();
  const deleteModalRef = useRef();
  const messages = useSelector(messagesSelectors.selectAll);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteModalRef.current
        && deleteChannelModal && !deleteModalRef.current.contains(event.target)) {
        setDeleteChannelModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteChannelModal]);

  function deleteChannel() {
    socket.emit('removeChannel', { id: clickedDropdown.id }, (response) => {
      if (response.status === 'ok') {
        socket.on('removeChannel', (payload) => {
          if (payload.id === activeChannelId) {
            setActiveChannelId(1);
          }
          dispatch(channelsActions.removeChannel(payload.id));
        });
      }
    });
  }

  function deleteMessages() {
    return messages.filter((message) => message.channelId !== clickedDropdown.id);
  }

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" ref={deleteModalRef}>
            <div className="modal-header">
              <div className="modal-title h4">Delete channel</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={() => setDeleteChannelModal(false)}
              />
            </div>
            <div className="modal-body">
              <p className="lead">Sure?</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => setDeleteChannelModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteChannel();
                    deleteMessages();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDeleteChannel;
