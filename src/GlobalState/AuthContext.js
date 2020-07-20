import React, { useMemo } from 'react';

import useAuth from '../hooks/useAuth';

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
	const { user, isLoading, error } = useAuth();

	const memoizedContextObject = useMemo(() => {
		return {
			user,
			isLoading,
			error,
		};
	}, [user, isLoading, error]);

	if (isLoading) return <h1>Loading</h1>;

	return <AuthContext.Provider value={memoizedContextObject}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthContextProvider);

export { AuthContext };
