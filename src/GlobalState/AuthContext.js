import React, { useState, useMemo } from 'react';

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const memoizedContextObject = useMemo(() => {
		return {
			user,
		};
	}, [user]);

	return <AuthContext.Provider value={memoizedContextObject}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthContextProvider);

export { AuthContext };
