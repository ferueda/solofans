import React from 'react';
import { Box } from '@chakra-ui/core';

import Nav from '../components/shared/Nav';

const PageNotFound = () => {
	return (
		<React.Fragment>
			<Nav />
			<h1>Page not found</h1>
			<Box></Box>
		</React.Fragment>
	);
};

export default PageNotFound;
