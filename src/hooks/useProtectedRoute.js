import { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '../GlobalState/AuthContext';

import * as ROUTES from '../constants/routes';

const useProtectedRoute = (isHold = false) => {
	const { user, isLoading, error } = useContext(AuthContext);

	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		let isCancel = false;

		if (isLoading || error || isHold) return;

		if (user && (pathname === ROUTES.LOGIN || pathname === ROUTES.SINGUP || pathname === ROUTES.FORGOT_PASSWORD)) {
			!isCancel && history.replace(ROUTES.HOME);
		} else if (
			!user &&
			pathname !== ROUTES.LOGIN &&
			pathname !== ROUTES.SINGUP &&
			pathname !== ROUTES.FORGOT_PASSWORD
		) {
			!isCancel && history.replace(ROUTES.LOGIN);
		}

		return () => {
			isCancel = true;
		};
	}, [user, isLoading, error, history, pathname, isHold]);

	return;
};

export default useProtectedRoute;
