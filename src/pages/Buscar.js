import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';

const Buscar = () => {
	useProtectedRoute();

	return (
		<React.Fragment>
			<h2>Explore</h2>
			<Nav />
		</React.Fragment>
	);
};

export default Buscar;
