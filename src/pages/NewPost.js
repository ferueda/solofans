import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';

const NewPost = () => {
	useProtectedRoute();

	return (
		<React.Fragment>
			<h2>Crear Post</h2>
			<Nav />
		</React.Fragment>
	);
};

export default NewPost;
