import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, PseudoBox, Button } from '@chakra-ui/core';
import { BsX } from 'react-icons/bs';

const Header = ({ title, buttonLabel, buttonIsActive, isLoading = false, handleSubmit }) => {
	const history = useHistory();
	return (
		<Box d="flex" alignItems="center" width="100%">
			<PseudoBox as="button" outline="none" d="flex" alignItems="center" onClick={() => history.goBack()}>
				<BsX size={38} />
			</PseudoBox>
			<Text as="h2" fontSize="1.5rem" ml="1rem">
				{title.toUpperCase()}
			</Text>
			<Button
				isDisabled={!buttonIsActive}
				isLoading={isLoading}
				aria-label={buttonLabel}
				variantColor="blue"
				type="submit"
				ml="auto"
				onClick={handleSubmit}
			>
				{buttonLabel}
			</Button>
		</Box>
	);
};

export default Header;
