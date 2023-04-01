import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import modals from './index';
import { closeModal } from '../../slices/modalsSlice';

const MainModal = () => {
  const isModalOpen = useSelector((state) => state.modals.isOpen);
  const modalType = useSelector((state) => state.modals.modalType);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const OpenedModal = modals(modalType);

  return (
    <Modal show={isModalOpen} onHide={handleClose} centered>
      { OpenedModal && <OpenedModal handleClose={handleClose} /> }
    </Modal>
  );
};

export default MainModal;
