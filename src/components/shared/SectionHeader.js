import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, PseudoBox } from '@chakra-ui/core';
import { BsX } from 'react-icons/bs';

const SectionHeader = ({ title }) => {
	const history = useHistory();
	return (
		<Box d="flex" alignItems="center" width="100%">
			<PseudoBox as="button" outline="none" d="flex" alignItems="center" onClick={() => history.goBack()}>
				<BsX size={38} />
			</PseudoBox>
			<Text as="h2" fontSize="1.5rem" ml="1rem">
				{title.toUpperCase()}
			</Text>
		</Box>
	);
};

export default SectionHeader;
