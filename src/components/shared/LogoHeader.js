import React from 'react';
import LogoMain from './LogoMain';
import { Box } from '@chakra-ui/core';

const LogoHeader = () => {
	return (
		<Box
			as="header"
			d="flex"
			width="100%"
			bg="white"
			borderBottom="1px"
			borderColor="gray.300"
			py="0.33rem"
			px="0.75rem"
			justifyItems="start"
		>
			<LogoMain fontSize="1.75rem" mt="0" />
		</Box>
	);
};

export default LogoHeader;
