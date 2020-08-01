import React from 'react';
import { Box } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import AccountSidebar from '../components/Account/AccountSidebar';

import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';

const Account = () => {
	useProtectedRoute();

	const history = useHistory();

	return (
		<React.Fragment>
			<Nav />
			<Box
				pos="fixed"
				top="0"
				right="0"
				bottom="0"
				left="0"
				backgroundColor="rgba(0, 0, 0, 0.15)"
				onClick={() => history.goBack()}
			></Box>
			<AccountSidebar />
		</React.Fragment>
	);
};

export default Account;
