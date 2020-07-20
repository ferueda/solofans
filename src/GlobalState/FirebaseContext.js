import React, { useMemo } from 'react';

import Firebase from '../firebase/firebase';

const FirebaseContext = React.createContext(null);

const FirebaseContextProvider = ({ children }) => {
	const memoizedFirebase = useMemo(() => new Firebase(), []);

	return <FirebaseContext.Provider value={memoizedFirebase}>{children}</FirebaseContext.Provider>;
};

export default React.memo(FirebaseContextProvider);

export { FirebaseContext };
