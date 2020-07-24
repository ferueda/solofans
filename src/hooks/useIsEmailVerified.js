import { useEffect, useContext, useState } from 'react';

import { AuthContext } from '../GlobalState/AuthContext';

const useIsEmailVerified = (isHold = false) => {
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const { user, isLoading, error } = useContext(AuthContext);

	useEffect(() => {
		let isCancel = false;

		if (isLoading || error || isHold) return;

		if (user && !user.emailVerified && user.providerData.map(provider => provider.providerId).includes('password')) {
			!isCancel && setIsEmailVerified(false);
		} else {
			!isCancel && setIsEmailVerified(true);
		}

		return () => {
			isCancel = true;
		};
	}, [user, error, isHold, isLoading]);

	return isEmailVerified;
};

export default useIsEmailVerified;
