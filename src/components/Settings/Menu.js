import React from 'react';
import { Box, Divider, Text, Button, Stack, PseudoBox } from '@chakra-ui/core';
import { BsPerson, BsAt, BsShieldLock } from 'react-icons/bs';

const iconProps = {
	mainBlue: '#3182CE',
	size: 32,
};

function Menu({ setActive, active }) {
	return (
		<Box width="100%" d="flex" mt="1rem">
			<Stack isInline spacing={4} mr="auto" ml="2rem">
				<PseudoBox
					as="button"
					outline="none"
					onClick={() => setActive('profile')}
					_hover={{ color: iconProps.fillColor }}
				>
					<BsPerson size={iconProps.size} fill={active === 'profile' ? iconProps.mainBlue : ''} />
				</PseudoBox>
				<PseudoBox
					as="button"
					outline="none"
					onClick={() => setActive('social')}
					_hover={{ color: iconProps.fillColor }}
				>
					<BsAt size={iconProps.size} fill={active === 'social' ? iconProps.mainBlue : ''} />
				</PseudoBox>
				<PseudoBox
					as="button"
					outline="none"
					onClick={() => setActive('security')}
					_hover={{ color: iconProps.fillColor }}
				>
					<BsShieldLock size={iconProps.size - 3} fill={active === 'security' ? iconProps.mainBlue : ''} />
				</PseudoBox>
			</Stack>
		</Box>
	);
}

export default Menu;
