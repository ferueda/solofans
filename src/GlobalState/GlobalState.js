import React from 'react';
import AuthContextProvider from './AuthContext';

const GlobalState = ({ children }) => {
	return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default GlobalState;
