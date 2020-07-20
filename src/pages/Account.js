import React, { useContext } from 'react';
import { Box, Button } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../GlobalState/FirebaseContext';
import useProtectedRoute from '../hooks/useProtectedRoute';

import Nav from '../components/shared/Nav';

const SideAccount = () => {
	const firebase = useContext(FirebaseContext);

	return (
		<Box pos="fixed" top="0" right="0" bottom="0" bg="white" w="40%" minW="14rem" maxW="20rem">
			<Button onClick={firebase.doSignOut}>Log Out</Button>
		</Box>
	);
};

const Account = () => {
	useProtectedRoute();

	const history = useHistory();

	return (
		<React.Fragment>
			<Box
				pos="fixed"
				top="0"
				right="0"
				bottom="0"
				left="0"
				backgroundColor="rgba(0, 0, 0, 0.15)"
				onClick={() => history.goBack()}
			></Box>
			<SideAccount />
			<Nav />
		</React.Fragment>
	);
};

export default Account;
