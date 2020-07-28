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
				const authUser = returnedUser;

				firebase.db
					.collection('users')
					.doc(authUser.uid)
					.get()
					.then(res => {
						const dbUser = res.data();
						const userObject = {
							...authUser,
							firstName: dbUser.firstName,
							lastName: dbUser.lastName,
							creditBalance: dbUser.creditBalance,
							totalSales: dbUser.totalSales,
							totalWithdrawals: dbUser.totalWithdrawals,
							lastActive: dbUser.lastActive,
							// purchasedPhotos: [...dbUser.purchasedPhotos],
						};

						setUser(userObject);
						setIsLoading(false);
						setError(null);
					});
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
