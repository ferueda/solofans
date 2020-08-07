import { useContext } from 'react';
import { AuthContext } from '../GlobalState/AuthContext';

const useUser = () => {
	const { user } = useContext(AuthContext);
	return user;
};

export default useUser;
