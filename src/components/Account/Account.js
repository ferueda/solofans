import React, { useContext } from 'react';
import { Box, Link } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../GlobalState/AuthContext';

import * as ROUTES from '../../constants/routes';

import Nav from '../shared/Nav';

const SideAccount = () => {
	return <Box pos="fixed" top="0" right="0" bottom="0" bg="white" w="40%" minW="14rem" maxW="20rem"></Box>;
};

const Account = () => {
	const { user } = useContext(AuthContext);
	const history = useHistory();

	if (!user) {
		history.push(ROUTES.LOGIN);
	}

	console.log(history);

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
