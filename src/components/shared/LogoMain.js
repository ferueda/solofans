import React from 'react';
import { Heading } from '@chakra-ui/core';

const LogoMain = ({ fontSize = '3rem', mt = '0.5rem' }) => {
	return (
		<Heading size="2xl" fontSize={fontSize} textAlign="center" mt={mt}>
			Sólo<span style={{ color: '#3182CE' }}>Fans</span>
		</Heading>
	);
};

export default LogoMain;
