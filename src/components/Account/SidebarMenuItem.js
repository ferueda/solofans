import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, PseudoBox } from '@chakra-ui/core';

const SidebarMenuItem = ({ children, label, to }) => {
	return (
		<PseudoBox borderRadius="3px" p="0.5rem" w="100%" _hover={{ bg: 'gray.50' }} as={RouterLink} to={to} d="flex">
			{children}
			<Box ml="0.5rem">{label}</Box>
		</PseudoBox>
	);
};

export default SidebarMenuItem;
