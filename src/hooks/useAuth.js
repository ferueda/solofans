import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../GlobalState/FirebaseContext';

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		let isCancel = false;

		setIsLoading(true);
		setError(null);

		firebase.auth.onAuthStateChanged(returnedUser => {
			if (!isCancel) {
				if (returnedUser) {
					setUser(returnedUser);
					setIsLoading(false);
					setError(null);
				} else {
					setUser(null);
					setIsLoading(false);
					setError(null);
				}
			}
		});

		return () => {
			isCancel = true;
		};
	}, [firebase]);

	return {
		user,
		isLoading,
		error,
	};
};

export default useAuth;
