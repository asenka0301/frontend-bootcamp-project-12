import { useContext } from 'react';

import { AuthContext, SocketContext } from '../context/context';

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
