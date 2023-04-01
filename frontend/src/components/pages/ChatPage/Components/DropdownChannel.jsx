import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../slices/modalsSlice';

const DropdownChannel = (props) => {
  const { item, activeChannelId, handleClick } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const variant = item.id === activeChannelId ? 'secondary' : 'light';

  const openModalToDeleteChannel = () => {
    dispatch(openModal({ modalType: 'deleteChannel', id: item.id }));
  };

  const openModalToRenameChannel = () => {
    dispatch(openModal({ modalType: 'renameChannel', id: item.id }));
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex btn-group">
      <Button
        variant={variant}
        className="w-100 rounded-0 text-start text-truncate btn"
        onClick={() => handleClick(item.id)}
      >
        { item.name }
      </Button>
      <Dropdown.Toggle variant={variant} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={openModalToDeleteChannel}>{t('deleteButton')}</Dropdown.Item>
        <Dropdown.Item onClick={openModalToRenameChannel}>{t('renameButton')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownChannel;
