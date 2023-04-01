import ChannelModal from './ChannelModal';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';

const modals = {
  addChannel: ChannelModal,
  deleteChannel: ModalDeleteChannel,
  renameChannel: ModalRenameChannel,
};

export default (modalName) => modals[modalName];
