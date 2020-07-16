import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../GlobalState/AuthContext';

import * as ROUTES from '../../constants/routes';

import Nav from '../shared/Nav';

const NewPost = () => {
	const { user } = useContext(AuthContext);
	const history = useHistory();

	if (!user) {
		history.push(ROUTES.LOGIN);
	}

	return (
		<React.Fragment>
			<h2>Crear Post</h2>
			<Nav />
		</React.Fragment>
	);
};

export default NewPost;
