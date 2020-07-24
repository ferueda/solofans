import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../GlobalState/FirebaseContext';

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const unsubscribe = firebase.auth.onAuthStateChanged(returnedUser => {
			if (returnedUser) {
				setUser(returnedUser);
				setIsLoading(false);
				setError(null);
			} else {
				setUser(null);
				setIsLoading(false);
				setError(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [firebase]);

	return {
		user,
		isLoading,
		error,
	};
};

export default useAuth;
