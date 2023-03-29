import { useContext } from 'react';

import authContext from '../context/context';

const useAuth = () => useContext(authContext);

export default useAuth;
