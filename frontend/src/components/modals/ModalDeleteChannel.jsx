import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSocket } from '../../hooks/index';
import { actions as channelsActions } from '../../slices/channelsSlice';

const ModalDeleteChannel = (props) => {
  const { handleClose } = props;
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const id = useSelector((state) => state.modals.id);

  const handleModalDeleteChannel = () => {
    dispatch(channelsActions.removeChannel(id));
    toast.success(`${t('channelDeleted')}`);
    handleClose();
  };

  const deleteChannel = () => {
    socket.deleteChannel(id, handleModalDeleteChannel);
  };

  return (
    <>
      <Modal.Header closeButton={handleClose}>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('confirm')}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('cancelButton')}
          </Button>
          <Button variant="danger" onClick={deleteChannel}>
            {t('deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalDeleteChannel;
