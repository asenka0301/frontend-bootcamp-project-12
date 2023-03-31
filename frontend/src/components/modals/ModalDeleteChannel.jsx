import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import ModalHedaer from './ModalHeader';
import { useSocket } from '../../hooks/index';
import { actions as currentChannelIdActions } from '../../slices/currentChannelSlice';

const ModalDeleteChannel = (props) => {
  const socket = useSocket();
  console.log(socket);
  const {
    deleteChannelModal,
    setDeleteChannelModal,
    clickedDropdown,
    activeChannelId,
  } = props;
  const dispatch = useDispatch();
  const deleteModalRef = useRef();
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);

  const deleteChannel = () => {
    socket.deleteChannel(clickedDropdown.id);
    toast.success(`${t('channelDeleted')}`);
    if (clickedDropdown.id === activeChannelId) {
      dispatch(currentChannelIdActions.setCurrentChannelId(1));
    }
  };

  function deleteMessages() {
    return messages.filter((message) => message.channelId !== clickedDropdown.id);
  }

  return deleteChannelModal
    ? (
      <>
        <div className="fade modal-backdrop show" />
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" ref={deleteModalRef}>
              <ModalHedaer onClick={() => setDeleteChannelModal(false)} type="deleteChannel" />
              <div className="modal-body">
                <p className="lead">{t('confirm')}</p>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" onClick={() => setDeleteChannelModal(false)}>
                    {t('cancelButton')}
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => { deleteChannel(); deleteMessages(); }}>
                    {t('deleteButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null;
};

export default ModalDeleteChannel;
