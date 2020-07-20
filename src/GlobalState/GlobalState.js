import React from 'react';
import AuthContextProvider from './AuthContext';
import FirebaseContextProvider from './FirebaseContext';

const GlobalState = ({ children }) => {
	return (
		<FirebaseContextProvider>
			<AuthContextProvider>{children}</AuthContextProvider>
		</FirebaseContextProvider>
	);
};

export default GlobalState;
