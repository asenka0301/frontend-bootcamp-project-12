import React from 'react';
import { useTranslation } from 'react-i18next';

const translations = {
  addChannel: 'addChannel',
  renameChannel: 'renameChannel',
  deleteChannel: 'delChannel',
};

const ModalHeader = ({ onClick, type }) => {
  const { t } = useTranslation();
  return (
    <div className="modal-header">
      <div className="modal-title h4">{t(translations[type])}</div>
      <button
        type="button"
        aria-label="Close"
        data-bs-dismiss="modal"
        className="btn btn-close"
        onClick={onClick}
      />
    </div>
  );
};

export default ModalHeader;
