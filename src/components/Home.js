import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../GlobalState/AuthContext';

import * as ROUTES from '../constants/routes';

const Home = () => {
	const { user } = useContext(AuthContext);
	const history = useHistory();

	if (!user) {
		history.push(ROUTES.LOGIN);
	}

	return (
		<React.Fragment>
			<h2>Home</h2>
		</React.Fragment>
	);
};

export default Home;
