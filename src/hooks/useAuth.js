import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/firebase';

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const unsubscribe = auth.onAuthStateChanged(returnedUser => {
			if (returnedUser) {
				const authUser = returnedUser;

				db.collection('users')
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
	}, []);

	return {
		user,
		isLoading,
		error,
	};
};

export default useAuth;
