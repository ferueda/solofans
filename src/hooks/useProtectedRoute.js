import { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FirebaseContext } from '../GlobalState/FirebaseContext';

import * as ROUTES from '../constants/routes';

const useProtectedRoute = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		let isCancel = false;

		firebase.auth.onAuthStateChanged(returnedUser => {
			if (!isCancel) {
				if (returnedUser) {
					if (pathname === ROUTES.LOGIN || pathname === ROUTES.SINGUP || pathname === ROUTES.FORGOT_PASSWORD) {
						history.replace(ROUTES.HOME);
					}
				} else if (pathname !== ROUTES.LOGIN && pathname !== ROUTES.SINGUP && pathname !== ROUTES.FORGOT_PASSWORD) {
					history.replace(ROUTES.LOGIN);
				}
			}
		});

		return () => {
			isCancel = true;
		};
	}, [firebase, history, pathname]);

	return;
};

export default useProtectedRoute;
