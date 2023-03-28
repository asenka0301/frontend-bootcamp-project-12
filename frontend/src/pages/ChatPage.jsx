import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import ChannelModal from '../components/modals/ChannelModal';
import ModalDeleteChannel from '../components/modals/ModalDeleteChannel';
import ModalRenameChannel from '../components/modals/ModalRenameChannel';
import Messages from '../components/Messages';
import Channels from '../components/Channels';

import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice';

const socket = io();

function getAuthHeader() {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    return { Authorization: `Bearer ${userData.token}` };
  }
  return {};
}

const ChatPage = () => {
  const dispatch = useDispatch();
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteChannelModal, setDeleteChannelModal] = useState(false);
  const [renameChannelModal, setRenameChannelModal] = useState(false);
  const [clickedDropdown, setClickedDropdown] = useState(null);
  const inputRef = useRef();
  const { t } = useTranslation();

  const channel = useSelector(channelsSelectors.selectAll);
  const message = useSelector(messagesSelectors.selectAll);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, activeChannelId));

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const container = document.getElementById('messages-box');
    container.scrolTop = container.scrollHeight;
  }, [message]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        if (response.status === 200) {
          const { channels, messages, currentChannelId } = response.data;
          dispatch(channelsActions.addChannels(channels));
          dispatch(messagesActions.addMessages(messages));
          setActiveChannelId(currentChannelId);
        }
      } catch (errors) {
        console.log(errors);
      }
    };
    fetchContent();
  }, [dispatch]);

  function numberOfMessages() {
    return message.filter((item) => item.channelId === activeChannelId).length;
  }

  function sendMessage(e) {
    e.preventDefault();
    socket.emit('newMessage', { body: value, channelId: activeChannelId, username: 'admin' }, (response) => {
      if (response.status === 'ok') {
        socket.on('newMessage', (payload) => {
          dispatch(messagesActions.addMessage(payload));
        });
      }
    });
    setValue('');
  }

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setShowModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <Channels
              channel={channel}
              currentChannel={currentChannel}
              setActiveChannelId={(id) => setActiveChannelId(id)}
              setDeleteChannelModal={setDeleteChannelModal}
              setRenameChannelModal={setRenameChannelModal}
              setClickedDropdown={setClickedDropdown}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    { currentChannel && `# ${currentChannel.name}`}
                  </b>
                </p>
                <span className="text-muted">
                  { t('message', { count: numberOfMessages() }) }
                </span>
              </div>
              <Messages message={message} activeChannelId={activeChannelId} />
              <div className="mt-auto px-5 py-3">
                <form noValidate="" className="py-1 border rounded-2" onSubmit={sendMessage}>
                  <div className="input-group has-validation">
                    <input name="body" aria-label="Новое сообщение" placeholder={t('enterMessage')} className="border-0 p-0 ps-2 form-control" value={value} onChange={(e) => setValue(e.target.value)} ref={inputRef} />
                    <button type="submit" disabled="" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                      <span className="visually-hidden">{t('sendButton')}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChannelModal
        showModal={showModal}
        setShowModal={setShowModal}
        setActiveChannelId={setActiveChannelId}
      />
      <ModalDeleteChannel
        deleteChannelModal={deleteChannelModal}
        clickedDropdown={clickedDropdown}
        setDeleteChannelModal={setDeleteChannelModal}
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
      />
      { renameChannelModal
            && (
              <ModalRenameChannel
                renameChannelModal={renameChannelModal}
                clickedDropdown={clickedDropdown}
                setRenameChannelModal={setRenameChannelModal}
              />
            )}
    </>
  );
};

export default ChatPage;
